import { test, expect } from '@playwright/test';
import { defaultFields, fillInForm } from './helpers.mjs';

test.describe('an empty form', () => {
    test('Shows the error messages', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();

        await expect(page.getByText('Please enter your full name')).toBeVisible();
        await expect(page.getByText('Please enter a valid email address')).toBeVisible();
        await expect(page.getByText('Please enter a valid day & month & year in the past')).toBeVisible();
        await expect(page.getByText('Please enter a valid UK landline or mobile telephone number')).toBeVisible();
    });

    test('Marks fields as invalid', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();

        for(const field in defaultFields) {
            const input = await page.getByLabel(field);
            await expect(input).toHaveClass('invalid');
        }
    });
});

test.describe('a valid form', () => {
    test('Does not mark fields as invalid', async ({ page }) => {
        await page.goto('/');

        await fillInForm(page, defaultFields);

        for(const field in defaultFields) {
            const input = await page.getByLabel(field);
            await expect(input).not.toHaveClass('invalid');
        }
    });

    test('Does not show any error messages', async ({ page }) => {
        await page.goto('/');

        await fillInForm(page, defaultFields);

        await expect(page.getByText('Please enter')).toHaveCount(0)
    });
});


test.describe('a partially valid form', () => {
    test('Marks some fields as invalid', async ({ page }) => {
        await page.goto('/');

        const partialFields = {...defaultFields, 'Month': '', 'What is your UK telephone number?': '0123' }
        await fillInForm(page, partialFields);

        await expect(page.getByLabel('What is your full name?')).not.toHaveClass('invalid');
        await expect(page.getByLabel('What is your email address?')).not.toHaveClass('invalid');
        await expect(page.getByLabel('Day')).not.toHaveClass('invalid');
        await expect(page.getByLabel('Year')).not.toHaveClass('invalid');
        await expect(page.getByLabel('Month')).toHaveClass('invalid');
        await expect(page.getByLabel('What is your UK telephone number?')).toHaveClass('invalid');
    });

    test('Shows some error messages', async ({ page }) => {
        await page.goto('/');

        const partialFields = {...defaultFields, 'Month': '', 'What is your UK telephone number?': '0123' }

        await fillInForm(page, partialFields);

        await expect(page.getByText('Please enter your full name')).toHaveCount(0);
        await expect(page.getByText('Please enter a valid email address')).toHaveCount(0);
        await expect(page.getByText('Please enter a valid month in the past')).toBeVisible();
        await expect(page.getByText('Please enter a valid UK landline or mobile telephone number')).toBeVisible();
        page.pause()
    });
});
