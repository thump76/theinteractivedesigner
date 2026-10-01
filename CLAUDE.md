# CLAUDE.md

Philip Brumpton's personal site, theinteractivedesigner.co.uk. Senior product
designer who still writes the CSS. The site is his hub: posts, CV, apps,
services, contact, and links out to everything else he runs.

README.md covers setup, the CMS and the LinkedIn feed in detail. This file is
the short version plus the rules.

## Deploying

- **Pushing to `main` puts it live.** Cloudflare rebuilds in under a minute.
  Never push or merge to `main` without Philip saying so.
- Work on a branch, push the branch, and let him merge (or ask first).
- The CMS at `/admin/` also commits straight to `main`. Pull before starting.
- Check `npm run build` passes before pushing anything.

## Stack

- Astro, static output. No database: posts are markdown in
  `src/content/posts/`, app listings in `src/data/apps.json`.
- Sveltia CMS in `public/admin/`, GitHub sign-in via `oauth-worker/`.
- Hosted on Cloudflare. Running cost is the domain, keep it that way.
- No webfonts (Helvetica, then Arial). No client-side JS unless there's no
  other way. Accent red is `#E30613`.

## Where things go

- New top-level page: `src/pages/<name>.astro`, using `layouts/Base.astro`.
  Reuse the CV classes in `src/styles/pages.css` (`.cv`, `.role`,
  `.role-meta`, the red `h2` rule) before adding new CSS.
- Add the page to the masthead nav in `Base.astro` and to `public/llms.txt`.
- Keep the structured data intact: `PersonSchema.astro` defines `#philip`,
  and the CV page is the canonical "who is this person" page.

## Writing rules

- UK English throughout.
- No em dashes. Use commas, brackets or full stops.
- Never "reach out", "buy" or "grab".
- First person, plain and specific. Say what shipped and what it did, not
  what he's passionate about. Numbers over adjectives.
- Keep it focused: he doesn't want to read as a jack of all trades. A small
  number of things, each with one proof point.

## Images

- Philip crops images himself. Use them as supplied: resize and compress
  only, never crop or reframe.

## Don't

- Don't add a CSS framework, analytics, cookie banners or a database.
- Don't touch `linkedin.xml.js` or the `linkedin` field in post frontmatter without asking.
  Anything flagged goes out to LinkedIn automatically and can't be pulled back.
