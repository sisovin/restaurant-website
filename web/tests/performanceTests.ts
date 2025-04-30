import { test, expect } from '@playwright/test';

test.describe('Performance Testing', () => {
  test('should load the homepage within acceptable time', async ({ page }) => {
    const startTime = performance.now();
    await page.goto('http://localhost:3000');
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(2000); // Expect the page to load within 2 seconds
  });

  test('should have acceptable Time to Interactive (TTI)', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const tti = await page.evaluate(() => {
      return performance.timing.domInteractive - performance.timing.navigationStart;
    });
    expect(tti).toBeLessThan(3000); // Expect TTI to be less than 3 seconds
  });

  test('should have acceptable First Contentful Paint (FCP)', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const fcp = await page.evaluate(() => {
      return performance.getEntriesByName('first-contentful-paint')[0].startTime;
    });
    expect(fcp).toBeLessThan(1500); // Expect FCP to be less than 1.5 seconds
  });
});
