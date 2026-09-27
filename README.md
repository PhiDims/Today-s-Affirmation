# Today's Affirmation

A calm, mobile-first daily affirmation companion — one grounded affirmation a day, with a reflection question and a practical action. Built as a prototype in Claude.ai, structured here for continued development in Claude Code.

## What's in this folder

```
todays-affirmation/
├── index.html         Page shell — structure and screen markup only
├── css/
│   └── styles.css     All design tokens, layout, and component styles
├── js/
│   ├── data.js         CATEGORIES + AFFIRMATIONS content (currently 50 of 366)
│   └── app.js            All app logic: state, rendering, navigation, storage
├── DEPLOYMENT.md       Vercel deployment steps + domain recommendation
└── README.md
```

## Run it locally

No build step needed — it's plain HTML/CSS/JS. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## What already works

- Daily affirmation that rotates automatically by day-of-year
- Browse with search + category filters (10 categories)
- Journal (write/edit/delete reflections)
- Favourites
- Streak tracker
- Spoken affirmations via the Web Speech API (works out of the box, no service needed)
- Share-as-image (canvas-generated PNG, downloads or uses native share sheet)
- Light/dark theme
- Everything currently persists in `localStorage` only — nothing leaves the device

## Suggested next steps for Claude Code

1. **Deploy it** — see `DEPLOYMENT.md` for Vercel setup and a domain recommendation.
2. **Grow the content library toward 366.** `js/data.js` documents the exact shape each entry needs (`id`, `category`, `text`, `reflection`, `action`). The rotation logic in `js/app.js` already scales automatically as the array grows — no other code changes needed. See `DEPLOYMENT.md` for a recommended pacing (a season's worth before public launch, rest added over time) rather than blocking launch on all 366 at once.
3. **Add a real backend for optional accounts + sync.** A lightweight backend (Supabase or Firebase) would let a signed-in user sync across devices while keeping the current anonymous/local experience as the default.
4. **Add real push notifications** — needs a service worker + Web Push (web) or a native notification API (if wrapped as a native app).
5. **Decide: refine the web app, or wrap it as a native app** with Capacitor for iOS/Android distribution.

## Content format reference (for adding affirmations)

```js
{
  id: 'category-6',           // unique, kebab-case
  category: 'healing',        // must match a key in CATEGORIES
  text: "...",                // the affirmation itself
  reflection: "...",          // one reflective question
  action: "...",              // one concrete, doable action for the day
}
```
