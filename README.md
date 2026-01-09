# Charles Abi Chahine — Portfolio

Minimal, Swiss-inspired architecture portfolio built with HTML, CSS, and a small JS helper.

## Project structure

- index.html — Main entry
- CSS/ — All styles (`CSS/style.css`)
- js/ — Interaction scripts (`js/script.js`)
- images/ — Project images (add originals and optimized variants)
- data/ — Optional JSON or project meta

## Local development

No build step needed. Two quick ways to preview locally:

1) Using npx live-server (recommended for auto-reload):

```bash
npm run dev
```

2) Using a simple static server:

```bash
npm start
```

Both scripts use `npx` to run tools without installing global packages.

## Deploy

- GitHub Pages: automatic deploy via the included GitHub Action when you push to `main`.
- Netlify / Vercel: drag-and-drop or connect your repo — the site is static.

## Notes

- Replace placeholder images in `/images` with optimized JPG/WebP versions and add `srcset` where needed.
- Update `index.html` meta tags (title, description, open graph) before publishing.

---

If you want, I can add a `src/` → `dist/` build with image optimization and a small toolchain (optional).