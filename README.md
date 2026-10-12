# Odd Angle

Three daily rounds, 30 seconds each. Recognize iconic landmarks in smooth real video clips: Eiffel Tower, Statue of Liberty, Colosseum and Big Ben. Shorter footage is slowed with motion-interpolated frames so each round runs continuously without looping. Earlier object-photo puzzles remain in the archive.

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

Optional server configuration: `PORT` changes the listening port; `ODD_ANGLE_DATA_DIR` sets the persistent data directory (default `.data`). Keep that directory on persistent storage to retain the leaderboard. One Node server instance is supported. Score data is edition-specific: `.data/daily-iconic-video-v1.json`. Static-only hosting supports offline play, but cannot host the shared leaderboard.

Run `npm test` for daily selection, three-round scoring, frame selection, archive boundaries, and server verification/persistence checks. Regenerate the standalone version after changes with `npm run build` then `python3 scripts/export-standalone.py`.

## Rules

- Each round starts with 1,000 possible points; they decrease across 30 seconds.
- Every wrong guess costs 50 points. Timeouts score zero.
- Three different objects per daily set, maximum 3,000 total points.
- Everyone gets the same UTC-dated set. Hidden-tab and reload time counts for server rounds.
- Complete all rounds before optional name submission to the daily leaderboard.
- Archive and replay are practice; they do not replace daily results or submit scores.

The server validates answers, elapsed time, penalties and the aggregate score. Browser identity is an anonymous local ID, not an account: clearing storage can create another identity. This prototype has no strong anti-cheat, moderation or production abuse protection. Four iconic landmarks repeat; expand the curated collection for launch. Archive dates follow the same daily schedule beginning 2026-10-06; they do not claim historic play records.

## Media credits

Photos © Amazon.com, licensed under CC BY 4.0. Dataset creators: Matthieu Guillaumin, Thomas Dideriksen, Kenan Deng, Himanshu Arora, Jasmine Collins and Jitendra Malik. Selected images were resized/recompressed and their viewpoints reordered. See `public/media/SOURCES.md`, `manifest.json` and `LICENSE-CC-BY-4.0.txt` for provenance and license. The in-game credits also include attribution and a license link.

## Video-ready rounds and forgiving guesses

Rounds can now provide a `video` URL, a `poster` image, and an optional `clipStart` in seconds instead of `frames`. Clips must have at least 30 playable seconds after clipStart. The player fully downloads a clip before enabling play, then uses normal continuous video playback. No 3D or photo-sequence interpolation is involved. MP4 and WebM are supported when the browser can decode their codecs; compatible web formats should be curated. The standalone exporter embeds bundled videos under public/media/videos.

Real footage has been sourced from Wikimedia Commons and inspected. Daily rounds now use video. No test-pattern videos are included.

Guesses accept listed alternate names, spacing/punctuation variations, and small spelling mistakes. Names with at least four characters accept one edit (including swapped adjacent letters); names of eight or more characters accept two. Very short names require exact spelling to avoid accepting unrelated words. The same matcher runs on the client and score server.

Video credits: Mikani (Eiffel Tower, CC BY-SA 4.0); Burkouri (Statue of Liberty, CC0); Quahadi (Colosseum, CC BY 4.0); Deror avi (Big Ben, CC BY-SA 4.0). Source links and editing details are in public/media/videos/sources.json and SOURCES.md and the in-game credits. Adapted clips retain each source license. This starter collection includes straightforward views; difficulty can be curated with additional footage.
