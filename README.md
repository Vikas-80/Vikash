# Vikash Saran — Portfolio

Personal site and permanent professional home for **Vikash Saran** — creative
operations, workflow automation, digital projects, and a deliberate move toward
independent artist management.

**Live:** <https://vikas-80.github.io/Vikash/>

A single static page. No backend, no build step, no frameworks, no images, no CV
file, no social links. HTML + hand-written CSS + vanilla JavaScript only.

---

## 1. Positioning

Consistent throughout the page:

| Presented as | Not presented as |
| --- | --- |
| An operations-minded creative professional moving into artist operations | An established music-industry professional |
| Someone who runs operations, builds digital products and automates workflows | A producer, engineer, booking agent or label executive |
| Someone with transferable, provable skills | Someone with music-industry credits |
| A reliable, organised person to learn beside an artist | A finished artist manager |

Every role, project, name and skill on the page is real. No invented credits,
statistics, testimonials or client names.

---

## 2. Structure

```
Vikash/
│
├── index.html      # ALL content — the only file you edit for copy
├── style.css       # Design system + all styling
├── script.js       # Nav, scroll progress, scrollspy, reveal, copy-email
├── README.md       # This file
├── robots.txt      # SEO
├── sitemap.xml     # SEO
├── .nojekyll       # Publishes files on GitHub Pages as-is
│
└── favicon/
    └── favicon.svg # Minimal "VS" monogram
```

No image folder by design: the layout is typographic, which keeps the page fast,
sharp on every screen, and honest.

---

## 3. Sections

| # | Section | Anchor |
| --- | --- | --- |
| 01 | Creative & Operations (hero) | `#top` |
| 02 | About | `#about` |
| 03 | Experience | `#experience` |
| 04 | Selected work | `#work` |
| 05 | Direction | `#why-management` |
| 06 | Strengths | `#strengths` |
| 07 | Contact | `#contact` |

Sticky navigation: About · Experience · Work · Why Management · Contact, with a
hamburger menu and slide-in panel below 1080px.

---

## 4. How to customise

Open **`index.html`** in any text editor.

- **Timeline entry** — duplicate one `<li class="timeline-item">`. Structure:
  `dates → role → organisation → description → bullet points`.
- **Work card** — duplicate one `<li class="work-card">`.
- **Strength** — duplicate one `<li class="strength">`.
- **Toolbelt** — add or remove `<li>` items inside `.toolbelt-list`.
- **Section numbers** — live in the `.num` span inside each `.section-eyebrow`,
  so sections can be reordered or removed without touching the CSS.
- **Colours and fonts** — every value is a custom property at the top of
  `style.css`:

| Token | Value |
| --- | --- |
| `--bg` | `#0B0B0B` |
| `--bg-2` | `#121212` |
| `--ink` | `#F4F1EA` |
| `--ink-2` | `#A7A7A7` |
| `--ink-3` | `#83817C` |
| `--line` | `#222222` |
| `--accent` | `#C8A96B` |
| `--serif` | Playfair Display |
| `--sans` | Inter |

---

## 5. Run it locally

```bash
python -m http.server 8000
# or
npx serve .
```

Then open <http://localhost:8000>.

---

## 6. Deploy

```bash
git add .
git commit -m "Update portfolio"
git push
```

Repository: <https://github.com/Vikas-80/Vikash>

Published via **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.

Every path is relative (`style.css`, `favicon/favicon.svg`, `script.js`), so the
site works identically at a root domain and under `https://vikas-80.github.io/Vikash/`.
`.nojekyll` keeps files byte-for-byte.

If the repository is ever renamed or moved, update the absolute URLs in
`index.html` (`<link rel="canonical">`, `og:url`), `robots.txt` and `sitemap.xml`.

---

## 7. Technical notes

**Performance** — no frameworks, libraries, trackers, cookies or API calls. One
preconnected Google Fonts stylesheet with `display=swap`. `IntersectionObserver`
reveals so nothing animates below the fold. Scroll handling is
`requestAnimationFrame`-throttled and passive. Zero images to download.

**Accessibility** — semantic landmarks, one `h1`, ordered heading levels,
skip-to-content link, visible accent focus ring on every control. Mobile menu has
`aria-expanded`, `aria-controls`, Escape to close, a focus trap and scroll lock.
All text meets WCAG AA contrast. Touch targets ≥ 48px.
`prefers-reduced-motion` disables reveals and the scroll cue.

**Responsive** — verified with no horizontal overflow and the hero contained in the
first viewport at 320, 375, 390, 430, 768, 844, 1024, 1100, 1280, 1366, 1440 and
1920px, including short and landscape viewports.

**Privacy** — nothing is collected. The email address is published deliberately as
the contact route; everything else stays private.

---

*Static by design. Honest by default.*
