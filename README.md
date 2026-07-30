# The Interactive Designer

Static site at `theinteractivedesigner.co.uk`. Markdown in the repo, HTML out,
nothing running in production.

```
src/content/posts/*.md      the posts — this is the database
src/layouts/Base.astro      <head>, masthead, footer
src/pages/index.astro       the archive
src/pages/[...slug].astro   a single post
src/pages/rss.xml.js        public feed — every post
src/pages/linkedin.xml.js   opt-in feed — only posts you flagged
src/styles/global.css       all the design tokens, top of file
public/admin/               the CMS (config.yml is the field list)
oauth-worker/               GitHub sign-in for the CMS
```

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
```

---

## Two feeds, on purpose

| Feed | Contains | Who reads it |
| --- | --- | --- |
| `/rss.xml` | every published post | readers, crawlers |
| `/linkedin.xml` | only posts where you ticked **Post to LinkedIn** | Make, nobody else |

Make watches `/linkedin.xml` and nothing else. A post can go live on the site
and never reach LinkedIn — that's the default. `/linkedin.xml` is disallowed in
`robots.txt` and left out of the sitemap.

Ticking the box on an **old** post still works. Make has never seen that URL in
this feed, so it treats it as new and posts it.

---

## Setup, once

Five steps, in order — later ones need values from earlier ones.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:YOUR-USER/theinteractivedesigner.git
git push -u origin main
```

### 2. Cloudflare Pages

Workers & Pages → Create → Pages → Connect to Git → pick the repo.

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |

Check the `*.pages.dev` URL works, then add `theinteractivedesigner.co.uk` as a
custom domain. Apex domain, so no Worker routing needed.

### 3. GitHub OAuth app

github.com → Settings → Developer settings → OAuth Apps → New.

- **Homepage URL** — `https://theinteractivedesigner.co.uk`
- **Authorization callback URL** — `https://tid-cms-auth.YOUR-SUBDOMAIN.workers.dev/callback`

You don't know the worker subdomain yet. Put a placeholder, do step 4, then come
back and correct it. Keep the **Client ID** and generate a **Client secret** —
the secret is shown once.

### 4. The sign-in worker

```bash
cd oauth-worker
npm install
npx wrangler login
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler deploy
```

Deploy prints the worker URL. Go back to step 3 and fix the callback URL.

### 5. Point the CMS at both

Two lines in `public/admin/config.yml`:

```yaml
repo: YOUR-GITHUB-USER/theinteractivedesigner
base_url: https://tid-cms-auth.YOUR-SUBDOMAIN.workers.dev
```

Push, then open `theinteractivedesigner.co.uk/admin/` and sign in with GitHub.

---

## The LinkedIn side

Scenario **The Interactive Designer – LinkedIn queue**, ID `9592868`,
team `521692`. Already built. Two modules:

1. `rss:TriggerNewArticle` — polls `/linkedin.xml` hourly, 1 item per run
2. `linkedin:CreatePost` — content mapped to
   `{{ifempty(1.rssFields.linkedintext; 1.description)}}`

It is **inactive** with **no connection attached**. To finish it:

1. Authorise LinkedIn via the credential request in Make
2. Open the scenario, pick the connection on module 2
3. **Set the trigger's starting point** — right-click module 1 → *Choose where
   to start* → "from now on". Skip this and the first run may post everything
   already in the queue.
4. Activate

Two things about the mapping worth knowing:

- **The `ifempty` fallback is deliberate.** Make exposes non-standard RSS
  elements under `rssFields` with lowercased names, so `<linkedintext>` should
  arrive as `rssFields.linkedintext`. That's inferred from how Make parsed a
  sample feed, not verified against yours. If it resolves empty, the post falls
  back to the standfirst rather than failing. Check the first run.
- **The post URL is appended to the body.** LinkedIn suppresses posts with
  outbound links. If you'd rather put it in the first comment by hand, delete
  the `Full post:` line from the mapping.

---

## Writing a post

Go to `/admin/`, **New Post**, fill in the form, **Publish**.

That commits a markdown file and any image to `main`. Cloudflare rebuilds — about
forty seconds from publish to live. Then up to an hour before LinkedIn, if you
ticked the box.

- **Draft** — saved to the repo, kept out of both feeds and off the site
- **Post to LinkedIn** — off by default; joins the queue on the next build

Proofread before you untick Draft. LinkedIn is a one-way door: the feed dedupes
by URL, so fixing a typo afterwards won't re-post, and the LinkedIn copy keeps
the typo.

Fields are defined in `public/admin/config.yml`. Add one there and add the
matching line to `src/content.config.ts` — if they disagree the build fails
loudly rather than shipping something broken.

---

## Notes

- **Images** go to `public/images/uploads/` and are served as-is. No resizing, so
  keep them under about 2MB. The CMS rejects anything larger.
- **Design tokens** are the `:root` block at the top of `global.css`. Three
  Bauhaus primaries, black, white, one grey, and the type scale. Nothing below
  `:root` invents its own value.
- **No webfonts.** Helvetica Neue on Apple devices, Arial everywhere else. Zero
  font requests, so nothing flashes or reflows. Swap `--sans` if you'd rather
  guarantee the same face on Windows.
- **The grid is 12 columns above 64rem, 4 below.** `.grid` applies it; children
  claim columns with `grid-column`.
- **Post numbers cycle red → blue → yellow** by post number, so a post keeps its
  colour permanently once published.
- **Contrast is AA throughout** — white on red 4.88:1, black on yellow 14.08:1.
  Re-check if you retune the primaries.
- **The two sample posts** are placeholders with `linkedin: false`. Safe to leave
  while you set up; delete them when you have your own.
