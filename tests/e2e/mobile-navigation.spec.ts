import { expect, test, type Page } from '@playwright/test';

const slugs = ['tien-dat-audio', 'toeic-master', 'xtruyen', 'mynotch'];

/**
 * Arriving on the home page by a link (not by the browser's Back button) must leave it fully usable: the title is the
 * home title, what is on screen has faded in, and so does everything further down once scrolled to.
 */
async function expectHomeFullyRevealed(page: Page) {
  await expect(page).toHaveTitle(/Backend Developer/);
  await expect
    .poll(
      () =>
        page.locator('[data-reveal]').evaluateAll((elements) => {
          const onScreen = elements.filter((element) => {
            const box = element.getBoundingClientRect();
            return box.bottom > 0 && box.top < window.innerHeight;
          });
          return Math.min(1, ...onScreen.map((element) => Number(getComputedStyle(element).opacity)));
        }),
      { timeout: 8000 },
    )
    .toBeGreaterThan(0.95);

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 450) {
    await page.mouse.wheel(0, 450);
    await page.waitForTimeout(80);
  }
  await expect
    .poll(
      () =>
        page.locator('[data-reveal]').evaluateAll((elements) =>
          Math.min(...elements.map((element) => Number(getComputedStyle(element).opacity))),
        ),
      { timeout: 8000 },
    )
    .toBeGreaterThan(0.95);
}

