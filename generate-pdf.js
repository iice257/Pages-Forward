const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'catalogue.html');
  console.log(`Loading: ${htmlPath}`);

  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for images to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  const pdfPath = path.resolve(__dirname, 'catalogue.pdf');
  console.log('Generating PDF...');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log(`PDF generated successfully: ${pdfPath}`);
})();
