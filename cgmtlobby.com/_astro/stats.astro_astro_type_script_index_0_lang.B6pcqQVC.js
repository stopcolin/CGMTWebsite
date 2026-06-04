function animateNumber(element, start, end, duration, prefix = "", suffix = "") {
  const startTime = performance.now();
  const isNumeric = typeof end === "number";

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);

    if (isNumeric) {
      const value = Math.floor(start + (end - start) * progress);
      element.textContent = prefix + value.toLocaleString() + suffix;
    } else {
      element.textContent = prefix + end + suffix;
    }

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function animateStats() {
  document.querySelectorAll(".stat-value").forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("animate");
      const text = element.textContent;

      if (text.endsWith("GMC")) {
        const value = parseFloat(text.replace(/[^0-9.-]+/g, ""));
        if (!Number.isNaN(value) && value > 0) {
          animateNumber(element, 0, value, 1500, "", " GMC");
        }
      } else if (!text.includes("h") && !text.includes("d")) {
        const value = parseFloat(text.replace(/[^0-9.-]+/g, ""));
        if (!Number.isNaN(value) && value > 0) {
          animateNumber(element, 0, value, 1500);
        }
      } else {
        element.style.opacity = "0";
        setTimeout(() => {
          element.style.transition = "opacity 0.5s ease";
          element.style.opacity = "1";
        }, 200);
      }
    }, index * 100);
  });

  [
    [".player-card", "translateY(30px) scale(0.95)", 100],
    [".map-card", "translateY(20px) scale(0.9)", 80],
    [".ban-card", "translateY(30px) scale(0.95)", 100]
  ].forEach(([selector, transform, delay]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = transform;
      setTimeout(() => {
        element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        element.style.opacity = "1";
        element.style.transform = "translateY(0) scale(1)";
      }, index * delay);
    });
  });
}

function apiUrl(path) {
  const config = window.CGMT_SITE_CONFIG || {};
  const base = (config.apiBaseUrl || "").trim().replace(/\/+$/, "");
  return base ? `${base}${path}` : "";
}

function getSearchButton() {
  return document.querySelector(".search-button");
}

function setSearching(input, enabled) {
  const button = getSearchButton();
  input.disabled = enabled;

  if (!button) return;

  button.disabled = enabled;
  if (enabled) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    button.style.background = "linear-gradient(135deg, #4ecdc4, #44a08d)";
  } else {
    button.innerHTML = '<i class="fas fa-search"></i> Search';
    button.style.background = "";
  }
}

function flashSearchError(input) {
  input.style.animation = "shake 0.5s ease-in-out";
  input.style.borderColor = "rgba(255, 107, 107, 0.5)";
  input.style.boxShadow = "0 0 20px rgba(255, 107, 107, 0.3)";

  setTimeout(() => {
    input.style.animation = "";
    input.style.borderColor = "";
    input.style.boxShadow = "";
  }, 2000);
}

function highlightCard(card) {
  document.querySelectorAll(".player-card.highlight, .player-card.cgmt-static-search-hit").forEach((element) => {
    element.classList.remove("highlight", "cgmt-static-search-hit");
    element.style.animation = "";
  });

  card.classList.add("highlight", "cgmt-static-search-hit");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.style.animation = "highlight-pulse 3s ease-in-out";

  setTimeout(() => {
    card.classList.remove("highlight", "cgmt-static-search-hit");
    card.style.animation = "";
  }, 3000);
}

function searchStaticPage(query) {
  const needle = query.toLowerCase();
  const match = Array.from(document.querySelectorAll(".player-card")).find((card) => {
    const name = card.querySelector(".player-name")?.textContent.trim().toLowerCase() || "";
    return name.includes(needle);
  });

  if (!match) return false;
  highlightCard(match);
  return true;
}

window.searchPlayer = async function () {
  const input = document.getElementById("playerSearch");
  if (!input) return;

  const name = input.value.trim();
  const tab = document.querySelector(".stats-content")?.getAttribute("data-tab") || "money";

  if (!name) {
    flashSearchError(input);
    return;
  }

  try {
    setSearching(input, true);

    const liveUrl = apiUrl(`/api/search-player?tab=${encodeURIComponent(tab)}&name=${encodeURIComponent(name)}`);
    if (liveUrl) {
      const response = await fetch(liveUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      if (result.found) {
        const page = result.page;
        window.location.href = `?t=${tab}&page=${page}#player-${result.rank}`;
        return;
      }

      flashSearchError(input);
      return;
    }

    if (!searchStaticPage(name)) {
      input.title = "Static mode searches only the players already loaded on this page. Set apiBaseUrl in cgmt-config.js for full SQL-backed search.";
      flashSearchError(input);
    }
  } catch (error) {
    console.error("Search failed:", error);
    flashSearchError(input);
  } finally {
    setSearching(input, false);
  }
};

const shakeStyles = document.createElement("style");
shakeStyles.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyles);

const highlightStyles = document.createElement("style");
highlightStyles.textContent = `
  @keyframes highlight-pulse {
    0% {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.1));
      transform: scale(1);
    }
    50% {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.5), rgba(255, 215, 0, 0.3));
      transform: scale(1.02);
    }
    100% {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05));
      transform: scale(1);
    }
  }
`;
document.head.appendChild(highlightStyles);

document.addEventListener("DOMContentLoaded", animateStats);
document.addEventListener("astro:page-load", animateStats);

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("playerSearch");
  if (input) {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") window.searchPlayer();
    });
  }
});

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (!hash) return;

  const card = document.querySelector(hash);
  if (card) highlightCard(card);
});

