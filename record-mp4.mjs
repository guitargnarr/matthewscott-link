import { chromium } from 'playwright';
import fs from 'fs';
import { execSync } from 'child_process';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';
const tempDir = '/tmp/demo-recordings';

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

async function recordDemo(name, url, actions) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: tempDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  console.log(`\nRecording ${name}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);
    await actions(page);
    await page.waitForTimeout(500);
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const outputPath = `${outputDir}/${name}-demo.mp4`;
    
    // Convert to MP4 H.264 at 60fps - best browser compatibility
    console.log(`  Converting to MP4 60fps...`);
    execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset slow -crf 18 -r 60 -vf "fps=60" -pix_fmt yuv420p -an "${outputPath}" 2>/dev/null`);
    fs.unlinkSync(videoPath);
    console.log(`  Saved: ${outputPath}`);
  }
}

// FretVision
await recordDemo('fretvision', 'https://guitar.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  await page.click('nav >> text=Riff Gen');
  await page.waitForTimeout(2000);
  
  for (let i = 0; i < 8; i++) {
    await page.mouse.move(350 + i * 80, 380 + Math.sin(i) * 30);
    await page.waitForTimeout(60);
  }
  
  await page.click('nav >> text=Fretboard');
  await page.waitForTimeout(2000);
  
  for (let x = 200; x < 1050; x += 35) {
    await page.mouse.move(x, 420);
    await page.waitForTimeout(30);
  }
});

// Portfolio
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'smooth' }));
    await page.waitForTimeout(450);
  }
  
  await page.mouse.move(640, 400);
  await page.waitForTimeout(300);
  
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
});

// PhishGuard
await recordDemo('phishguard', 'https://phishguard.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  const input = page.locator('textarea, input[type="text"]').first();
  if (await input.count() > 0) {
    await input.click();
    await page.waitForTimeout(300);
    await page.keyboard.type('URGENT: Your account has been compromised! Verify now!', { delay: 20 });
    await page.waitForTimeout(600);
    
    const btn = page.locator('button').first();
    if (await btn.count() > 0) {
      await btn.click();
      await page.waitForTimeout(2000);
    }
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

// Vantage
await recordDemo('vantage', 'https://jobs.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(500);
  
  for (let i = 0; i <= 10; i++) {
    await page.mouse.move(300 + i * 60, 350 + Math.sin(i * 0.5) * 50);
    await page.waitForTimeout(50);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(500);
});

// OurJourney
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(500);
  
  const btn = page.locator('button, a').first();
  if (await btn.count() > 0) {
    await btn.hover();
    await page.waitForTimeout(200);
    await btn.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(500);
});

// JobTrack
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(500);
  
  for (let i = 0; i <= 8; i++) {
    await page.mouse.move(350 + i * 70, 380);
    await page.waitForTimeout(60);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(500);
});

console.log('\nAll MP4 demos recorded!');
