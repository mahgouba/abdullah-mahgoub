# Abdullah Mahgoub — Resume Site

A bilingual (Arabic/English) static HTML resume for Abdullah Mahgoub (عبدالله محجوب عبدالرسول).

## Stack

- Node.js + Express — serves static files and the `/generate-pdf` endpoint
- Puppeteer + system Chromium — generates pixel-perfect Arabic PDF server-side
- Tailwind CSS via CDN
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

The workflow `Start application` runs the Express server on port 5000:

```
node server.js
```

## PDF generation

Clicking "تحميل السيرة الذاتية كملف PDF" sends a request to `/generate-pdf`. The server launches headless Chromium via Puppeteer, renders the full resume page (including Arabic fonts from Google Fonts), and returns a proper A4 PDF. This approach guarantees correct Arabic letter shaping and RTL layout — something html2canvas cannot reliably do.

## Notes

- The site is RTL (right-to-left) Arabic by default.
- The profile photo is loaded from an external Google-hosted URL; if it 404s, replace the `src` attribute in `resume.html` line ~159 with a local image.
- Tailwind CDN usage is fine for development/preview; for production, consider building Tailwind statically.
- Chromium is installed via Nix (`chromium` package). The server detects it automatically with `which chromium`.

## User preferences

- Keep the existing static HTML structure — no migration to a framework.
