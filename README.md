# Odd Angle

Three daily rounds, 30 seconds each. The current Explorer collection features Sagrada Familia, Stonehenge and Tower Bridge: recognizable travel landmarks with less obvious opening views. Earlier iconic hard-angle videos, classic landmark videos and object-photo puzzles remain available for archive practice. Real recorded viewpoints are joined with smooth transitions.

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

Optional server configuration: `PORT` changes the listening port; `ODD_ANGLE_DATA_DIR` sets the persistent data directory (default `.data`). Keep that directory on persistent storage to retain the leaderboard. One Node server instance is supported. Score data is edition-specific: `.data/daily-explorer-angles-v1.json`. Static-only hosting supports offline play, but cannot host the shared leaderboard.

Run `npm test` for daily selection, three-round scoring, frame selection, archive boundaries, and server verification/persistence checks. Regenerate the standalone version after changes with `npm run build` then `python3 scripts/export-standalone.py`.

## Rules

- Each round starts with 1,000 possible points; they decrease across 30 seconds.
- Every wrong guess costs 50 points. Timeouts score zero.
- Three different objects per daily set, maximum 3,000 total points.
- Everyone gets the same UTC-dated set. Hidden-tab and reload time counts for server rounds.
- Complete all rounds before optional name submission to the daily leaderboard.
- Archive and replay are practice; they do not replace daily results or submit scores.

The server validates answers, elapsed time, penalties and the aggregate score. Browser identity is an anonymous local ID, not an account: clearing storage can create another identity. This prototype has no strong anti-cheat, moderation or production abuse protection. The three-landmark Explorer collection repeats; expand curated footage for launch. Earlier landmark collections are preserved as practice. Archive dates follow the same daily schedule beginning 2026-10-06; they do not claim historic play records.

## Media credits

Photos © Amazon.com, licensed under CC BY 4.0. Dataset creators: Matthieu Guillaumin, Thomas Dideriksen, Kenan Deng, Himanshu Arora, Jasmine Collins and Jitendra Malik. Selected images were resized/recompressed and their viewpoints reordered. See `public/media/SOURCES.md`, `manifest.json` and `LICENSE-CC-BY-4.0.txt` for provenance and license. The in-game credits also include attribution and a license link.

## Video-ready rounds and forgiving guesses

Rounds can now provide a `video` URL, a `poster` image, and an optional `clipStart` in seconds instead of `frames`. Clips must have at least 30 playable seconds after clipStart. The player fully downloads a clip before enabling play, then uses normal continuous video playback. No 3D or photo-sequence interpolation is involved. MP4 and WebM are supported when the browser can decode their codecs; compatible web formats should be curated. The standalone exporter embeds bundled videos under public/media/videos.

Real footage has been sourced from Wikimedia Commons and inspected. Daily rounds now use video. No test-pattern videos are included.

Guesses accept listed alternate names, spacing/punctuation variations, and small spelling mistakes. Names with at least four characters accept one edit (including swapped adjacent letters); names of eight or more characters accept two. Very short names require exact spelling to avoid accepting unrelated words. The same matcher runs on the client and score server.

Classic collection credits: Mikani (Eiffel Tower, CC BY-SA 4.0); Burkouri (Statue of Liberty, CC0); Quahadi (Colosseum, CC BY 4.0); Deror avi (Big Ben, CC BY-SA 4.0). Source links and editing details are in public/media/videos/sources.json and SOURCES.md and the in-game credits. Adapted clips retain each source license. This starter collection includes straightforward views; difficulty can be curated with additional footage.

## Iconic archive curation

- Eiffel Tower: begin inside its elevator among the girders; transition to a high drone view, then to the familiar exterior.
- Statue of Liberty: a real drone sequence starts at the stone pedestal, moves up the robes and over the crown, and finishes near the torch and face.
- Golden Gate Bridge: begin looking sideways through cables from a passing car; transition to a sunset silhouette and the recognizable red span.

The Eiffel Tower and Golden Gate sequences use one-second crossfades between different recordings. They do not claim to be a single continuous camera path. Each round ends on a fair, recognizable view. The timer, three-round total, typo tolerance and leaderboard rules are unchanged. The new hard edition uses separate score storage, preserving previous edition records. Sources, licensing and precise excerpt timings are in public/media/videos/sources.json. The original videos are in public/media/videos/classic and can be replayed from the archive.

## Explorer collection

Current daily subjects are Sagrada Familia, Stonehenge and Tower Bridge. Sagrada Familia accepts common alternatives such as “Sagrada” and “Gaudi church”; spelling tolerance remains unchanged. The collection uses real footage of the actual named sites. A search result for another Holy Family church was explicitly excluded. Source footage may be historical and lower-resolution; filming dates and original assets can be reviewed via the recorded source links.

The archive offers the previous iconic hard-angle set through `?collection=iconic` and the original easier videos through `?collection=classic`. Both are practice only. They cannot submit scores or overwrite daily results. Score storage is edition-specific, preserving previous edition files.
