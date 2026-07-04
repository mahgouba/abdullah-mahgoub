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

        // Load the resume page via the server itself
        const resumeUrl = `http://127.0.0.1:${PORT}/resume.html`;
        await page.goto(resumeUrl, { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for fonts to fully render (IBM Plex Sans Arabic)
        await page.evaluateHandle('document.fonts.ready');
        // Extra settle time for Arabic font shaping
        await new Promise(r => setTimeout(r, 800));

        // Strip all outer spacing so content fills the A4 page edge-to-edge
        await page.addStyleTag({ content: `
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
            }
            main {
                margin: 0 !important;
                max-width: 100% !important;
                width: 100% !important;
                box-shadow: none !important;
                border-radius: 0 !important;
            }
            #print-btn-wrapper { display: none !important; }
        ` });

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
