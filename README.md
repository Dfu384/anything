# Odd Angle

Three daily rounds, 30 seconds each. Guess real objects as their viewpoint changes from rear or side toward the front. Seven Amazon Berkeley Objects turntable sequences are included: 13 real photographs per object, stepping every 2.5 seconds. No synthetic rendering or zoom-out effects.

## Windows: play without installation

Download the repository ZIP from GitHub, extract it, and double-click **PLAY.html**. This standalone version supports all three rounds, the archive and local scores. The shared leaderboard requires the server version.

## Development and shared leaderboard

Requires Node.js 22.12+ (Node.js 24 tested).

```sh
npm ci --cache /workspace/.npm-cache
npm run dev
```

The development server hosts the game and score API on port 5173. For production:

```sh
npm run build
npm start
```

Optional server configuration: `PORT` changes the listening port; `ODD_ANGLE_DATA_DIR` sets the persistent data directory (default `.data`). Keep that directory on persistent storage to retain the leaderboard. One Node server instance is supported. Static-only hosting supports offline play, but cannot host the shared leaderboard.

Run `npm test` for daily selection, three-round scoring, frame selection, archive boundaries, and server verification/persistence checks. Regenerate the standalone version after changes with `npm run build` then `python3 scripts/export-standalone.py`.

## Rules

- Each round starts with 1,000 possible points; they decrease across 30 seconds.
- Every wrong guess costs 50 points. Timeouts score zero.
- Three different objects per daily set, maximum 3,000 total points.
- Everyone gets the same UTC-dated set. Hidden-tab and reload time counts for server rounds.
- Complete all rounds before optional name submission to the daily leaderboard.
- Archive and replay are practice; they do not replace daily results or submit scores.

The server validates answers, elapsed time, penalties and the aggregate score. Browser identity is an anonymous local ID, not an account: clearing storage can create another identity. This prototype has no strong anti-cheat, moderation or production abuse protection. Seven objects repeat; expand the curated collection for launch. Archive dates follow the same daily schedule beginning 2026-10-06; they do not claim historic play records.

## Photo credits

Photos © Amazon.com, licensed under CC BY 4.0. Dataset creators: Matthieu Guillaumin, Thomas Dideriksen, Kenan Deng, Himanshu Arora, Jasmine Collins and Jitendra Malik. Selected images were resized/recompressed and their viewpoints reordered. See `public/media/SOURCES.md`, `manifest.json` and `LICENSE-CC-BY-4.0.txt` for provenance and license. The in-game credits also include attribution and a license link.
