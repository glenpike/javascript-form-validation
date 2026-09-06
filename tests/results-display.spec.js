import { test, expect } from '@playwright/test';
import { defaultFields, fillInForm } from './helpers.mjs';


const checkResultsRow = async (page, row, expectedValues, validity) => {
    const resultsItem = await page.getByTestId('result-data').nth(row)

    for(const item in expectedValues) {
        const data = await resultsItem.getByTestId(`field-${item}`)
        const text = await data.innerText();
        expect(text).toEqual(`'${expectedValues[item]}'`)
    }
    const data = await resultsItem.getByTestId('field-validity')
    const text = await data.innerText();
    expect(text).toEqual(validity)
}
test.describe('Table and row visibility', () => {
    test('Hides the results initially', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByTestId('results-display')).toHaveClass(['results-display results-display--hidden']);//not.toBeVisible();
    });

    test('Shows the results when we validate', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        await expect(page.getByTestId('results-display')).toHaveClass(['results-display']);//.toBeVisible();
    });

    test('Shows multiple result rows', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        await page.getByRole('button', { name: 'Send and check' }).click();
        
        const values = ["", "", "", ""];
        await checkResultsRow(page, 1, values, 'No')
        await checkResultsRow(page, 0, values, 'No')
    });

    test('Allows rows to be removed', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        await page.getByRole('button', { name: 'Send and check' }).click();
        
        await expect(page.locator('.results-list__item')).toHaveCount(2);

        await page.getByRole('button', { name: 'Remove result' }).nth(0).click();

        await expect(page.locator('.results-list__item')).toHaveCount(1);
    });

    test('When all rows are removed, table is hidden', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        
        await page.getByRole('button', { name: 'Remove result' }).click();

        await expect(page.getByTestId('results-display')).toHaveClass(['results-display results-display--hidden']);//not.toBeVisible();
    });
})

test.describe('an empty form', () => {
    test('Shows empty results', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();

        const values = ["", "", "", ""];
        await checkResultsRow(page, 0, values, 'No')
    });
});

test.describe('an complete form', () => {
    test('Shows valid results', async ({ page }) => {
        await page.goto('/');
        await fillInForm(page, defaultFields);

        const values = ['Luke Skywalker', 'luke@therebellion.org', '27 09 1996', '07891 234567'];
        await checkResultsRow(page, 0, values, 'Yes')
    });
});

test.describe('a partially complete form', () => {
    test('Shows results', async ({ page }) => {
        await page.goto('/');
          
        const partialFields = {...defaultFields, 'Month': '', 'What is your UK telephone number?': '0123' }
        await fillInForm(page, partialFields);

        const values = ['Luke Skywalker', 'luke@therebellion.org', '27 1996', '0123'];
        await checkResultsRow(page, 0, values, 'No')
    });
});
