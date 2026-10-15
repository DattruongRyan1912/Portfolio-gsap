import { expect, test, type Page } from '@playwright/test';

/** Scrolls so the given tile sits in the viewport, then returns the resulting scroll position. */
async function scrollToTile(page: Page, slug: string) {
  const tile = page.locator(`[data-tile="${slug}"]`);
  await tile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  return page.evaluate(() => window.scrollY);
}

test('opening a project does not scroll the home page before navigating, and Back restores the position', async ({
  page,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await scrollToTile(page, 'mynotch');

  // Record the scroll position at the moment of the click (after Playwright's own scroll-into-view), and the
  // lowest position seen afterwards while still on the home page. sessionStorage survives the navigation.
  await page.evaluate(() => {
    document.addEventListener(
      'click',
      () => {
        sessionStorage.setItem('clickY', String(window.scrollY));
        sessionStorage.setItem('minYAfterClick', String(window.scrollY));
        window.addEventListener('scroll', () => {
          if (location.pathname !== '/') return;
          const min = Math.min(Number(sessionStorage.getItem('minYAfterClick')), window.scrollY);
          sessionStorage.setItem('minYAfterClick', String(min));
        });
      },
      { capture: true, once: true },
    );
  });

  await page.locator('[data-tile="mynotch"]').click();
  await expect(page).toHaveURL(/\/projects\/mynotch$/);
  await expect(page.getByRole('heading', { level: 1, name: 'MyNotch' })).toBeVisible();

  const clickY = Number(await page.evaluate(() => sessionStorage.getItem('clickY')));
  const minAfterClick = Number(await page.evaluate(() => sessionStorage.getItem('minYAfterClick')));
  expect(clickY).toBeGreaterThan(300);
  // The old bug: the page jumped towards the top as soon as a project was clicked.
  expect(minAfterClick).toBeGreaterThanOrEqual(clickY - 40);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('[data-tile="mynotch"]')).toBeVisible();
  await expect
    .poll(async () => Math.abs((await page.evaluate(() => window.scrollY)) - clickY), { timeout: 5000 })
    .toBeLessThanOrEqual(40);
});

test('the project pager wraps around all four projects', async ({ page }) => {
  await page.goto('/projects/tien-dat-audio');
  const pager = page.getByRole('navigation', { name: 'All projects' });
  await expect(pager.getByRole('link', { name: /Previous project: MyNotch/ })).toBeVisible();
  await pager.getByRole('link', { name: /Next project: TOEIC Master/ }).click();
  await expect(page).toHaveURL(/\/projects\/toeic-master$/);
  await expect(page.getByRole('heading', { level: 1, name: 'TOEIC Master' })).toBeVisible();
});

const linkExpectations = [
  { slug: 'tien-dat-audio', live: 'https://tiendataudioquangngai.id.vn/', repo: 'https://github.com/DattruongRyan1912/tien-dat-audio' },
  { slug: 'toeic-master', live: 'https://toeic.truongquocdat.id.vn/', repo: 'https://github.com/DattruongRyan1912/toeic-lab' },
  { slug: 'xtruyen', live: 'https://xtruyen.truongquocdat.id.vn/', repo: 'https://github.com/DattruongRyan1912/xtruyen' },
  { slug: 'mynotch', live: 'https://mynotch.truongquocdat.id.vn/', repo: null },
];

for (const { slug, live, repo } of linkExpectations) {
  test(`${slug} links to the right places`, async ({ page }) => {
    await page.goto(`/projects/${slug}`);
    const links = page.locator('.project-links');
    await expect(links.locator(`a[href="${live}"]`)).toBeVisible();
    if (repo) await expect(links.locator(`a[href="${repo}"]`)).toBeVisible();
    else await expect(links.getByText('Private repository')).toBeVisible();
  });
}

test('project pages carry their own title and an absolute Open Graph image', async ({ page }) => {
  await page.goto('/projects/xtruyen');
  await expect(page).toHaveTitle(/XTruyen/);
  const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(ogImage).toMatch(/^https:\/\/portfolio\.truongquocdat\.id\.vn\/media\/projects\/xtruyen\.jpg$/);
});

test('an unknown project returns 404', async ({ page }) => {
  const response = await page.goto('/projects/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('This page does not exist.')).toBeVisible();
});
