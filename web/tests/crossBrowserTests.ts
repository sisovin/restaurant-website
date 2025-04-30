import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Testing', () => {
  test('should display the homepage correctly in Chrome', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const title = await page.title();
    expect(title).toBe('Restaurant Website');
  });

  test('should display the homepage correctly in Firefox', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const title = await page.title();
    expect(title).toBe('Restaurant Website');
  });

  test('should display the homepage correctly in Safari', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const title = await page.title();
    expect(title).toBe('Restaurant Website');
  });
});
