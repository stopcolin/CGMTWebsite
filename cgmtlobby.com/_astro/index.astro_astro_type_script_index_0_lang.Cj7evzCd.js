const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById("error-message");
const loading = document.getElementById("loading");
const profileContent = document.getElementById("profile-content");
const config = window.CGMT_SITE_CONFIG || {};

function mirrorRoot() {
  const marker = "/cgmtlobby.com/";
  const path = window.location.pathname;
  const index = path.indexOf(marker);

  if (index >= 0) {
    return path.slice(0, index + marker.length);
  }

  const parts = path.split("/").filter(Boolean);
  return parts.length > 1 ? `/${parts[0]}/cgmtlobby.com/` : "/cgmtlobby.com/";
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function formatDuration(seconds) {
  const totalHours = Math.floor(Number(seconds || 0) / 3600);
  const days = Math.floor(totalHours / 24);

  if (days > 0) {
    const hours = totalHours % 24;
    return `${days} day${days !== 1 ? "s" : ""} | ${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
}

function formatDate(timestamp) {
  if (!timestamp) return "N/A";

  const date = new Date(Number(timestamp) * 1000);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} @ ${hour}:${minute}`;
}

function apiUrl(path) {
  const base = (config.apiBaseUrl || "").trim().replace(/\/+$/, "");
  return base ? `${base}${path}` : "";
}

function mirrorAssetUrl(path) {
  const rootUrl = new URL(mirrorRoot(), window.location.href);
  return new URL(path.replace(/^\/+/, ""), rootUrl).toString();
}

function staticProfileData() {
  return {
    success: true,
    staticFallback: true,
    player: {
      name: "Example Player",
      steamid: "STEAM_0:0:00000000",
      is_online: false,
      steam_avatar: "",
      money: 123456,
      time: 432000,
      last_online: 1760000000,
      current_hat: "No Hat",
      tetris_score: 0,
      tetris_rank: null,
      current_ball: "Default",
      chips: 5000,
      max_items: 64,
      bank_limit: 64
    },
    inventory: [
      {
        slot: 1,
        item_name: "Sample Hat",
        item_price: 1000,
        item_image: ""
      },
      {
        slot: 2,
        item_name: "Sample Particle",
        item_price: 10000,
        item_image: ""
      }
    ],
    vault: [],
    net_worth: {
      store_value: 11000,
      resell_value: 5500
    }
  };
}

function showNotice(message) {
  let notice = document.getElementById("cgmt-profile-notice");

  if (!notice) {
    notice = document.createElement("div");
    notice.id = "cgmt-profile-notice";
    notice.className = "cgmt-api-notice";
    document.querySelector(".search-section")?.appendChild(notice);
  }

  notice.textContent = message;
}

function clearNotice() {
  const notice = document.getElementById("cgmt-profile-notice");
  if (notice) notice.remove();
}

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function itemImageUrl(item) {
  const image = item.item_image || item.image || "";
  if (!image) return "";
  if (/^(https?:|data:)/i.test(image)) return image;
  return mirrorAssetUrl(image);
}

function createPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "cgmt-item-placeholder";
  placeholder.textContent = "?";
  return placeholder;
}

function renderItems(items, gridId, maxColumns) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  const safeItems = Array.isArray(items) ? items.slice() : [];
  grid.innerHTML = "";

  if (safeItems.length === 0) {
    grid.innerHTML = '<div class="no-items-message">No items found</div>';
    grid.style.gridTemplateColumns = "1fr";
    return;
  }

  safeItems.sort((a, b) => Number(a.slot || 0) - Number(b.slot || 0));

  safeItems.forEach((item) => {
    const slot = document.createElement("div");
    slot.className = "slot slot-filled";
    slot.title = `${item.item_name || "Unknown Item"}${item.item_price > 0 ? ` (${formatNumber(item.item_price)} GMC)` : ""}`;

    const content = document.createElement("div");
    content.className = "slot-content";

    const imageUrl = itemImageUrl(item);
    if (imageUrl) {
      const image = document.createElement("img");
      image.alt = item.item_name || "Item";
      image.className = "item-image";
      image.src = imageUrl;
      image.onerror = function () {
        this.replaceWith(createPlaceholder());
      };
      content.appendChild(image);
    } else {
      content.appendChild(createPlaceholder());
    }

    const name = document.createElement("div");
    name.className = "item-name";
    name.textContent = item.item_name || "Unknown Item";
    content.appendChild(name);

    slot.appendChild(content);
    grid.appendChild(slot);
  });

  grid.style.gridTemplateColumns = `repeat(${Math.min(safeItems.length, maxColumns)}, 1fr)`;
}

