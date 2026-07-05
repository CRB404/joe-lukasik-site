# Joseph Lukasik — Portfolio (3 design directions)

A rebuild of [joelukasik.com](https://www.joelukasik.com/) for Joseph "Joe" Lukasik —
composer, multi-instrumentalist, and media artist based in Boulder, Colorado.

This is an **internal review build** presenting **three distinct design directions**
for the same content. A floating switcher at the top (with keyboard shortcuts **1 / 2 / 3**)
lets you flip between them.

| # | Direction | Thesis |
|---|-----------|--------|
| 01 | **Editorial** (`v1.html`) | Swiss-brutalist / kinetic. Space Grotesk + Space Mono, black-on-cream with an electric-blue accent, oversized type, hard grid, marquee, decode animation. |
| 02 | **Cinematic** (`v2.html`) — *default* | Dark-immersive. Fraunces display serif + Manrope, near-black `#0a0a0b` with warm gold, ambient glow, scroll reveals, spotlight cursor. |
| 03 | **Atelier** (`v3.html`) | Quiet-luxury. Instrument Serif + Inter, warm off-white `#f0eee9` (Pantone Cloud Dancer), stone neutrals, gallery whitespace, centered editorial layout. |

`index.html` redirects to the default direction (Cinematic).

## Content
All copy lives in one place — [`assets/content.js`](assets/content.js) — and is shared
by all three directions. Edit it once to update every version.

## Going live with one direction
When a direction is chosen, ship just that file (rename to `index.html`) and delete the
one `<script src="assets/review-nav.js">` tag — that script is the internal switcher only.

## Local preview
Any static server works, e.g. `npx serve` from this folder.
