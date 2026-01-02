import { chromium } from 'playwright';

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
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);

    // Execute custom actions
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
    const fs = await import('fs');
    const newPath = `${outputDir}/${name}-demo.webm`;
    fs.renameSync(videoPath, newPath);
    console.log(`  Saved: ${newPath}`);
  }
}

// Portfolio - projectlavos.com
await recordDemo('portfolio', 'https://projectlavos.com', async (page) => {
  await page.waitForTimeout(2000);
  // Scroll down to show projects
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(1500);
});

// PhishGuard
await recordDemo('phishguard', 'https://phishguard.projectlavos.com', async (page) => {
  await page.waitForTimeout(2000);
  // Look for any interactive elements
  const input = page.locator('input, textarea').first();
  if (await input.count() > 0) {
    await input.click();
    await page.keyboard.type('Check this suspicious email...', { delay: 50 });
    await page.waitForTimeout(1500);
  }
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
});

// Vantage (jobs)
await recordDemo('vantage', 'https://jobs.projectlavos.com', async (page) => {
  await page.waitForTimeout(2000);
  // Scroll and interact
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
  // Click on any buttons or filters
  const btn = page.locator('button').first();
  if (await btn.count() > 0) {
    await btn.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
});

// OurJourney
await recordDemo('ourjourney', 'https://ourjourney.projectlavos.com', async (page) => {
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
});

// JobTrack
await recordDemo('jobtrack', 'https://jobtrack.projectlavos.com', async (page) => {
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1500);
  // Look for any interactive table or list
  const row = page.locator('tr, .job-item, .card').first();
  if (await row.count() > 0) {
    await row.click().catch(() => {});
    await page.waitForTimeout(1500);
  }
});

console.log('\nAll demos recorded!');
