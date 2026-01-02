import { chromium } from 'playwright';
import fs from 'fs';
import { execSync } from 'child_process';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';
const tempDir = '/tmp/demo-recordings';

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

async function recordDemo(name, url, actions) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 800, height: 450 },
    recordVideo: {
      dir: tempDir,
      size: { width: 800, height: 450 }
    }
  });

  const page = await context.newPage();
  console.log(`\nRecording ${name}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);
    await actions(page);
    await page.waitForTimeout(300);
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const outputPath = `${outputDir}/${name}-demo.gif`;
    
    // Convert to high-quality GIF with good palette
    console.log(`  Converting to GIF...`);
    execSync(`ffmpeg -y -i "${videoPath}" -vf "fps=24,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" -loop 0 "${outputPath}" 2>/dev/null`);
    fs.unlinkSync(videoPath);
    console.log(`  Saved: ${outputPath}`);
  }
}

// FretVision
await recordDemo('fretvision', 'https://guitar.projectlavos.com', async (page) => {
  await page.waitForTimeout(800);
  
  await page.click('nav >> text=Riff Gen');
  await page.waitForTimeout(1500);
  
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(300 + i * 60, 280);
    await page.waitForTimeout(50);
  }
  
  await page.click('nav >> text=Fretboard');
  await page.waitForTimeout(1500);
  
  for (let x = 150; x < 700; x += 40) {
    await page.mouse.move(x, 300);
    await page.waitForTimeout(30);
  }
});

// Portfolio
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(800);
  
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy({ top: 180, behavior: 'smooth' }));
    await page.waitForTimeout(400);
  }
  
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

// PhishGuard
await recordDemo('phishguard', 'https://phishguard.projectlavos.com', async (page) => {
  await page.waitForTimeout(800);
  
  const input = page.locator('textarea, input[type="text"]').first();
  if (await input.count() > 0) {
    await input.click();
    await page.waitForTimeout(200);
    await page.keyboard.type('URGENT: Verify your account now!', { delay: 15 });
    await page.waitForTimeout(500);
    
    const btn = page.locator('button').first();
    if (await btn.count() > 0) {
      await btn.click();
      await page.waitForTimeout(1500);
    }
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(500);
});

// Vantage
await recordDemo('vantage', 'https://jobs.projectlavos.com', async (page) => {
  await page.waitForTimeout(800);
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
  
  for (let i = 0; i <= 6; i++) {
    await page.mouse.move(200 + i * 50, 260);
    await page.waitForTimeout(40);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

// OurJourney
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(800);
  
  await page.evaluate(() => window.scrollBy({ top: 120, behavior: 'smooth' }));
  await page.waitForTimeout(400);
  
  const btn = page.locator('button, a').first();
  if (await btn.count() > 0) {
    await btn.hover();
    await page.waitForTimeout(150);
    await btn.click().catch(() => {});
    await page.waitForTimeout(800);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

// JobTrack
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(800);
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(400);
  
  for (let i = 0; i <= 5; i++) {
    await page.mouse.move(250 + i * 50, 280);
    await page.waitForTimeout(50);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 120, behavior: 'smooth' }));
  await page.waitForTimeout(400);
});

console.log('\nAll GIF demos recorded!');
