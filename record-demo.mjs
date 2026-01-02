import { chromium } from 'playwright';

const outputDir = '/Users/matthewscott/Projects/matthewscott-link/public/demos';

async function recordFretVision() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  console.log('Recording FretVision demo...');

  // Go to homepage
  await page.goto('https://guitar.projectlavos.com', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Click on Riff Gen
  console.log('Clicking Riff Gen...');
  await page.click('text=Riff Gen');
  await page.waitForTimeout(2000);

  // Interact with the fretboard - click some notes
  console.log('Clicking fretboard notes...');
  await page.click('text=A');
  await page.waitForTimeout(500);
  await page.click('text=D');
  await page.waitForTimeout(500);

  // Click play if available
  const playButton = page.locator('button:has-text("Play"), [aria-label*="play"]').first();
  if (await playButton.count() > 0) {
    console.log('Clicking play...');
    await playButton.click();
    await page.waitForTimeout(2000);
  }

  // Navigate to Fretboard
  console.log('Going to Fretboard...');
  await page.click('text=Fretboard');
  await page.waitForTimeout(2000);

  // Close to save video
  await context.close();
  await browser.close();

  console.log('Done! Video saved to:', outputDir);
}

recordFretVision().catch(console.error);