// Compares against the configured width on purpose: with `isMobile`, the browser stretches `innerWidth` to fit
// overflowing content, which would hide the very bug this guards against.
for (const width of [320, 375, 412]) {
  for (const slug of slugs) {
    test(`project page ${slug} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`/projects/${slug}`);
      await page.waitForLoadState('networkidle');
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(width);
    });
  }
}

test('the architecture diagram scrolls inside its own box instead of widening the page', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/projects/toeic-master');
  const box = page.locator('.diagram-scroll').first();
  const { client, scroll } = await box.evaluate((el) => ({ client: el.clientWidth, scroll: el.scrollWidth }));
  expect(scroll).toBeGreaterThan(client);
  expect(client).toBeLessThanOrEqual(375);
});

test.describe('getting back to the home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
  });

  test('the back link on a project page returns to the projects on the home page', async ({ page }) => {
    await page.goto('/projects/mynotch');
    await page.locator('a.back-link').click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.locator('main[data-route="/"]')).toBeVisible();
    await expect(page.locator('[data-tile="mynotch"]')).toBeVisible();
    await expectHomeFullyRevealed(page);
  });

  test('the logo returns to the home page', async ({ page }) => {
    await page.goto('/projects/xtruyen');
    await page.getByRole('link', { name: 'Dat Truong — home' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('main[data-route="/"]')).toBeVisible();
    await expectHomeFullyRevealed(page);
  });

  test('the back link scrolls to the projects, not the top, when it lands on the home page', async ({ page }) => {
    await page.goto('/projects/toeic-master');
    await page.locator('a.back-link').click();
    await expect(page.locator('main[data-route="/"]')).toBeVisible();
    const tile = page.locator('#projects');
    await expect
      .poll(async () => (await tile.boundingBox())?.y ?? 9999, { timeout: 5000 })
      .toBeLessThan(400);
  });

  test('the not-found page offers a working way home', async ({ page }) => {
    await page.goto('/projects/does-not-exist');
    await page.getByRole('link', { name: /home page/i }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('main[data-route="/"]')).toBeVisible();
  });
});

test('a header link on a project page leads to its section on the home page', async ({ page }) => {
  await page.goto('/projects/mynotch');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Stack' }).click();
  await expect(page).toHaveURL(/\/#stack$/);
  await expect(page.locator('main[data-route="/"]')).toBeVisible();
  await expect
    .poll(async () => (await page.locator('#stack').boundingBox())?.y ?? 9999, { timeout: 5000 })
    .toBeLessThan(400);
  await expectHomeFullyRevealed(page);
});

test('a header link on the home page scrolls to its section', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await nav.getByRole('link', { name: 'Stack' }).click();
  await expect(page).toHaveURL(/\/#stack$/);
  await expect
    .poll(async () => (await page.locator('#stack').boundingBox())?.y ?? 9999, { timeout: 5000 })
    .toBeLessThan(400);

  // The contact tile is the last thing on the page, so it can only scroll as far as the page allows.
  await nav.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
});

test.describe('opening a project', () => {
  test('never freezes the screen: frames keep coming and the view transition is not aborted', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const tile = page.locator('[data-tile="mynotch"]');
    await tile.scrollIntoViewIfNeeded();

    // While a view transition waits for its DOM update, the browser stops painting and requestAnimationFrame stops
    // firing. The DOM itself is already new by then, so only the gap between frames shows the freeze (about 4s).
    await page.evaluate(() => {
      document.addEventListener(
        'click',
        () => {
          const state = window as unknown as { __maxFrameGap: number };
          state.__maxFrameGap = 0;
          let last = performance.now();
          const end = last + 5000;
          const tick = (now: number) => {
            state.__maxFrameGap = Math.max(state.__maxFrameGap, now - last);
            last = now;
            if (now < end) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { capture: true, once: true },
      );
    });
    await tile.click();
    await expect(page.locator('main[data-route="/projects/mynotch"]')).toBeVisible({ timeout: 8000 });
    await page.waitForTimeout(5200);

    const gap = await page.evaluate(() => (window as unknown as { __maxFrameGap: number }).__maxFrameGap);
    expect(gap).toBeLessThan(2500);
    expect(errors.filter((message) => /transition/i.test(message))).toEqual([]);
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });
    test('a tile still opens its project', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.locator('[data-tile="toeic-master"]').click();
      await expect(page).toHaveURL(/\/projects\/toeic-master$/);
      await expect(page.getByRole('heading', { level: 1, name: 'TOEIC Master' })).toBeVisible();
    });

    test('the back link still returns home', async ({ page }) => {
      await page.goto('/projects/mynotch');
      await page.locator('a.back-link').click();
      await expect(page).toHaveURL(/\/#projects$/);
      await expect(page.locator('main[data-route="/"]')).toBeVisible();
    });
  });
});

test.describe('the architecture diagram says when it scrolls', () => {
  for (const width of [375, 1440]) {
    for (const slug of slugs) {
      test(`${slug} at ${width}px shows the hint exactly when the diagram overflows its box`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(`/projects/${slug}`);
        await page.waitForLoadState('networkidle');
        const canScroll = await page
          .locator('.diagram-scroll')
          .evaluate((element) => element.scrollWidth > element.clientWidth + 4);
        const hint = page.locator('.diagram-hint');
        if (canScroll) await expect(hint).toBeVisible();
        else await expect(hint).toBeHidden();
      });
    }
  }

  test('the hint and the faded edge go away at the end of the diagram and return at the start', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/projects/toeic-master');
    const frame = page.locator('.diagram-frame');
    const box = page.locator('.diagram-scroll');
    await expect(page.locator('.diagram-hint')).toBeVisible();
    await expect(frame).toHaveAttribute('data-more', 'true');

    await box.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(page.locator('.diagram-hint')).toBeHidden();
    await expect(frame).toHaveAttribute('data-more', 'false');

    await box.evaluate((element) => {
      element.scrollLeft = 0;
    });
    await expect(page.locator('.diagram-hint')).toBeVisible();
    await expect(frame).toHaveAttribute('data-more', 'true');
  });

  test('the box can be scrolled with the keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/projects/toeic-master');
    await page.waitForLoadState('networkidle');
    const box = page.locator('.diagram-scroll');
    await box.focus();
    for (let press = 0; press < 4; press++) await page.keyboard.press('ArrowRight');
    await expect.poll(() => box.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  });

  test.describe('in Vietnamese', () => {
    test.use({ locale: 'vi-VN' });
    test('the hint is translated', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      await page.goto('/projects/toeic-master');
      await expect(page.locator('.diagram-hint')).toContainText('Cuộn ngang để xem toàn bộ sơ đồ');
    });
  });
});

test('the infrastructure tile lists the TOEIC Master landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.infra-hosts').getByText('toeicmaster.truongquocdat.id.vn')).toBeVisible();
});
