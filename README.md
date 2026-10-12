# Odd Angle

A daily real-photo recognition game. A tight crop gradually zooms out over 20 seconds. Faster correct guesses earn more points; each wrong guess costs 50. No video or 3D rendering required.

## Play on Windows

On GitHub, select **Code → Download ZIP**. Right-click the downloaded ZIP and select **Extract All**. Open the extracted folder and double-click **PLAY.html** in Edge or Chrome. No Node.js installation is needed for this version. Browser storage for local files may vary; use the development server for reliable result persistence.

Regenerate the standalone file after changes with `npm run build` followed by `python3 scripts/export-standalone.py`.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci --cache /workspace/.npm-cache
npm run dev
```

Open the development server on port 5173. `npm test` checks daily selection, synonyms, and scoring. `npm run build` creates the production bundle; `npm run preview` serves it.

## Current collection

Three locally bundled real photographs rotate daily at midnight UTC: fruit, a baboon, and a building. These are OpenCV development samples. See public/media/SOURCES.md for provenance. The reveal is an animated crop, not a physical change in viewpoint. Review individual media rights and expand the collection before public release.

Daily results persist in this browser. Practice does not overwrite them. Client-side answers and scores are not cheat-resistant; no accounts or leaderboard are provided. Hidden-tab time counts.
