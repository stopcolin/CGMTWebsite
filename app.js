(function () {
  "use strict";

  var grid = document.getElementById("game-grid");
  var modeCount = document.getElementById("mode-count");
  var newsGrid = document.getElementById("news-grid");
  var games = Array.isArray(window.CGMT_GAMEMODES) ? window.CGMT_GAMEMODES : [];

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderMode(game) {
    var card = element("article", "mode-card");
    var bannerWrap = element("div", "mode-banner-wrap");
    var banner = element("img", "mode-banner");
    banner.src = game.banner;
    banner.alt = game.name + " banner";
    banner.loading = "lazy";
    bannerWrap.style.setProperty("--banner-image", "url(\"" + game.banner + "\")");
    bannerWrap.appendChild(banner);

    var body = element("div", "mode-body");
    var titleRow = element("div", "mode-title-row");
    titleRow.appendChild(element("h3", "", game.name));

    var description = element("p", "mode-description", game.description);
    var data = element("div", "mode-data");
    var payout = element("section", "mode-fact");
    payout.appendChild(element("h4", "", "Payouts"));
    payout.appendChild(element("p", "", game.payout));

    var achievements = element("details", "mode-fact mode-achievements");
    var achievementSummary = element("summary", "");
    achievementSummary.appendChild(element("h4", "", "Achievements (" + game.achievements.length + ")"));
    achievements.appendChild(achievementSummary);
    var list = element("ul", "achievement-list");
    game.achievements.forEach(function (achievement) {
      var item = element("li", "");
      item.appendChild(element("strong", "", achievement.name));
      item.appendChild(element("small", "", achievement.description));
      list.appendChild(item);
    });
    achievements.appendChild(list);
    data.appendChild(payout);
    data.appendChild(achievements);

    body.appendChild(titleRow);
    body.appendChild(description);
    body.appendChild(data);
    card.appendChild(bannerWrap);
    card.appendChild(body);
    return card;
  }

  games.forEach(function (game) {
    grid.appendChild(renderMode(game));
  });
  modeCount.textContent = games.length + (games.length === 1 ? " mode" : " modes");

  function displayDate(value) {
    var match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(value || "");
    if (!match) return value || "";
    var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12);
    return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
  }

  function renderNews(entries) {
    newsGrid.replaceChildren();
    var validEntries = entries.filter(function (entry) {
      return entry && typeof entry.title === "string" && typeof entry.body === "string" && typeof entry.date === "string";
    }).sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });

    if (!validEntries.length) {
      newsGrid.appendChild(element("p", "empty-state", "No news has been added yet."));
      return;
    }

    validEntries.forEach(function (entry) {
      var article = element("article", "news-card");
      var time = element("time", "", displayDate(entry.date));
      time.dateTime = entry.date;
      article.appendChild(time);
      article.appendChild(element("h3", "", entry.title));
      article.appendChild(element("p", "", entry.body));
      if (typeof entry.link === "string" && entry.link) {
        var link = element("a", "news-link", entry.linkLabel || "Read more ↗");
        link.href = entry.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        article.appendChild(link);
      }
      newsGrid.appendChild(article);
    });
  }

  fetch("data/news.json")
    .then(function (response) {
      if (!response.ok) throw new Error("News file unavailable");
      return response.json();
    })
    .then(function (entries) {
      renderNews(Array.isArray(entries) ? entries : []);
    })
    .catch(function () {
      newsGrid.replaceChildren(element("p", "empty-state", "News could not be loaded."));
    });
}());
