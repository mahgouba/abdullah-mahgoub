# Abdullah Mahgoub — Resume Site

A bilingual (Arabic/English) static HTML resume for Abdullah Mahgoub (عبدالله محجوب عبدالرسول).

## Stack

- Pure HTML/CSS/JS — no build step, no framework
- Tailwind CSS via CDN
- html2pdf.js for PDF export
- Material Symbols icons via CDN

## Files

| File | Purpose |
|------|---------|
| `index.html` | Entry point — redirects to `resume.html` |
| `resume.html` | Main resume (RTL Arabic layout) |
| `admin.html` | Admin/editor interface |
| `DESIGN.md` | Design system spec (colors, typography, spacing) |
| `screen.png` | Reference screenshot |

## Running locally

The workflow `Start application` serves the site with Python's built-in HTTP server on port 5000:

```
python3 -m http.server 5000
```

## Notes

- The site is RTL (right-to-left) Arabic by default.
- The profile photo is loaded from an external Google-hosted URL; if it 404s, replace the `src` attribute in `resume.html` line ~159 with a local image.
- Tailwind CDN usage is fine for development/preview; for production, consider building Tailwind statically.

## User preferences

- Keep the existing static HTML structure — no migration to a framework.
