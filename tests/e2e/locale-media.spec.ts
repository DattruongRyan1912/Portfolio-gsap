import { expect, test } from '@playwright/test';

test.describe('language', () => {
  test('switching to Vietnamese persists across navigation and reload', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'VI' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    await expect(page.getByText('Sẵn sàng cho vị trí backend', { exact: false })).toBeVisible();

    await page.locator('[data-tile="toeic-master"]').click();
    await expect(page).toHaveURL(/\/projects\/toeic-master$/);
    await expect(page.getByRole('heading', { name: 'Bài toán' })).toBeVisible();

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    await expect(page.getByRole('heading', { name: 'Bài toán' })).toBeVisible();
  });

  test.describe('with a Vietnamese browser', () => {
    test.use({ locale: 'vi-VN' });
    test('serves Vietnamese on the first visit', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
      await expect(page.getByRole('link', { name: 'Dự án', exact: true })).toBeVisible();
    });
  });
});

test.describe('recordings', () => {
  test('tile videos are muted inline recordings with a poster that loads', async ({ page, request }) => {
    await page.goto('/');
    const videos = page.locator('[data-tile] video');
    await expect(videos).toHaveCount(4);
    for (const video of await videos.all()) {
      expect(await video.evaluate((element: HTMLVideoElement) => element.muted)).toBe(true);
      expect(await video.getAttribute('playsinline')).not.toBeNull();
      const poster = await video.getAttribute('poster');
      expect(poster).toBeTruthy();
      expect((await request.get(poster!)).status()).toBe(200);
      const src = await video.getAttribute('src');
      expect((await request.head(src!)).status()).toBe(200);
    }
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('nothing autoplays and the project page offers a play button', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).not.toHaveClass(/motion/);
      const tile = page.locator('[data-tile="tien-dat-audio"] video');
      await tile.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      expect(await tile.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);

      await page.goto('/projects/tien-dat-audio');
      await expect(page.getByRole('button', { name: 'Play recording' })).toBeVisible();
    });
  });
});
