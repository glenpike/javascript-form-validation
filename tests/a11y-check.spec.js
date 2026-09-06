import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { defaultFields, fillInForm } from './helpers.mjs';

test('empty form has no a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .analyze();
  expect(results.violations).toEqual([]);
});

test('invalid form has no a11y violations', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Send and check' }).click();
  const results = await new AxeBuilder({ page })
    .analyze();
  expect(results.violations).toEqual([]);
});

test('valid form has no a11y violations', async ({ page }) => {
  await page.goto('/');
  await fillInForm(page, defaultFields);
  await page.getByRole('button', { name: 'Send and check' }).click();
  const results = await new AxeBuilder({ page })
    .analyze();
  expect(results.violations).toEqual([]);
});