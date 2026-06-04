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
    background: "images/gmt_lobby2_r8.jpg",
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
      description: "A tense horror rotation where survivors search, repair, and run while the killer closes in.",
      image: "images/gamemodes/slashers_logo.png"
    },
    {
      title: "New: Prop Hunt",
      description: "Hide in plain sight as a prop or sweep the map as a hunter before time runs out.",
      image: "images/gamemodes/prophunt_logo.png"
    },
    {
      title: "New: Jazztronauts",
      description: "Hop on the trolley, raid strange maps for props and shards, then cash out back at the bar.",
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
      title: "Slashers, Prop Hunt, and Jazztronauts are joining the lineup",
      author: "CGMT Staff",
      date: "2026-06-03",
      summary: "The gamemode page now highlights the custom modes being brought into the Tower.",
      body: [
        "The gamemode section has been updated with pages for Slashers, Prop Hunt, and Jazztronauts.",
        "Each page is written for players who already know GMod but may not know what makes the Tower version special: cosmetics, payouts, achievements, and the lobby connection all matter here."
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
            "Added Discord Bot."
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
            "Players move through the map while the chimera hunts. Surviving is about awareness, routes, and staying calm when the chase starts.",
            "The mode has always been one of the stranger Tower classics, which is exactly why it belongs in the list."
          ]
        },
        {
          title: "Good To Know",
          body: [
            "Keep moving, watch corners, and do not assume another player is going to save you.",
            "Noise and hesitation are usually what turn a close escape into a very short one."
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
      tagline: "A horror round where one killer hunts a team of survivors.",
      description: "Slashers is built around pressure. Survivors need to explore the map, keep calm, and finish objectives while the killer tries to split the group and pick people off. It is slower and moodier than most Tower games, but the round can turn fast once the chase starts.",
      menu: [
        { title: "Overview", slug: "overview" },
        { title: "Maps", slug: "maps" },
        { title: "Roles", slug: "roles" },
        { title: "Milestones", slug: "milestones" },
        { title: "GMC Payout", slug: "gmc-payout" }
      ],
      pages: {
        overview: {
          title: "SURVIVE THE NIGHT",
          body: [
            "Slashers is an asymmetrical horror gamemode where one killer hunts a group of survivors across dark maps full of objectives, hiding spots, and bad decisions waiting to happen.",
            "Survivors win by working through the map objective and escaping before time runs out. The slasher wins by breaking the group apart and making sure nobody gets out clean.",
            "The CGMT version keeps the intended Slashers flow while tying it into Tower systems like the scoreboard, achievements, GMC payout, and lobby return."
          ],
          info: [
            "Players: 2 or more",
            "Style: Asymmetrical horror",
            "Match Flow: 5 rounds",
            "Teams: Survivors and Slasher"
          ]
        },
        maps: {
          title: "MAPS",
          body: [
            "Slashers maps are built around routes, darkness, and pressure. Survivors need time to search and solve objectives, while the slasher needs to control the parts of the map everyone eventually has to cross."
          ],
          sections: [
            {
              title: "Active Maps",
              body: [
                "Highschool, Lodge, Motel, Selvage, Subway, and Summercamp are set up for the Tower rotation.",
                "Each map keeps its own objective pacing, so learning the exits and generator spots matters more than trying to sprint everywhere."
              ]
            }
          ]
        },
        roles: {
          title: "ROLES",
          body: [
            "Every round has a different rhythm depending on who becomes the slasher and which survivors make it through the first few minutes."
          ],
          sections: [
            {
              title: "Survivors",
              body: [
                "Survivors use their CGMT playermodels and cosmetics. Their job is to search, coordinate, complete the map objective, and escape.",
                "The safest survivor is not always the fastest one. Staying calm and moving with purpose usually beats sprinting into the dark alone."
              ]
            },
            {
              title: "Slashers",
              body: [
                "Slashers use the original horror models for readability and mood.",
                "A good slasher pressures objectives, listens for mistakes, and forces survivors to split up before finishing them off."
              ]
            }
          ]
        },
        milestones: {
          title: "MILESTONES",
          body: [
            "Slashers milestones reward the long grind: surviving, hunting, and learning how each map wants to be played.",
            "Milestone rewards are private Tower inventory items earned through achievements instead of store purchases."
          ],
          sections: [
            {
              title: "Rewards",
              body: [
                "Ghostface is tied to the Slashers milestone track.",
                "More rewards can be added as the mode gets played and the achievement pacing settles."
              ]
            }
          ]
        },
        "gmc-payout": {
          title: "GMC PAYOUT",
          body: [
            "Slashers pays GMC for playing through rounds and performing well, then gives the normal Tower thanks-for-playing payout at the end of the match set.",
            "Survivors are rewarded for escaping and staying alive. Slashers are rewarded for kills and round pressure."
          ],
          sections: [
            {
              title: "Payout Notes",
              body: [
                "Payout is handled by the gamemode integration, not by the website.",
                "Values can be adjusted in the server code if the mode starts paying too quickly or too slowly."
              ]
            }
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
      tagline: "Hide as a prop or hunt down the room that looks just a little too suspicious.",
      description: "Prop Hunt is simple in the best way: props blend into the map, hunters try to find them, and every tiny movement feels like a bad idea. The Tower version keeps playermodels and cosmetics where they make sense, then hides them once a player becomes a prop.",
      menu: [
        { title: "Overview", slug: "overview" },
        { title: "Maps", slug: "maps" },
        { title: "Teams", slug: "teams" },
        { title: "Milestones", slug: "milestones" },
        { title: "GMC Payout", slug: "gmc-payout" }
      ],
      pages: {
        overview: {
          title: "HIDE IN PLAIN SIGHT",
          body: [
            "Prop Hunt is a hide-and-seek gamemode where props disguise as objects and hunters try to spot what does not belong.",
            "The fun is in the small panic: one bad wiggle, one strange chair, one hunter staring a little too long at the corner you thought was perfect.",
            "The CGMT version keeps the Tower scoreboard, achievements, GMC payout, lobby return, and cosmetics where they make sense."
          ],
          info: [
            "Players: 2 or more",
            "Style: Hide and seek",
            "Teams: Props and Hunters",
            "Goal: Props survive, Hunters find them"
          ]
        },
        maps: {
          title: "MAPS",
          body: [
            "Prop Hunt maps work best when they have clutter, readable rooms, and enough weird little hiding spots to make hunters doubt themselves."
          ],
          sections: [
            {
              title: "Active Maps",
              body: [
                "FCC Apartment, High Floor Office, House, Office, Restaurant, Village Island, and Western City are part of the Tower setup.",
                "Map previews and multiserver entries are handled through the normal Tower map list."
              ]
            }
          ]
        },
        teams: {
          title: "TEAMS",
          body: [
            "Props and hunters play very differently, so the Tower integration keeps their cosmetic behavior separate."
          ],
          sections: [
            {
              title: "Props",
              body: [
                "Props spawn as their CGMT playermodel before disguising, then lose hats and wearable cosmetics once they become an actual prop.",
                "Movement and collision are tuned so props feel smooth while still fitting through spaces that make sense for their size."
              ]
            },
            {
              title: "Hunters",
              body: [
                "Hunters use their CGMT playermodels, hats, weapons, and normal player presentation.",
                "Missed shots can punish careless checking, so hunters need to search with a little patience."
              ]
            }
          ]
        },
        milestones: {
          title: "MILESTONES",
          body: [
            "Prop Hunt achievements track the big habits: surviving as a prop, killing props, changing disguises, and taunting.",
            "Milestones are earned by playing the mode, not by buying them from stores."
          ],
          sections: [
            {
              title: "Achievement Examples",
              body: [
                "Survive as a prop, kill props as a hunter, become different props, and use taunts during rounds.",
                "The server code decides the exact award thresholds."
              ]
            }
          ]
        },
        "gmc-payout": {
          title: "GMC PAYOUT",
          body: [
            "Prop Hunt pays GMC for round participation and performance, then returns players through the Tower flow when the game is done.",
            "Hunters are rewarded for finding props. Props are rewarded for surviving and playing out the round."
          ],
          sections: [
            {
              title: "Payout Notes",
              body: [
                "Payout tuning lives in the gamemode integration.",
                "The website only describes the flow so players know what to expect."
              ]
            }
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
      tagline: "Ride the trolley, steal props from strange maps, and get paid back at the bar.",
      description: "Jazztronauts is the odd one out, and that is the charm. It is less of a quick match and more of a hangout expedition: players leave the bar, collect props and shards, finish cat missions, then bring the haul home.",
      menu: [
        { title: "Overview", slug: "overview" },
        { title: "The Bar", slug: "bar" },
        { title: "Missions", slug: "missions" },
        { title: "Milestones", slug: "milestones" },
        { title: "GMC Payout", slug: "gmc-payout" }
      ],
      pages: {
        overview: {
          title: "RIDE THE TROLLEY",
          body: [
            "Jazztronauts is part hangout, part prop robbery, and part strange little expedition machine.",
            "Players gather in the bar, pick a map, ride the trolley out, collect props and shards, then return to cash out when the haul is worth bringing home.",
            "Unlike the short round gamemodes, Jazztronauts is built to stay running. Players can join the bar, leave for missions, and return without needing a traditional match reset."
          ],
          info: [
            "Players: Drop-in friendly",
            "Style: Exploration and collection",
            "Hub: jazz_bar",
            "Goal: Grab props, shards, and mission rewards"
          ]
        },
        bar: {
          title: "THE BAR",
          body: [
            "The bar is the center of Jazztronauts. It is where players regroup, choose maps, talk to cats, and cash out prop money.",
            "If the multiserver board shows the bar as empty, nobody is currently hanging out there. If it shows players, the server is live and ready."
          ],
          sections: [
            {
              title: "Joining",
              body: [
                "Players join through the Tower port while the server is on jazz_bar.",
                "If the server is away exploring another map, the board uses the exploring preview instead of pretending the bar is open."
              ]
            }
          ]
        },
        missions: {
          title: "MISSIONS",
          body: [
            "Cat missions give the group something more focused to chase than random prop collecting.",
            "Mission progress feeds into achievements, with the main completion award tuned around finishing the full set of Jazztronauts missions."
          ],
          sections: [
            {
              title: "Shards",
              body: [
                "Shards are worth watching for during trips. They pay GMC when collected and count toward Jazztronauts achievements.",
                "Shard awards are tuned lower than the mission cap so the achievements are realistic instead of endless busywork."
              ]
            }
          ]
        },
        milestones: {
          title: "MILESTONES",
          body: [
            "Jazztronauts milestones reward long-term collecting and mission progress.",
            "The trolley pet is the standout reward: a tiny flying trolley styled after the Jazztronauts bus."
          ],
          sections: [
            {
              title: "Rewards",
              body: [
                "The trolley pet is attached to one of the harder Jazztronauts achievements.",
                "Jazz cat playermodel rewards."
              ]
            }
          ]
        },
        "gmc-payout": {
          title: "GMC PAYOUT",
          body: [
            "Jazztronauts pays GMC only when the gamemode itself pays its own currency or reward moments.",
            "That means prop lever cashouts, shard pickups, and mission completion are the important payout points."
          ],
          sections: [
            {
              title: "Payout Notes",
              body: [
                "The GMC amount is matched to the in-gamemode reward moment instead of constantly dripping money in the background."
              ]
            }
          ]
        }
      }
    }
  ],

  sampleProfilePath: "data/sample-profile.json"
};