function renderProfile(data) {
  const player = data.player || {};
  const inventory = Array.isArray(data.inventory) ? data.inventory : [];
  const vault = Array.isArray(data.vault) ? data.vault : [];
  const netWorth = data.net_worth || {};

  setText("player-name", player.name || "Unknown Player");
  setText("player-steamid", player.steamid || "Unknown SteamID");

  const status = document.getElementById("player-status");
  if (status) {
    status.textContent = player.is_online ? "ONLINE" : "OFFLINE";
    status.className = `status-badge ${player.is_online ? "online" : "offline"}`;
  }

  const avatar = document.getElementById("steam-avatar");
  const placeholder = document.getElementById("placeholder-avatar");
  if (avatar && placeholder) {
    if (player.steam_avatar) {
      avatar.onerror = function () {
        avatar.style.display = "none";
        placeholder.style.display = "flex";
      };
      avatar.onload = function () {
        avatar.style.display = "block";
        placeholder.style.display = "none";
      };
      avatar.src = player.steam_avatar;
      avatar.style.display = "block";
      placeholder.style.display = "none";
    } else {
      avatar.style.display = "none";
      placeholder.style.display = "flex";
    }
  }

  setText("stat-money", `${formatNumber(player.money)} GMC`);
  setText("stat-time", formatDuration(player.time));
  setText("stat-last-online", formatDate(player.last_online));
  setText("stat-hat", player.current_hat || "No Hat");
  setText("stat-tetris-score", formatNumber(player.tetris_score));
  setText("stat-tetris-rank", player.tetris_rank ? `#${player.tetris_rank}` : "N/A");
  setText("stat-ball", player.current_ball || "No Ball");
  setText("stat-chips", formatNumber(player.chips));
  setText("inventory-count", inventory.length.toString());
  setText("vault-count", vault.length.toString());
  setText("net-worth-store", `${formatNumber(netWorth.store_value)} GMC`);
  setText("net-worth-resell", `${formatNumber(netWorth.resell_value)} GMC`);

  renderItems(inventory, "inventory-grid", 8);
  renderItems(vault, "vault-grid", 8);

  if (profileContent) profileContent.style.display = "block";
}

async function loadStaticProfile() {
  const samplePath = config.sampleProfilePath || "data/sample-profile.json";

  try {
    const response = await fetch(mirrorAssetUrl(samplePath));
    if (response.ok) return await response.json();
  } catch (error) {
    console.warn("Could not load static profile sample:", error);
  }

  return staticProfileData();
}

async function searchProfile() {
  const query = searchInput.value.trim();

  if (!query) {
    showError("Please enter a Steam ID or username");
    return;
  }

  if (errorMessage) errorMessage.style.display = "none";
  if (profileContent) profileContent.style.display = "none";
  if (loading) loading.style.display = "flex";

  try {
    const liveUrl = apiUrl(`/api/gmt/profile?search=${encodeURIComponent(query)}`);
    let data;

    if (liveUrl) {
      clearNotice();
      const response = await fetch(liveUrl);
      data = await response.json();
    } else {
      data = await loadStaticProfile();
      showNotice("Live profile API is not configured. Showing local sample data. Set apiBaseUrl in cgmt-config.js to enable real SQL-backed profiles.");
    }

    if (!data.success) {
      showError(data.error || "Player not found");
      return;
    }

    renderProfile(data);
  } catch (error) {
    console.error("Search error:", error);
    showError("An error occurred while searching. Check cgmt-config.js if you are using a live API.");
  } finally {
    if (loading) loading.style.display = "none";
  }
}

function showError(message) {
  if (!errorMessage) return;
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

if (searchButton && searchInput) {
  searchButton.addEventListener("click", searchProfile);
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") searchProfile();
  });

  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("search");
  if (query) {
    searchInput.value = query;
    searchProfile();
  }
}
