import { chromium } from 'playwright';
import fs from 'fs';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: {
    dir: outputDir,
    size: { width: 1280, height: 720 }
  }
});

const page = await context.newPage();
console.log('Recording FretVision...');

await page.goto('https://guitar.projectlavos.com', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);

// Click Riff Gen link specifically
const riffGenLink = page.locator('a[href*="riff"]').first();
await riffGenLink.hover();
await page.waitForTimeout(500);
await riffGenLink.click();
await page.waitForTimeout(2500);

// Move mouse around the interface
await page.mouse.move(500, 350);
await page.waitForTimeout(400);
await page.mouse.move(700, 400);
await page.waitForTimeout(400);

// Click Fretboard
const fretboardLink = page.locator('a[href*="fretboard"], a:has-text("Fretboard")').first();
await fretboardLink.hover();
await page.waitForTimeout(500);
await fretboardLink.click();
await page.waitForTimeout(2500);

// Move across fretboard area smoothly
for (let x = 250; x < 1000; x += 80) {
  await page.mouse.move(x, 420);
  await page.waitForTimeout(120);
}

await page.waitForTimeout(1000);

const video = page.video();
await context.close();
await browser.close();

if (video) {
  const videoPath = await video.path();
  fs.renameSync(videoPath, `${outputDir}/fretvision-demo.webm`);
  console.log('Saved fretvision-demo.webm');
}
