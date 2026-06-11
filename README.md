# CGMT Website
Mirrored
https://stopcolin.github.io/CGMTWebsite/cgmtlobby.com/index.html

## Editing Gamemodes

- Edit the original Lobby, Ball Race, Virus, PVP Battle, Zombie Massacre,
  Mini Golf, Source Karts, and Gourmet Race pages in
  `cgmtlobby.com/cgmt-gamemodes.js`.
- Each gamemode has an editable `menu` and `pages` section. Page content is
  stored as normal HTML so the original layouts, images, and item lists remain
  intact.
- Edit Ultimate Chimera Hunt, Slashers, Prop Hunt, Jazztronauts, and the gamemode list itself in
  `cgmtlobby.com/cgmt-config.js`.
- The downloaded HTML pages in `cgmtlobby.com/gamemodes` are retained as
  backups. Running `node tools/extract-gamemode-content.js` rebuilds
  `cgmt-gamemodes.js` from those backups and overwrites manual edits in it.
