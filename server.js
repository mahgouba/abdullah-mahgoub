const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const { execSync } = require('child_process');

// Resolve system Chromium (installed via Nix) at startup
let CHROMIUM_PATH;
try {
    CHROMIUM_PATH = execSync('which chromium').toString().trim();
} catch {
    CHROMIUM_PATH = undefined; // fall back to puppeteer's bundled chrome
}

const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static(__dirname));

// PDF generation endpoint
app.get('/generate-pdf', async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: CHROMIUM_PATH,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--font-render-hinting=none',
            ]
        });

        const page = await browser.newPage();

        // A4 at 96 dpi = 794 × 1123 px — set viewport to exactly this width
        // so the resume fills the page with no body background showing on sides
        await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

        // Load the resume page via the server itself
        const resumeUrl = `http://127.0.0.1:${PORT}/resume.html`;
        await page.goto(resumeUrl, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for fonts to fully render (IBM Plex Sans Arabic)
        await page.evaluateHandle('document.fonts.ready');
        // Extra settle time for Arabic font shaping
        await new Promise(r => setTimeout(r, 800));

        // Directly manipulate DOM to strip all outer spacing edge-to-edge
        await page.evaluate(() => {
            // Hide scrollbars so no reserved space appears on the right
            const noScroll = document.createElement('style');
            noScroll.textContent = `
                ::-webkit-scrollbar { display: none; }
                * { scrollbar-width: none; }
            `;
            document.head.appendChild(noScroll);

            // Body: no margin, no padding, white background
            document.documentElement.style.cssText +=
                ';margin:0;padding:0;overflow:hidden;background:#fff';
            document.body.style.cssText +=
                ';margin:0;padding:0;overflow:hidden;background:#fff;min-height:unset';

            // Main resume card: remove outer spacing and decoration
            const main = document.querySelector('main');
            if (main) {
                main.style.cssText +=
                    ';margin:0!important;max-width:794px!important;width:794px!important;' +
                    'box-shadow:none!important;border-radius:0!important;border:none!important;';
                // Also remove Tailwind spacing classes that add margin
                main.classList.remove('my-8', 'mx-auto');
            }

            // Hide the download button wrapper
            const btn = document.getElementById('print-btn-wrapper');
            if (btn) btn.style.display = 'none';
        });

        // Generate A4 PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
        });

        const filename = 'Abdullah_Mahgoub_Resume.pdf';
        const filenameAr = encodeURIComponent('عبدالله_محجوب_سيرة_ذاتية.pdf');
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${filenameAr}`,
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);

    } catch (err) {
        console.error('PDF generation error:', err);
        res.status(500).json({ error: err.message });
    } finally {
        if (browser) await browser.close();
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
