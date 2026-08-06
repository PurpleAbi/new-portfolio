# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Abigail Santana Medina's personal portfolio site. Static HTML/CSS/vanilla JS — no build tooling, no package manager, no framework. Deployed as-is (e.g. GitHub Pages style hosting).

## Commands

There is no build, lint, or test tooling in this repo. To preview changes, serve the directory and open it in a browser, e.g.:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`. Opening `index.html` directly via `file://` also works since there are no server-side dependencies, but absolute-path assets (`/stylesheet.css` in `public/about.html` and `public/contact.html`) only resolve correctly when served from the repo root.

## Architecture

- **Pages**: `index.html` (homepage) plus `public/about.html` and `public/contact.html`. All three share the single global stylesheet (`stylesheet.css`) and script (`main.js`) — there is no per-page CSS/JS.
- **Path convention**: `index.html` links to sub-pages as `./public/about.html`; the sub-pages link back and to each other with root-relative paths (`/index.html`, `/stylesheet.css`) and sibling-relative paths (`about.html`, `contact.html`). This asymmetry is intentional given the folder layout but means the site must be served from its root, not a subpath.
- **Nav overlay**: `main.js`'s `openNav()`/`closeNav()` toggle the full-screen `#myNav` overlay (mobile only, shown via the `.icon` hamburger below the 950px breakpoint in `stylesheet.css`).
- **Homepage project accordion**: the three `.categories` divs (`data-target="frontend|fullstack|backend"`) toggle matching `<ul id="frontend|fullstack|backend">` project lists via custom `slideDown`/`slideUp` height-animation helpers in `main.js` (not CSS-only, since `height: auto` isn't transitionable). Project entries are hand-written `<li><a>` links — adding/removing a project means editing the matching `<ul>` directly in `index.html`.
- **Title letter animation**: `main.js` attaches click/animationend handlers to each `<span class="holo-title">` letter in the H1 and staggers an initial `.active` class add via `setTimeout`; the actual per-letter animations (`balance`, `shrinkjump`, `falling`) are defined as CSS keyframes in `stylesheet.css` keyed to `nth-child`.
- **Age calculation**: `main.js` computes and injects the displayed age into `#my-age` only when `document.title === 'About Abi'`, so this logic is coupled to `public/about.html`'s exact `<title>`.
- **Styling**: single `stylesheet.css` (~700 lines) using CSS custom properties (`--color-*`) for the pastel/holographic palette, plus three responsive breakpoints (1300px, 950px, 720px, and a compound 400–1050px/height query). No CSS reset framework — resets are hand-rolled at the top (`* { margin: 0; padding: 0; box-sizing: border-box; }`).
- **Fonts/icons**: Google Fonts (Forum, Montserrat Alternates) and Font Awesome 4.7 are loaded from CDNs in every page's `<head>` — kept in sync manually across the three HTML files since there's no shared partial/include mechanism.

## Known issues / suggested improvements

Ordered roughly by impact. None of this is committed to yet — flag before doing large-scale cleanup since some of it may be intentional or in-progress.

**Content & credibility**
- Project links (`index.html`, `frontend`/`fullstack`/`backend` lists) are plain text with no screenshot, description, or tech stack — worth upgrading to cards.
- No resume/CV download link on `public/contact.html` or elsewhere.
- No visual distinction between real client work (e.g. Salon na Jahode) and course/practice projects (e.g. Literalura, Forohub look like Alura challenges).

**Repo hygiene**
- ~~`assets/images/ranking-project-main/` contained an entire separate full-stack project nested inside the images folder~~ — removed.
- `3.4 Birthday Invite Project/` sits at the repo root with a space in its folder name; it is linked from the homepage frontend list (`./3.4 Birthday Invite Project/index.html`) so it's load-bearing, but the location/naming is inconsistent with everything else living under `public/`/`assets/`.
- `README.md` is a single line (`# newPortfolio`) — placeholder, not documenting the project.

**SEO / metadata**
- ~~No `<meta name="description">` or Open Graph/Twitter card tags~~ — added to all three pages (`index.html`, `public/about.html`, `public/contact.html`), pointing at the live site `https://abismportfolio.netlify.app/`. Note: `og:image`/`twitter:image` currently reuse the 512x512 app icon as a placeholder — a real 1200x630 social preview image would render better in link previews.
- ~~Homepage `<title>` was generic~~ — changed to "Abigail Santana Medina | Web Developer Portfolio". `public/about.html`'s `<title>` was deliberately left as "About Abi" since `main.js` keys its age-calculation logic off that exact string.

**Accessibility**
- Nav hamburger and category toggles use `<a href="javascript:void(0);" onclick=...>` instead of real `<button>` elements; `main.js` already patches in `aria-expanded`/`aria-hidden` at runtime, but the underlying elements should be semantic buttons.
- Pastel palette (light pink/lavender text on light backgrounds, e.g. `--color-tertiary-light` on `--color-primary`) should be checked against WCAG AA contrast.

**Code cleanup**
- `main.js` has a dead commented-out accessibility-init block (originally lines 41-48) that duplicates logic already applied elsewhere in the file — safe to delete.
- `stylesheet.css` declares `.title` twice (once near the top-level rules, once again near the responsive/perspective rules) — should be consolidated into one block.

**Performance**
- Font Awesome 4.7 is pulled from a CDN across all three pages for a handful of icons (heart-o, star-o, moon-o, bars, times) — inlining these as SVGs would drop a render-blocking external request.
