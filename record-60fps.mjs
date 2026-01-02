import { chromium } from 'playwright';
import fs from 'fs';
import { execSync } from 'child_process';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';
const tempDir = '/tmp/demo-recordings';

// Create temp dir
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
    const outputPath = `${outputDir}/${name}-demo.webm`;
    
    // Re-encode to 60fps with high quality
    console.log(`  Converting to 60fps...`);
    execSync(`ffmpeg -y -i "${videoPath}" -c:v libvpx-vp9 -b:v 4M -r 60 -vf "fps=60,minterpolate=fps=60:mi_mode=blend" -an "${outputPath}" 2>/dev/null`);
    fs.unlinkSync(videoPath);
    console.log(`  Saved: ${outputPath}`);
  }
}

// FretVision
await recordDemo('fretvision', 'https://guitar.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  const riffGen = page.locator('a[href*="riff"]').first();
  await riffGen.hover();
  await page.waitForTimeout(300);
  await riffGen.click();
  await page.waitForTimeout(2000);
  
  // Smooth mouse movements
  for (let i = 0; i < 5; i++) {
    await page.mouse.move(400 + i * 100, 350 + Math.sin(i) * 50);
    await page.waitForTimeout(100);
  }
  
  const fretboard = page.locator('a[href*="fretboard"]').first();
  await fretboard.hover();
  await page.waitForTimeout(300);
  await fretboard.click();
  await page.waitForTimeout(2000);
  
  // Glide across fretboard
  for (let x = 200; x < 1000; x += 50) {
    await page.mouse.move(x, 400);
    await page.waitForTimeout(50);
  }
});

// Portfolio
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'smooth' }));
    await page.waitForTimeout(500);
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
    await input.hover();
    await page.waitForTimeout(200);
    await input.click();
    await page.waitForTimeout(400);
    await page.keyboard.type('URGENT: Your account has been compromised! Verify now!', { delay: 25 });
    await page.waitForTimeout(800);
    
    const btn = page.locator('button').first();
    if (await btn.count() > 0) {
      await btn.hover();
      await page.waitForTimeout(200);
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
  await page.waitForTimeout(600);
  
  // Smooth mouse arc
  for (let i = 0; i <= 10; i++) {
    const x = 300 + i * 60;
    const y = 350 + Math.sin(i * 0.5) * 50;
    await page.mouse.move(x, y);
    await page.waitForTimeout(60);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(600);
});

// OurJourney
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(600);
  
  const btn = page.locator('button, a').first();
  if (await btn.count() > 0) {
    await btn.hover();
    await page.waitForTimeout(300);
    await btn.click().catch(() => {});
    await page.waitForTimeout(1200);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(600);
});

// JobTrack
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(600);
  
  // Smooth mouse movement
  for (let i = 0; i <= 8; i++) {
    await page.mouse.move(350 + i * 70, 380);
    await page.waitForTimeout(80);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(600);
});

console.log('\nAll 60fps demos recorded!');
