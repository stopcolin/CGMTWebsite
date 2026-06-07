window.CGMT_SITE_CONFIG = {
  siteName: "Celestials GMod Tower",
  shortName: "CGMT",
  domain: "stopcolin.github.io/CGMTWebsite/cgmtlobby.com",
  publicUrl: "https://stopcolin.github.io/CGMTWebsite/cgmtlobby.com",
  siteFolder: "cgmtlobby.com",
  description: "CGMT.",

  joinUrl: "",
  workshopUrl: "",

  assets: {
    background: "images/gmt_build0s4b.jpg",
    logoBackground: "celestiallogo.png",
    logoOutline: "logo_outline.png",
    favicon: "celestialicon.ico"
  },

  navigation: {
    showStats: false,
    showStaff: false,
    showProfile: false
  },

  socials: {
    discord: "",
    bluesky: "",
    youtube: "",
    github: ""
  },

  features: [
    {
      title: "New: Slashers",
      description: "Classic horror movie experience.",
      image: "images/gamemodes/slashers_logo.png"
    },
    {
      title: "New: Prop Hunt",
      description: "Become a prop, make a profit, or kill some props, make a profit.",
      image: "images/gamemodes/prophunt_logo.png"
    },
    {
      title: "New: Jazztronauts",
      description: "Steal them props, make a profit.",
      image: "images/gamemodes/jazztronauts_logo.png"
    }
  ],

  news: [
    {
      title: "",
      author: "",
      date: "",
      summary: "WIP",
      body: [
        "",
        "",
        ""
      ]
    },
    {
      title: "Slashers, Prop Hunt, and Jazztronauts WIP",
      author: "",
      date: "2026-06-03",
      summary: "WIP",
      body: [
        "",
        ""
      ]
    }
  ],

  changelog: [
    {
      title: "New Gamemodes",
      date: "2026-06-03",
      version: "",
      sections: [
        {
          title: "Gamemodes",
          items: [
            "Added Jazztronauts, Prop Hunt, and Slashers."
          ]
        }
      ]
    },
    {
      title: "Server Integration",
      date: "2026-06-03",
      version: "",
      sections: [
        {
          title: "Discord",
          items: [
            "WIP"
          ]
        }
      ]
    }
  ],

  gamemodes: [
    {
      name: "Lobby",
      slug: "lobby",
      image: "images/gamemodes/lobby_off.jpg",
      logo: "images/gamemodes/lobby_logo.png",
      accent: "#3f88c5",
      tagline: "The Tower hub for stores, suites, theater, arcade, and every gamemode port.",
      staticPage: true
    },
    {
      name: "Ball Race",
      slug: "ballrace",
      image: "images/gamemodes/ballrace_off.jpg",
      logo: "images/gamemodes/ballrace_logo.png",
      accent: "#58a6ff",
      tagline: "Roll through bright obstacle courses and race for clean, fast finishes.",
      staticPage: true
    },
    {
      name: "Virus",
      slug: "virus",
      image: "images/gamemodes/virus_off.jpg",
      logo: "images/gamemodes/virus_logo.png",
      accent: "#65c466",
      tagline: "Survive the infection or spread it before the last player gets away.",
      staticPage: true
    },
    {
      name: "PVP Battle",
      slug: "pvpbattle",
      image: "images/gamemodes/pvpbattle_off.jpg",
      logo: "images/gamemodes/pvpbattle_logo.png",
      accent: "#e56b4a",
      tagline: "Arena combat, weapon pickups, and fast fights for players who want the direct route.",
      staticPage: true
    },
    {
      name: "Ultimate Chimera Hunt",
      slug: "uch",
      image: "images/gamemodes/uch_off.jpg",
      logo: "",
      accent: "#d64a64",
      tagline: "A cat-and-mouse chase where one wrong turn can end the round.",
      description: "Ultimate Chimera Hunt is a frantic chase mode about pressure, panic, and timing. Players try to survive while the chimera stalks the map and looks for the opening that cracks the group.",
      sections: [
        {
          title: "Overview",
          body: [
            "WIP",
          ]
        },
        {
          title: "Good To Know",
          body: [
            "WIP"
          ]
        }
      ]
    },
    {
      name: "Zombie Massacre",
      slug: "zombiemassacre",
      image: "images/gamemodes/zombiemassacre_off.jpg",
      logo: "images/gamemodes/zombiemassacre_logo.png",
      accent: "#7ac943",
      tagline: "Team up, upgrade, and hold out against waves of zombies.",
      staticPage: true
    },
    {
      name: "Mini Golf",
      slug: "minigolf",
      image: "images/gamemodes/minigolf_off.jpg",
      logo: "images/gamemodes/minigolf_logo.png",
      accent: "#7ddf64",
      tagline: "Pick a ball, line up the shot, and try not to donate strokes to the scenery.",
      staticPage: true
    },
    {
      name: "Source Karts",
      slug: "sourcekarts",
      image: "images/gamemodes/sourcekarts_off.jpg",
      logo: "",
      accent: "#ffb84d",
      tagline: "Kart racing with items, bad timing, and just enough chaos to blame the track.",
      staticPage: true
    },
    {
      name: "Gourmet Race",
      slug: "gourmetrace",
      image: "images/gamemodes/gourmetrace_off.jpg",
      logo: "",
      accent: "#f39c4a",
      tagline: "Race through food-themed tracks and try to finish before the course eats your lead.",
      staticPage: true
    },
    {
      name: "Slashers",
      slug: "slashers",
      image: "images/gamemodes/slashers_off.jpg",
      logo: "images/gamemodes/slashers_logo.png",
      accent: "#b43a3a",
      tagline: "One slasher hunts a group of survivors.",
      description: "Slashers is an asymmetrical horror gamemode where one player hunts the survivors.",
      menu: [
        { title: "Overview", slug: "overview" },
        { title: "Gameplay", slug: "gameplay" }
      ],
      pages: {
        overview: {
          title: "SLASHERS",
          body: [
            "One player becomes the slasher while the remaining players become survivors.",
            "The survivors must complete the map objective and escape before the slasher kills them."
          ]
        },
        gameplay: {
          title: "GAMEPLAY",
          body: [
            "Survivors search the map, work together, and try to escape.",
            "The slasher hunts the survivors and tries to stop them."
          ]
        }
      }
    },
    {
      name: "Prop Hunt",
      slug: "prophunt",
      image: "images/gamemodes/prophunt_off.jpg",
      logo: "images/gamemodes/prophunt_logo.png",
      accent: "#48a35f",
      tagline: "Props hide and hunters search for them.",
      description: "Prop Hunt is a hide-and-seek gamemode where props disguise themselves as objects.",
      menu: [
        { title: "Overview", slug: "overview" },
        { title: "Gameplay", slug: "gameplay" }
      ],
      pages: {
        overview: {
          title: "PROP HUNT",
          body: [
            "Props disguise themselves as objects found around the map.",
            "Hunters search for and eliminate the props before time runs out."
          ]
        },
        gameplay: {
          title: "GAMEPLAY",
          body: [
            "Props receive time to choose a disguise and hiding place before the hunters are released.",
            "Props win if at least one survives. Hunters win by eliminating every prop."
          ]
        }
      }
    },
    {
      name: "Jazztronauts",
      slug: "jazztronauts",
      image: "images/gamemodes/jazztronauts_off.jpg",
      logo: "images/gamemodes/jazztronauts_logo.png",
      accent: "#7d6cff",
      tagline: "Travel to maps and collect props.",
      description: "Jazztronauts is an exploration gamemode about collecting props from other maps.",
      menu: [
        { title: "Overview", slug: "overview" },
        { title: "Gameplay", slug: "gameplay" }
      ],
      pages: {
        overview: {
          title: "JAZZTRONAUTS",
          body: [
            "Players travel from the bar to other maps and collect props.",
            "Collected props are brought back to the bar and exchanged for money."
          ]
        },
        gameplay: {
          title: "GAMEPLAY",
          body: [
            "Players explore maps, collect props and shards, and complete missions.",
            "The trolley returns the group to the bar."
          ]
        }
      }
    }
  ],

  sampleProfilePath: "data/sample-profile.json"
};
