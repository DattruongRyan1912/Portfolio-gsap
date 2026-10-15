# Portfolio redesign: bento grid, case-study pages, real recordings

Date: 2026-10-16 · Status: approved in chat (sections 1–4) · Owner: Dat Truong (Ryan)

## Intent

The portfolio of a backend developer (2 years), read by recruiters and collaborators. Non-commercial.
Keep: bilingual EN/VI content, the four projects (TienDatAudio, TOEIC Master, XTruyen, MyNotch),
the domain `portfolio.truongquocdat.id.vn` and the VPS deployment (systemd + shared nginx).
Change: a new visual design, fix "clicking a project scrolls the page to the top", add automated tests.
Success: looks professional, reads easily, opening a project is smooth on desktop and phone, the page
never jumps, and the tests below pass in Chromium and WebKit.

## Decisions (from the brainstorm)

| Topic | Decision |
|---|---|
| Direction | Bento grid of tiles (option C) |
| Palette | Graphite: near-black ground, dark tiles, hairline borders, one colour dot per product |
| Tile media | Short real recordings (6–8 s) of each live site, poster image first; MyNotch reuses its clip |
| Sections kept | Intro, stack, about + principles, process, contact, plus a new "self-run infrastructure" tile |
| Project detail | A page per project at `/projects/[slug]` |
| Motion | "Rich", but native scrolling only (no ScrollSmoother, no pinning) |
| Stack | Same: Next.js via vinext, React 19, GSAP, Tailwind 4, deployed as today |
| Locale | Keep localStorage (`portfolio-locale`); hide content until the locale is known to avoid the EN flash |

## Root cause addressed

ScrollSmoother translates `#smooth-content` inside an `overflow: hidden` wrapper and the project rail is
pinned. Focusing a control inside it lets some engines (WebKit in particular) scroll the wrapper to reveal
the focused element, and `Flip` + `ScrollTrigger.refresh()` re-measure the pin while the layout changes.
The redesign removes ScrollSmoother, the pinned rail and in-place expansion, so none of these remain.
A regression test covers it in WebKit and Chromium.

## Home page (`/`)

Desktop: a 4-column grid, tiles span 1–4 columns and 1–2 rows. Reading order (also the phone order):

1. Intro (2×2): availability + timezone, name, headline, "See projects" and "GitHub" buttons.
2. TienDatAudio (2×2), video tile.
3. Stack (1×2): four groups (backend, API & security, data, DevOps) as chips.
4. TOEIC Master (2×2), video tile.
5. XTruyen (1×2), video tile.
6. MyNotch (2×2), video tile.
7. Self-run infrastructure (2×2): Cloudflare → Nginx edge (TLS) → Docker/systemd, one VPS, auto-renewed
   Let's Encrypt, CI on GitHub Actions; an animated dot flows along the path.
8. About + 4 principles (2×2).
9. Process (2×1): five steps.
10. Contact (2×1): the only light tile, link to GitHub.

Header: slim, sticky, anchors (Projects, Stack, Infrastructure, Contact) using native scrolling, EN/VI switch.
Phone: one column in the order above. Each project tile is a single link to its page.

## Project page (`/projects/[slug]`)

- Top: back link, colour dot, category · year · status (Live / In development), title, one-line summary,
  buttons: open site, source (or "Private repository" for MyNotch).
- Facts: role, timeline, stack.
- Large video: the same recording as the tile; shared-element transition from the tile.
- Five sections with a sticky table of contents on desktop: Problem, Architecture (SVG block diagram
  rendered from data), Technical decisions (2–4 cards), Results (verified facts only), Next up
  (honest about unfinished parts, e.g. TOEIC Parts 3/4/6/7, XTruyen worker, MyNotch in development).
- Bottom: previous / next project tiles (wrap around).
- Unknown slug: 404. Metadata per project (title, description, og image).
- Statically generated for the four slugs.

## Motion

- Content is visible by default in CSS; GSAP only animates from an offset, so a script failure still shows
  the page. Only `transform` and `opacity` animate.
- Load: header slides in, intro name split into characters, headline into words, tiles stagger in reading
  order (≈60 ms).
- Hover (fine pointers only): tile lifts a few px, border brightens, a radial spotlight follows the cursor,
  the video scales slightly.
- Scroll: tiles below the fold rise once (ScrollTrigger batch), headings split into words, stack chips pop,
  the infrastructure dot loops while in view, process steps light up in turn.
- Navigation: View Transitions API for tile → page (video and title morph); plain navigation where
  unsupported. Back restores the previous scroll position.
- Project page: title characters, section reveals, diagram edges draw in, active TOC entry highlights.
- `prefers-reduced-motion: reduce`: no GSAP animation, no view transitions, videos do not autoplay
  (poster + play button).
- Videos: `muted`, `playsinline`, `loop`, `preload="none"` with poster; play when ≥35 % visible,
  pause when not.

## Content model

`app/content.ts` keeps `portfolioContent[locale]`. Projects gain: `slug`, `color`, `status`, `role`,
`timeline`, `media` (`video`, `poster`), `problem`, `architecture` (nodes and edges for the diagram),
`decisions[]`, `results[]`, `next[]`. Copy is grounded in the code and deployments researched on
2026-10-15; no unverified numbers.

## Media

Recorded with Playwright (`recordVideo`, 1280×800) against the live sites, trimmed to 6–8 s with ffmpeg,
H.264 MP4 (≤ ~1.5 MB each) and a JPEG poster, stored in `public/media/projects/`. MyNotch uses the
existing screen-recording clip.

## Testing

Playwright end-to-end tests against the production build (`vinext start`), Chromium and WebKit:

- Home: ten tiles in order; no horizontal overflow at 1440, 768 and 375 px; no console errors.
- Regression: clicking a project tile does not change `scrollY` before navigation; Back restores the
  previous scroll position (±40 px).
- Locale: switching to VI updates text and `html[lang]`, persists across navigation and reload.
- Project pages: correct links per project (or the private label), prev/next wrap around, unknown slug 404,
  per-project `<title>` and absolute `og:image`.
- Video: poster, muted, playsinline; no autoplay under reduced motion.
- Keyboard: tiles are reachable with Tab and show a visible focus ring.

Plus the existing gates from `AGENTS.md`: `tsc --noEmit`, `npm run lint`, `npm run build`,
`npm audit --omit=dev`.

## Delivery

Commit to `main`, push, then deploy to the VPS (`~/apps/portfolio-gsap`, `systemctl restart
portfolio-gsap`) and verify the live root, a project page, the og image and HTTPS.
