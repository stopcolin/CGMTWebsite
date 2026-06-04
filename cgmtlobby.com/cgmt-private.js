(function () {
  "use strict";

  var config = window.CGMT_SITE_CONFIG || {};
  var siteName = config.siteName || "CGMT";
  var shortName = config.shortName || siteName;
  var description = config.description || "";
  var nav = config.navigation || {};

  function siteRoot() {
    var script = Array.prototype.find.call(document.scripts, function (item) {
      return /cgmt-private\.js(?:\?|$)/.test(item.getAttribute("src") || "");
    });

    if (script) {
      var scriptUrl = new URL(script.getAttribute("src"), window.location.href);
      return scriptUrl.pathname.replace(/cgmt-private\.js$/, "");
    }

    var folder = config.siteFolder || "cgmtlobby.com";
    var marker = "/" + folder + "/";
    var path = window.location.pathname;
    var index = path.indexOf(marker);

    if (index >= 0) {
      return path.slice(0, index + marker.length);
    }

    return "/";
  }

  function isExternal(value) {
    return /^(https?:|steam:|mailto:|#)/i.test(value || "");
  }

  function asset(path) {
    if (!path) return "";
    if (isExternal(path) || path.indexOf("/") === 0) return path;
    return siteRoot() + path.replace(/^\/+/, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(value) {
    if (!value) return "";
    var date = new Date(value + "T12:00:00");
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  function setMeta(selector, value) {
    if (!value) return;
    var meta = document.querySelector(selector);
    if (meta) meta.setAttribute("content", value);
  }

  function replaceText(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|NOSCRIPT)$/i.test(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      node.nodeValue = node.nodeValue
        .replace(/The Lobby:\s*Deluxe/g, siteName)
        .replace(/Celestials GMod Tower/g, siteName)
        .replace(/thelobbydeluxe\.com/gi, config.domain || "cgmtlobby.com")
        .replace(/thelobbydeluxe/gi, shortName);
    });
  }

  function updateAssets() {
    var assets = config.assets || {};

    if (assets.background) {
      document.documentElement.style.background =
        "linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), url('" +
        asset(assets.background) +
        "') center/cover fixed";
    }

    document.querySelectorAll("link[rel='icon']").forEach(function (link) {
      if (assets.favicon) link.href = asset(assets.favicon);
    });

    document.querySelectorAll(".logo-background").forEach(function (img) {
      if (assets.logoBackground) img.src = asset(assets.logoBackground);
    });

    document.querySelectorAll(".logo-outline").forEach(function (img) {
      if (assets.logoOutline) img.src = asset(assets.logoOutline);
    });
  }

  function updateBranding() {
    document.body.classList.add("cgmt-private-site");

    if (document.title) {
      document.title = document.title
        .replace(/The Lobby:\s*Deluxe/g, siteName)
        .replace(/Celestials GMod Tower/g, siteName);
    }

    setMeta('meta[property="og:title"]', document.title);
    setMeta('meta[property="og:site_name"]', siteName);
    setMeta('meta[name="twitter:title"]', document.title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[property="og:url"]', config.publicUrl || window.location.origin + siteRoot());

    replaceText(document.body);

    document.querySelectorAll("img[alt]").forEach(function (img) {
      img.alt = img.alt
        .replace(/The Lobby:\s*Deluxe/g, siteName)
        .replace(/Celestials GMod Tower/g, siteName);
    });

    var headerBrand = document.querySelector(".columns a.nomobile");
    if (headerBrand) {
      headerBrand.textContent = siteName;
      headerBrand.title = siteName;

      var badge = document.createElement("span");
      badge.className = "cgmt-private-badge";
      badge.textContent = "Private";
      headerBrand.appendChild(badge);
    }

    var heroTitle = document.querySelector(".hero-title .text-gradient");
    if (heroTitle) heroTitle.textContent = siteName;

    var heroStrong = document.querySelector(".hero-description strong");
    if (heroStrong) heroStrong.textContent = siteName;

    var firstHeroText = document.querySelector(".hero-description .hero-text");
    if (firstHeroText && description) {
      firstHeroText.innerHTML = "<strong>" + escapeHtml(siteName) + "</strong> " + escapeHtml(description);
    }

    var featureSubtitle = document.querySelector(".features-header .section-subtitle");
    if (featureSubtitle) {
      featureSubtitle.textContent = "Fresh additions and active projects for " + siteName;
    }
  }

  function hideContainer(anchor) {
    var parent = anchor.closest("li, .action-button, .socials a") || anchor;
    parent.classList.add("cgmt-hidden");
  }

  function hideDisabledNavigation() {
    document.querySelectorAll("a[href]").forEach(function (anchor) {
      var label = (anchor.textContent || "").trim().toLowerCase();
      var href = (anchor.getAttribute("href") || "").toLowerCase();

      if (!nav.showStats && (label === "stats" || href.indexOf("/stats") !== -1 || href.indexOf("stats/") !== -1)) {
        hideContainer(anchor);
      }

      if (!nav.showStaff && (label === "staff" || href.indexOf("/staff") !== -1 || href.indexOf("staff/") !== -1)) {
        hideContainer(anchor);
      }

      if (!nav.showProfile && (label === "gmt profile" || href.indexOf("gmt-profile") !== -1)) {
        hideContainer(anchor);
      }
    });
  }

  function updateLinks() {
    var root = siteRoot();
    var internalHosts = [
      "https://cgmtlobby.com",
      "https://stopcolin.github.io/CGMTWebsite/cgmtlobby.com"
    ];
    if (config.publicUrl) {
      internalHosts.push(String(config.publicUrl).replace(/\/+$/, ""));
    }

    function internalPath(url) {
      var folder = (config.siteFolder || "cgmtlobby.com").toLowerCase();
      var path = url.pathname.replace(/^\/+/, "");
      var lowerPath = path.toLowerCase();
      var folderIndex = lowerPath.indexOf(folder + "/");

      if (folderIndex !== -1) {
        path = path.slice(folderIndex + folder.length + 1);
      } else if (lowerPath === folder) {
        path = "index.html";
      }

      if (!path) path = "index.html";
      if (!/\.html$/.test(path) && path.indexOf(".") === -1) {
        path = path.replace(/\/?$/, "/index.html");
      }

      return path;
    }

    document.querySelectorAll("a[href]").forEach(function (anchor) {
      var href = anchor.getAttribute("href") || "";

      if (href.indexOf("steam://connect/") === 0) {
        if (config.joinUrl) {
          anchor.href = config.joinUrl;
        } else {
          hideContainer(anchor);
        }
        return;
      }

      if (href.indexOf("steamcommunity.com/sharedfiles") !== -1) {
        if (config.workshopUrl) {
          anchor.href = config.workshopUrl;
        } else {
          hideContainer(anchor);
        }
        return;
      }

      if (internalHosts.some(function (host) { return href.indexOf(host) === 0; })) {
        var url = new URL(href);
        var path = internalPath(url);
        anchor.href = root + path + url.search + url.hash;
      }
    });

    var socialLinks = {
      Discord: config.socials && config.socials.discord,
      Bluesky: config.socials && config.socials.bluesky,
      Youtube: config.socials && config.socials.youtube,
      Github: config.socials && config.socials.github
    };

    document.querySelectorAll(".socials a").forEach(function (anchor) {
      var img = anchor.querySelector("img[alt]");
      var name = img ? img.alt : "";
      if (!Object.prototype.hasOwnProperty.call(socialLinks, name)) return;

      if (socialLinks[name]) {
        anchor.href = socialLinks[name];
        anchor.title = name;
      } else {
        hideContainer(anchor);
      }
    });

    hideDisabledNavigation();
  }

  function renderFeatureCards() {
    var grid = document.querySelector(".features-grid");
    if (!grid || !Array.isArray(config.features)) return;

    grid.innerHTML = config.features.map(function (feature) {
      return [
        '<li class="feature-card" title="' + escapeHtml(feature.description) + '">',
        '<div class="card-image">',
        '<img src="' + escapeHtml(asset(feature.image)) + '" alt="' + escapeHtml(feature.title) + '">',
        '<div class="image-overlay"></div>',
        "</div>",
        '<div class="card-content">',
        '<h3 class="card-title">' + escapeHtml(feature.title) + "</h3>",
        '<p class="card-description">' + escapeHtml(feature.description) + "</p>",
        "</div>",
        "</li>"
      ].join("");
    }).join("");
  }

  function newsArticleHtml(article, featured) {
    var body = Array.isArray(article.body) && article.body.length ? article.body : [article.summary || ""];

    return [
      '<article class="' + (featured ? "featured-article" : "article-card") + '">',
      featured ? '<div class="featured-badge"><span class="badge-text">Latest News</span></div>' : "",
      '<div class="article-card ' + (featured ? "featured" : "") + '">',
      '<div class="article-header">',
      '<h2 class="article-title">' + escapeHtml(article.title) + "</h2>",
      '<div class="article-meta">',
      '<div class="author-info"><div class="author-avatar">' + escapeHtml((article.author || "C")[0]) + '</div><span class="author-name">By ' + escapeHtml(article.author || "CGMT Staff") + "</span></div>",
      '<div class="article-date">' + escapeHtml(formatDate(article.date)) + "</div>",
      "</div>",
      "</div>",
      '<div class="article-content"><div class="prose">',
      body.map(function (paragraph) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      }).join(""),
      "</div></div>",
      "</div>",
      "</article>"
    ].join("");
  }

  function renderNewsPage() {
    var container = document.querySelector(".news-page .news-container");
    if (!container || !Array.isArray(config.news) || !config.news.length) return;

    container.innerHTML =
      newsArticleHtml(config.news[0], true) +
      '<div class="news-grid">' +
      config.news.slice(1).map(function (article) {
        return newsArticleHtml(article, false);
      }).join("") +
      "</div>";
  }

  function renderHomeNews() {
    var preview = document.querySelector(".news-preview");
    if (!preview || !Array.isArray(config.news) || !config.news.length) return;

    var article = config.news[0];
    preview.innerHTML = [
      '<article class="news-card">',
      '<div class="news-header-card">',
      '<h3 class="news-title">' + escapeHtml(article.title) + "</h3>",
      '<div class="news-meta"><span class="news-author">By ' + escapeHtml(article.author || "CGMT Staff") + '</span><span class="news-date">' + escapeHtml(article.date || "") + "</span></div>",
      "</div>",
      '<div class="news-content"><div class="news-preview-text"><p>' + escapeHtml(article.summary || (article.body && article.body[0]) || "") + "</p></div></div>",
      "</article>",
      '<div class="news-navigator"><a href="' + escapeHtml(asset("news/index.html")) + '" class="view-all-link"><span class="link-text">View All News</span><span class="link-icon">-&gt;</span></a></div>'
    ].join("");
  }

  function renderChangelog() {
    var timeline = document.querySelector(".changelog-page .timeline");
    if (!timeline || !Array.isArray(config.changelog)) return;

    timeline.innerHTML = config.changelog.map(function (entry, index) {
      return [
        '<div class="timeline-item ' + (index === 0 ? "latest" : "") + '">',
        '<div class="timeline-marker"><div class="version-badge">' + (index === 0 ? "*" : "-") + "</div></div>",
        '<div class="changelog-card">',
        '<div class="card-header">',
        '<h2 class="card-title">' + escapeHtml(entry.title) + "</h2>",
        '<div class="card-meta"><span class="date">' + escapeHtml(formatDate(entry.date)) + '</span><span class="version">' + escapeHtml(entry.version || "") + "</span></div>",
        "</div>",
        '<div class="card-content">',
        (entry.sections || []).map(function (section) {
          return [
            '<div class="changelog-section">',
            '<div class="section-header"><span class="category-icon">-</span><h3 class="section-title">' + escapeHtml(section.title) + "</h3></div>",
            '<ul class="section-list">',
            (section.items || []).map(function (item) {
              return '<li class="change-item"><span class="bullet"></span><span class="change-text">' + escapeHtml(item) + "</span></li>";
            }).join(""),
            "</ul>",
            "</div>"
          ].join("");
        }).join(""),
        "</div>",
        "</div>",
        "</div>"
      ].join("");
    }).join("");
  }

  function gamemodeBySlug(slug) {
    return (config.gamemodes || []).find(function (item) {
      return item.slug === slug;
    });
  }

  function renderGamemodeIndex() {
    var list = document.querySelector(".gamemodes-list");
    if (!list || !Array.isArray(config.gamemodes)) return;

    list.innerHTML = config.gamemodes.map(function (mode) {
      var href = mode.href || (mode.slug + ".html");
      if (!isExternal(href) && window.location.pathname.toLowerCase().endsWith("/gamemodes.html") && href.indexOf("/") === -1) {
        href = "gamemodes/" + href;
      }

      return [
        '<a href="' + escapeHtml(href) + '" class="gamemode-tab cgmt-gamemode-tab" style="--mode-accent:' + escapeHtml(mode.accent || "#66d9ef") + '">',
        '<img src="' + escapeHtml(asset(mode.image)) + '" alt="' + escapeHtml(mode.name) + '">',
        '<div class="gamemode-overlay"><div class="gamemode-content">',
        mode.logo ? '<img class="cgmt-gamemode-logo-small" src="' + escapeHtml(asset(mode.logo)) + '" alt="' + escapeHtml(mode.name) + ' logo">' : "",
        '<h2>' + escapeHtml(mode.name) + "</h2>",
        '<p>' + escapeHtml(mode.tagline || mode.description || "") + "</p>",
        '<span class="view-button">View Gamemode</span>',
        "</div></div>",
        "</a>"
      ].join("");
    }).join("");
  }

  function locationSlug(value) {
    return decodeURIComponent(String(value || ""))
      .replace(/\.html$/i, "")
      .replace(/\+/g, " ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "overview";
  }

  function gamemodeRoute() {
    var rawFile = window.location.pathname.split("/").pop() || "";
    var decodedFile = decodeURIComponent(rawFile);
    var location = "";
    var locationMatch = decodedFile.match(/^(.+?)\?location=(.+)$/i);

    if (locationMatch) {
      decodedFile = locationMatch[1];
      location = locationMatch[2];
    }

    return {
      slug: decodedFile.replace(/\.html$/i, ""),
      location: locationSlug(new URLSearchParams(window.location.search).get("location") || location)
    };
  }

  function classicGamemodeLink(mode, entry) {
    var slug = locationSlug(entry.slug || entry.title);
    return mode.slug + ".html?location=" + encodeURIComponent(slug);
  }

  function fallbackGamemodePage(mode) {
    return {
      title: mode.name,
      body: [mode.description || mode.tagline || ""],
      sections: mode.sections || []
    };
  }

  function renderClassicBody(page, cid) {
    var paragraphClasses = ["main-description", "directions", "community-info", "footer"];
    var html = [];

    (page.body || []).forEach(function (paragraph, index) {
      html.push(
        '<p class="' + paragraphClasses[Math.min(index, paragraphClasses.length - 1)] + '"' + cid + ">" +
        escapeHtml(paragraph) +
        "</p>"
      );
    });

    (page.sections || []).forEach(function (section) {
      html.push('<div class="cgmt-classic-section"' + cid + ">");
      if (section.title) {
        html.push('<h3 class="cgmt-classic-subheading"' + cid + ">" + escapeHtml(section.title) + "</h3>");
      }
      (section.body || []).forEach(function (paragraph) {
        html.push('<p class="directions"' + cid + ">" + escapeHtml(paragraph) + "</p>");
      });
      html.push("</div>");
    });

    if (page.info && page.info.length) {
      html.push('<div class="game-info"' + cid + ">");
      page.info.forEach(function (item) {
        html.push("<p" + cid + ">" + escapeHtml(item) + "</p>");
      });
      html.push("</div>");
    }

    return html.join("");
  }

  function renderGamemodeDetail() {
    var page = document.querySelector(".gamemode-page");
    if (!page) return;

    var route = gamemodeRoute();
    var mode = gamemodeBySlug(route.slug);
    if (!mode) return;
    if (mode.staticPage) return;

    document.title = siteName + " - " + mode.name;
    setMeta('meta[property="og:title"]', document.title);
    setMeta('meta[name="twitter:title"]', document.title);

    var cid = " data-astro-cid-c4jkbc26";
    var menu = mode.menu || (mode.sections || []).map(function (section) {
      return {
        title: section.title,
        slug: section.title
      };
    });
    var pages = mode.pages || {};
    var activePage = pages[route.location] || pages.overview || fallbackGamemodePage(mode);

    page.setAttribute("data-gamemode", mode.slug);
    page.style.setProperty("--mode-accent", mode.accent || "#66d9ef");
    page.innerHTML = [
      '<div class="header"' + cid + ">",
      '<div class="logo-title"' + cid + ">",
      mode.logo ? '<img src="' + escapeHtml(asset(mode.logo)) + '" alt="' + escapeHtml(mode.name) + ' logo" class="gmod-logo"' + cid + ">" : "",
      '<h1' + cid + ">" + escapeHtml(mode.name) + "</h1>",
      "</div>",
      '<a href="../gamemodes.html" class="back-button"' + cid + ">Back to Gamemodes</a>",
      "</div>",
      '<div class="content-wrapper"' + cid + ">",
      '<div class="sidebar"' + cid + '><div class="menu-section"' + cid + "><h2" + cid + ">INFORMATION</h2><ul" + cid + ">",
      menu.map(function (entry) {
        var entrySlug = locationSlug(entry.slug || entry.title);
        var activeClass = entrySlug === route.location ? ' class="active"' : " class";
        return '<li' + cid + '><a href="' + escapeHtml(classicGamemodeLink(mode, entry)) + '"' + activeClass + cid + "> " + escapeHtml(entry.title) + " </a></li>";
      }).join(""),
      "</ul></div></div>",
      '<div class="main-content"' + cid + '><div class="lobby-content cgmt-classic-gamemode-content"' + cid + ">",
      '<h2' + cid + ">" + escapeHtml(activePage.title || mode.name) + "</h2>",
      renderClassicBody(activePage, cid),
      "</div></div>",
      "</div>"
    ].join("");
  }

  function renderDisabledPage() {
    var path = window.location.pathname.toLowerCase();
    var disabled =
      (!nav.showStats && path.indexOf("/stats/") !== -1 && "Stats") ||
      (!nav.showStaff && path.indexOf("/staff/") !== -1 && "Staff") ||
      (!nav.showProfile && path.indexOf("/gmt-profile/") !== -1 && "GMT Profile");

    if (!disabled) return;

    var header = document.querySelector("header.header");
    var footer = document.querySelector("footer");
    var nodes = Array.prototype.slice.call(document.body.children).filter(function (node) {
      return node !== header && node !== footer && !/^(SCRIPT|AUDIO)$/i.test(node.tagName);
    });

    nodes.forEach(function (node) {
      node.remove();
    });

    var panel = document.createElement("main");
    panel.className = "cgmt-disabled-page";
    panel.innerHTML = [
      "<h1>" + escapeHtml(disabled) + " is temporarily disabled</h1>",
      "<p>This page depends on CGMT API data. It is hidden until the private API is ready.</p>",
      '<a href="' + escapeHtml(asset("index.html")) + '">Return Home</a>'
    ].join("");

    if (footer) {
      document.body.insertBefore(panel, footer);
    } else {
      document.body.appendChild(panel);
    }
  }

  function removeDownloadedAnalytics() {
    document.querySelectorAll('script[src*="cloudflareinsights.com"]').forEach(function (script) {
      script.remove();
    });
  }

  function boot() {
    removeDownloadedAnalytics();
    updateAssets();
    updateBranding();
    updateLinks();
    renderFeatureCards();
    renderHomeNews();
    renderNewsPage();
    renderChangelog();
    renderGamemodeIndex();
    renderGamemodeDetail();
    renderDisabledPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  document.addEventListener("astro:page-load", boot);
})();
