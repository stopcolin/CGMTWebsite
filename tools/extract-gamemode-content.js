const fs = require("fs");
const path = require("path");

const siteDir = path.resolve(__dirname, "../cgmtlobby.com");
const gamemodeDir = path.join(siteDir, "gamemodes");
const outputPath = path.join(siteDir, "cgmt-gamemodes.js");

const modes = [
  { slug: "lobby", defaultPage: "lobby" },
  { slug: "ballrace", defaultPage: "overview" },
  { slug: "virus", defaultPage: "overview" },
  { slug: "pvpbattle", defaultPage: "overview" },
  { slug: "zombiemassacre", defaultPage: "overview" },
  { slug: "minigolf", defaultPage: "overview" },
  { slug: "sourcekarts", defaultPage: "overview" },
  { slug: "gourmetrace", defaultPage: "overview" }
];

function slugify(value) {
  return decodeURIComponent(String(value || ""))
    .replace(/\.html$/i, "")
    .replace(/\+/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "overview";
}

function extractBalancedDiv(html, className) {
  const openPattern = new RegExp(`<div\\b[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, "i");
  const opening = openPattern.exec(html);

  if (!opening) {
    throw new Error(`Could not find .${className}`);
  }

  const contentStart = opening.index + opening[0].length;
  const divPattern = /<\/?div\b[^>]*>/gi;
  divPattern.lastIndex = contentStart;

  let depth = 1;
  let match;

  while ((match = divPattern.exec(html))) {
    depth += /^<div\b/i.test(match[0]) ? 1 : -1;

    if (depth === 0) {
      return html.slice(contentStart, match.index).trim();
    }
  }

  throw new Error(`Could not find the closing tag for .${className}`);
}

function pageKeyFromLocation(locationValue) {
  const parts = String(locationValue || "").split("&");
  const location = slugify(parts.shift());
  const categoryPart = parts.find((part) => part.toLowerCase().startsWith("category="));

  if (!categoryPart) return location;

  return `${location}-${slugify(categoryPart.slice("category=".length))}`;
}

function rewriteInternalLinks(html) {
  return html.replace(
    /([a-z0-9_-]+)%25?3Flocation=([^"'<>]+?)\.html/gi,
    (match, slug, location) => `${slug}.html?location=${pageKeyFromLocation(location)}`
  );
}

function formatHtml(html) {
  return rewriteInternalLinks(html)
    .replace(/>\s+</g, ">\n<")
    .trim();
}

function extractMenu(html) {
  const sidebar = extractBalancedDiv(html, "sidebar");
  const anchors = sidebar.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || [];

  return anchors.map((anchor) => {
    const hrefMatch = anchor.match(/\bhref=["']([^"']+)["']/i);
    const title = anchor
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const href = hrefMatch ? hrefMatch[1] : "";
    const locationMatch = href.match(/%25?3Flocation=([^"'<>]+?)\.html/i);

    if (locationMatch) {
      return {
        title,
        slug: pageKeyFromLocation(locationMatch[1])
      };
    }

    return {
      title,
      href
    };
  });
}

function escapeTemplateLiteral(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function serializeMode(mode) {
  const lines = [];
  lines.push(`  ${JSON.stringify(mode.slug)}: {`);
  lines.push(`    defaultPage: ${JSON.stringify(mode.defaultPage)},`);
  lines.push(`    menu: ${JSON.stringify(mode.menu, null, 2).replace(/\n/g, "\n    ")},`);
  lines.push("    pages: {");

  Object.entries(mode.pages).forEach(([pageKey, page], index, entries) => {
    lines.push(`      // Edit or remove this page's HTML as needed.`);
    lines.push(`      ${JSON.stringify(pageKey)}: {`);
    lines.push("        html: `");
    lines.push(escapeTemplateLiteral(page.html));
    lines.push("`");
    lines.push(`      }${index === entries.length - 1 ? "" : ","}`);
  });

  lines.push("    }");
  lines.push("  }");
  return lines.join("\n");
}

function collectMode(modeDefinition, filenames) {
  const basePath = path.join(gamemodeDir, `${modeDefinition.slug}.html`);
  const baseHtml = fs.readFileSync(basePath, "utf8");
  const pages = {};

  filenames
    .filter((filename) => filename.startsWith(`${modeDefinition.slug}%3Flocation=`) && filename.endsWith(".html"))
    .sort()
    .forEach((filename) => {
      const rawLocation = filename.slice(`${modeDefinition.slug}%3Flocation=`.length, -".html".length);
      const pageKey = pageKeyFromLocation(rawLocation);
      const html = fs.readFileSync(path.join(gamemodeDir, filename), "utf8");
      pages[pageKey] = {
        html: formatHtml(extractBalancedDiv(html, "main-content"))
      };
    });

  if (!pages[modeDefinition.defaultPage]) {
    pages[modeDefinition.defaultPage] = {
      html: formatHtml(extractBalancedDiv(baseHtml, "main-content"))
    };
  }

  return {
    slug: modeDefinition.slug,
    defaultPage: modeDefinition.defaultPage,
    menu: extractMenu(baseHtml),
    pages
  };
}

const filenames = fs.readdirSync(gamemodeDir);
const extractedModes = modes.map((mode) => collectMode(mode, filenames));
const output = [
  "/*",
  " * Editable content for the original CGMT gamemode pages.",
  " *",
  " * Change or remove menu entries and page HTML here. The original downloaded",
  " * HTML files remain in /gamemodes as backups. Running the extraction tool",
  " * again will overwrite edits made in this generated file.",
  " */",
  "window.CGMT_GAMEMODE_CONTENT = {",
  extractedModes.map(serializeMode).join(",\n"),
  "};",
  ""
].join("\n");

fs.writeFileSync(outputPath, output, "utf8");
console.log(`Wrote editable content for ${extractedModes.length} gamemodes to ${outputPath}`);
