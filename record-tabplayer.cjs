const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: '/Users/matthewscott/Projects/matthewscott-link/public/videos/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  console.log('Navigating to Tab Player...');
  await page.goto('https://guitar.projectlavos.com/tab-player', { waitUntil: 'networkidle' });

  // Wait for page to fully load
  await page.waitForTimeout(3000);

  // Take a screenshot to see what's there
  await page.screenshot({ path: '/tmp/tabplayer-loaded.png' });
  console.log('Screenshot saved');

  // Look for any play button or tab selector
  const buttons = await page.locator('button').all();
  console.log(`Found ${buttons.length} buttons`);

  // Try to find and click a play button
  const playButton = page.locator('button:has-text("Play"), button:has-text("play"), [aria-label*="play"], .play-button').first();
  if (await playButton.count() > 0) {
    console.log('Found play button, clicking...');
    await playButton.click();
    await page.waitForTimeout(3000); // Record 3 seconds of playback
  } else {
    console.log('No play button found, recording current state for 3 seconds...');
    await page.waitForTimeout(3000);
  }

  await context.close();
  await browser.close();

  console.log('Recording complete!');
})();
