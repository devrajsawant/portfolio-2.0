# Devraj’s portfolio

A static website using HTML, CSS, JavaScript, and JSON. No npm install or build is needed.

## Run locally

From this folder:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000 in your browser. Stop the server with Ctrl+C.
If port 8000 is busy, use 8001 instead and open http://localhost:8001.

Use the local server instead of double-clicking index.html: the page fetches its content from data.json, which browsers may block on file:// URLs.

## Edit

- `data.json`: biography, experience, project descriptions, skills, and contact details.
- `index.html`: page structure and section introductions.
- `styles.css`: layout, colors, typography, and mobile styles.
- `app.js`: renders the JSON content into the page.

Refresh the browser after saving changes. Google Fonts requires an internet connection; system fonts are used as a fallback.

Project diagrams are labeled workflow illustrations, not screenshots. Replace them with actual product screenshots when available. Add project or repository links only when you have a public URL you want to share.
