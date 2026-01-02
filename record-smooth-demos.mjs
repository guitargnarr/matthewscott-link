import { chromium } from 'playwright';
import fs from 'fs';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';

async function recordDemo(name, url, actions) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  console.log(`\nRecording ${name}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1000);

    // Execute custom actions with smooth interactions
    await actions(page);

  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  const video = page.video();
  await context.close();
  await browser.close();

  // Get the video path and rename it
  if (video) {
    const videoPath = await video.path();
    const newPath = `${outputDir}/${name}-demo.webm`;
    fs.renameSync(videoPath, newPath);
    console.log(`  Saved: ${newPath}`);
  }
}

// FretVision - smooth guitar app demo
await recordDemo('fretvision', 'https://guitar.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Click Riff Gen nav
  await page.click('text=Riff Gen');
  await page.waitForTimeout(1500);
  
  // Click on some UI elements
  const buttons = page.locator('button');
  if (await buttons.count() > 0) {
    await buttons.first().click();
    await page.waitForTimeout(1000);
  }
  
  // Click Fretboard
  await page.click('text=Fretboard');
  await page.waitForTimeout(1500);
  
  // Hover and click on fretboard area
  await page.mouse.move(640, 400);
  await page.waitForTimeout(500);
  await page.mouse.click(640, 400);
  await page.waitForTimeout(1000);
});

// Portfolio - smooth scroll and explore
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll down
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await page.waitForTimeout(800);
  }
  
  // Click on a project card if visible
  const cards = page.locator('a[href*="projectlavos"], .card, [class*="card"]');
  if (await cards.count() > 0) {
    await cards.first().hover();
    await page.waitForTimeout(500);
  }
  
  // Scroll back up
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
});

// PhishGuard - type in input and interact
await recordDemo('phishguard', 'https://phishguard.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Find input/textarea and type
  const input = page.locator('input, textarea').first();
  if (await input.count() > 0) {
    await input.click();
    await page.waitForTimeout(500);
    await page.keyboard.type('Dear user, your account has been compromised. Click here immediately to verify...', { delay: 30 });
    await page.waitForTimeout(1000);
    
    // Look for submit/analyze button
    const submitBtn = page.locator('button:has-text("Analyze"), button:has-text("Check"), button:has-text("Submit"), button[type="submit"]').first();
    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      await page.waitForTimeout(2000);
    }
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
});

// Vantage (jobs) - explore job listings
await recordDemo('vantage', 'https://jobs.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  
  // Click on filters or tabs if available
  const tabs = page.locator('[role="tab"], .tab, button').first();
  if (await tabs.count() > 0) {
    await tabs.hover();
    await page.waitForTimeout(300);
    await tabs.click();
    await page.waitForTimeout(1200);
  }
  
  // Click on a job card if visible
  const jobCard = page.locator('.card, tr, [class*="job"], [class*="listing"]').first();
  if (await jobCard.count() > 0) {
    await jobCard.hover();
    await page.waitForTimeout(500);
    await jobCard.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

// OurJourney - navigate the app
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  
  // Click nav items or buttons
  const navItems = page.locator('nav a, nav button, .nav-link').first();
  if (await navItems.count() > 0) {
    await navItems.click();
    await page.waitForTimeout(1200);
  }
  
  // Interact with any visible form or button
  const btn = page.locator('button').first();
  if (await btn.count() > 0) {
    await btn.hover();
    await page.waitForTimeout(400);
    await btn.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

// JobTrack - interact with tracker
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(1500);
  
  // Smooth scroll
  await page.evaluate(() => window.scrollBy({ top: 200, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  
  // Click on table rows or cards
  const row = page.locator('tr, .card, [class*="item"]').first();
  if (await row.count() > 0) {
    await row.hover();
    await page.waitForTimeout(500);
    await row.click().catch(() => {});
    await page.waitForTimeout(1200);
  }
  
  // Click any action buttons
  const actionBtn = page.locator('button:has-text("Add"), button:has-text("New"), button').first();
  if (await actionBtn.count() > 0) {
    await actionBtn.hover();
    await page.waitForTimeout(400);
    await actionBtn.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
  
  await page.evaluate(() => window.scrollBy({ top: 150, behavior: 'smooth' }));
  await page.waitForTimeout(800);
});

console.log('\nAll smooth demos recorded!');
