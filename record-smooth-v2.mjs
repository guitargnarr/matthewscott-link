import { chromium } from 'playwright';
import fs from 'fs';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';

async function recordDemo(name, url, actions) {
  const browser = await chromium.launch({ 
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 720 }
    },
    // Slow down for smoother recording
    timezoneId: 'America/New_York',
  });

  const page = await context.newPage();
  
  // Slow down all actions for smoother video
  page.setDefaultTimeout(60000);
  
  console.log(`\nRecording ${name}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    await actions(page);

  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  await page.waitForTimeout(1000);
  const video = page.video();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    const newPath = `${outputDir}/${name}-demo.webm`;
    fs.renameSync(videoPath, newPath);
    console.log(`  Saved: ${newPath}`);
  }
}

// Smooth mouse move helper
async function smoothMove(page, x, y, steps = 20) {
  const start = await page.evaluate(() => ({ x: window.mouseX || 640, y: window.mouseY || 360 }));
  for (let i = 1; i <= steps; i++) {
    const newX = start.x + (x - start.x) * (i / steps);
    const newY = start.y + (y - start.y) * (i / steps);
    await page.mouse.move(newX, newY);
    await page.waitForTimeout(30);
  }
}

// FretVision
await recordDemo('fretvision', 'https://guitar.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth mouse to Riff Gen
  await page.mouse.move(400, 50);
  await page.waitForTimeout(300);
  
  const riffGen = page.locator('text=Riff Gen');
  if (await riffGen.count() > 0) {
    await riffGen.hover();
    await page.waitForTimeout(400);
    await riffGen.click();
    await page.waitForTimeout(2000);
  }
  
  // Click around the interface
  await page.mouse.move(500, 350);
  await page.waitForTimeout(400);
  await page.mouse.move(600, 400);
  await page.waitForTimeout(400);
  
  // Go to Fretboard
  const fretboard = page.locator('text=Fretboard');
  if (await fretboard.count() > 0) {
    await fretboard.hover();
    await page.waitForTimeout(400);
    await fretboard.click();
    await page.waitForTimeout(2000);
  }
  
  // Move mouse across fretboard
  for (let x = 300; x < 900; x += 100) {
    await page.mouse.move(x, 400);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(500);
});

// Portfolio
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll with easing
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
    await page.waitForTimeout(600);
  }
  
  // Hover over elements
  await page.mouse.move(640, 400);
  await page.waitForTimeout(500);
  
  // Scroll back up smoothly
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
});

// PhishGuard
await recordDemo('phishguard', 'https://phishguard.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Find and click input
  const input = page.locator('textarea, input[type="text"]').first();
  if (await input.count() > 0) {
    await input.hover();
    await page.waitForTimeout(400);
    await input.click();
    await page.waitForTimeout(600);
    
    // Type slowly
    await page.keyboard.type('URGENT: Your account will be suspended! Click here to verify your identity immediately.', { delay: 40 });
    await page.waitForTimeout(1000);
    
    // Find and click analyze button
    const btn = page.locator('button').first();
    if (await btn.count() > 0) {
      await btn.hover();
      await page.waitForTimeout(400);
      await btn.click();
      await page.waitForTimeout(2500);
    }
  }
  
  // Scroll to see results
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
});

// Vantage
await recordDemo('vantage', 'https://jobs.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  
  // Move mouse around
  await page.mouse.move(400, 300);
  await page.waitForTimeout(400);
  await page.mouse.move(600, 350);
  await page.waitForTimeout(400);
  await page.mouse.move(800, 300);
  await page.waitForTimeout(400);
  
  // Click if there's something clickable
  const clickable = page.locator('button, a, [role="button"]').first();
  if (await clickable.count() > 0) {
    await clickable.hover();
    await page.waitForTimeout(500);
    await clickable.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

// OurJourney
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Scroll smoothly
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  
  // Look for nav or buttons
  const nav = page.locator('nav a, button').first();
  if (await nav.count() > 0) {
    await nav.hover();
    await page.waitForTimeout(500);
    await nav.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
});

// JobTrack
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
  
  // Move mouse around table area
  await page.mouse.move(400, 350);
  await page.waitForTimeout(300);
  await page.mouse.move(600, 380);
  await page.waitForTimeout(300);
  await page.mouse.move(800, 350);
  await page.waitForTimeout(500);
  
  // Try to click a row
  const row = page.locator('tr, .card').first();
  if (await row.count() > 0) {
    await row.hover();
    await page.waitForTimeout(500);
    await row.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

console.log('\nAll demos recorded with smoother animations!');
