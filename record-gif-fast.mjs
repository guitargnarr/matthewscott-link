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
      size: { width: 640, height: 360 }
    }
  });

  const page = await context.newPage();
  console.log(`\nRecording ${name}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(800);
    await actions(page);
    await page.waitForTimeout(200);
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const outputPath = `${outputDir}/${name}-demo.gif`;
    
    // Convert to smooth 30fps GIF with optimized palette
    console.log(`  Converting to 30fps GIF...`);
    execSync(`ffmpeg -y -i "${videoPath}" -vf "fps=30,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=full[p];[s1][p]paletteuse=dither=sierra2_4a" -loop 0 "${outputPath}" 2>/dev/null`);
    fs.unlinkSync(videoPath);
    console.log(`  Saved: ${outputPath}`);
  }
}

// FretVision - faster actions
await recordDemo('fretvision', 'https://guitar.projectlavos.com', async (page) => {
  await page.waitForTimeout(600);
  await page.click('text=Riff Gen');
  await page.waitForTimeout(1200);
  
  await page.click('text=Fretboard');
  await page.waitForTimeout(1200);
  
  // Fast sweep across fretboard
  for (let x = 200; x < 1000; x += 30) {
    await page.mouse.move(x, 420);
    await page.waitForTimeout(15);
  }
});

// Portfolio - faster scroll
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(600);
  
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await page.waitForTimeout(350);
  }
  
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(600);
});

// PhishGuard - faster typing
await recordDemo('phishguard', 'https://phishguard.projectlavos.com', async (page) => {
  await page.waitForTimeout(600);
  
  const input = page.locator('textarea, input[type="text"]').first();
  if (await input.count() > 0) {
    await input.click();
    await page.waitForTimeout(150);
    await page.keyboard.type('URGENT: Verify now!', { delay: 10 });
    await page.waitForTimeout(400);
    
    const btn = page.locator('button').first();
    if (await btn.count() > 0) {
      await btn.click();
      await page.waitForTimeout(1200);
    }
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

// Vantage - faster
await recordDemo('vantage', 'https://jobs.projectlavos.com', async (page) => {
  await page.waitForTimeout(600);
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(400);
  
  for (let i = 0; i <= 8; i++) {
    await page.mouse.move(250 + i * 80, 350);
    await page.waitForTimeout(25);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

// OurJourney - faster
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(600);
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
  
  const btn = page.locator('button, a').first();
  if (await btn.count() > 0) {
    await btn.click().catch(() => {});
    await page.waitForTimeout(800);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

// JobTrack - faster
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(600);
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(400);
  
  for (let i = 0; i <= 6; i++) {
    await page.mouse.move(300 + i * 80, 380);
    await page.waitForTimeout(30);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

console.log('\nAll fast GIFs recorded!');
