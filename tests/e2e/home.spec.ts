import { expect, test } from '@playwright/test';

const tileOrder = [
  'intro',
  'tien-dat-audio',
  'toeic-master',
  'xtruyen',
  'mynotch',
  'stack',
  'infra',
  'about',
  'process',
  'contact',
];

test('shows the ten tiles in reading order with the intro visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-tile]')).toHaveCount(tileOrder.length);
  const order = await page.locator('[data-tile]').evaluateAll((tiles) => tiles.map((tile) => tile.getAttribute('data-tile')));
  expect(order).toEqual(tileOrder);
  await expect(page.getByRole('heading', { level: 1, name: 'Dat Truong' })).toBeVisible();
});

for (const width of [1440, 768, 375]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.mouse.wheel(0, 2400);
  await page.waitForTimeout(800);
  expect(errors).toEqual([]);
});

test('every tile becomes visible after scrolling through the page', async ({ page }) => {
  await page.goto('/');
  for (const tile of tileOrder) {
    const locator = page.locator(`[data-tile="${tile}"]`);
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible();
    await expect.poll(() => locator.evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.95);
  }
});

test('tiles are reachable with the keyboard and show a focus ring', async ({ page, browserName }) => {
  // Safari only tabs through links when "Press Tab to highlight each item" is on, which is off by default.
  test.skip(browserName === 'webkit', 'Safari does not tab to links by default');
  await page.goto('/');
  let found = false;
  for (let i = 0; i < 20 && !found; i += 1) {
    await page.keyboard.press('Tab');
    found = await page.evaluate(() => document.activeElement?.getAttribute('data-tile') === 'tien-dat-audio');
  }
  expect(found).toBe(true);
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle);
  expect(outline).not.toBe('none');
});
