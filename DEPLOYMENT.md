# Getting Today's Affirmation live on Vercel

The app is fully static (no backend yet), so Vercel is a great fit — it's free for a project this size and gives you automatic redeploys once you're editing in Claude Code.

## Fastest path: Vercel CLI (no GitHub needed)

1. Install the CLI once:
   ```bash
   npm i -g vercel
   ```
2. From inside `todays-affirmation-project/`, run:
   ```bash
   vercel
   ```
3. Answer the prompts (it will ask to log in / create a free account the first time — email or GitHub login both work). Accept the defaults; it auto-detects a static site.
4. Once it finishes, run:
   ```bash
   vercel --prod
   ```
   to push it to your permanent production URL (something like `todays-affirmation.vercel.app`).

That's it — live in a few minutes, no repository required.

## Best path once you're iterating with Claude Code: GitHub + Vercel

1. Push `todays-affirmation-project/` to a new GitHub repository (Claude Code can do this for you with `git init`, `git add`, `git commit`, `git push`)
2. Go to **https://vercel.com/new** and import that repository
3. Vercel auto-detects the static site and deploys it
4. From then on, every `git push` automatically redeploys the live site — no manual `vercel --prod` needed

This is the setup worth moving to once you're regularly adding affirmations or features.

## Domain

**Recommendation: start with a subdomain of your existing phidims.com, e.g. `today.phidims.com` or `affirmations.phidims.com`.**

Why:
- It's free — just a DNS record pointed at Vercel, no new domain purchase
- It immediately borrows the trust and reach of your existing PhiDims audience, which already has an established Daily Affirmation rhythm on social media
- Vercel supports custom domains and subdomains on the free tier — add it in **Project Settings → Domains**, then add the CNAME record your DNS provider gives you

If the app later grows into something you want to treat as a separate product or brand (its own audience, possibly monetized separately from PhiDims), a standalone domain like `todaysaffirmation.app` or `.com` becomes worth the ~$12–20/year — but that's a "move it later" decision, not a launch blocker. Subdomains can be swapped for a standalone domain at any point without losing anything.

## On finishing the affirmation library before deploying

Worth weighing before you decide:

**Reasons to deploy now with the current 50:**
- Each visitor sees one affirmation a day — at 50 entries, that's ~7 weeks before any repeat, which is already a meaningfully long runway
- A live link lets you start gathering real feedback from your existing audience while the content set is still cheap to adjust
- Momentum matters — a public "soft launch" tends to get finished faster than a private one waiting for "done"

**Reasons to wait:**
- Anyone using the **Browse** tab can see the whole library at once, so the gap between 50 and 365 is visible immediately to a curious visitor — this matters more for a public brand launch than a private daily-use app
- If this is meant to represent a full year commitment from day one, launching partial content could undercut that promise

**My recommendation:** don't block on all 366 — that's a large writing project on its own. Instead, aim for a middle target (100–150 affirmations, roughly a full season) before the public launch, framing it explicitly as "growing weekly" in the Settings note that's already in the app. Continue adding the rest after launch. This gets you live sooner, while still giving first-time visitors who browse ahead enough depth that the "50 out of 365" gap isn't the first thing they notice.

If you'd rather have the full 366 before anyone sees it, that's a reasonable call too, given how much this connects to your existing PhiDims Daily Affirmation practice — just worth treating as its own content project with its own timeline, separate from the technical deploy steps above.
