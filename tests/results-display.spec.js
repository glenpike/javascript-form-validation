import { test, expect } from '@playwright/test';
import { defaultFields, fillInForm } from './helpers.mjs';


const checkResultsRow = async (row, expectedValues, validity) => {
    for(const cell in expectedValues) {
        const td = row.getByRole('cell').nth(cell)
        const text = await td.innerText();
        expect(text).toEqual(`'${expectedValues[cell]}'`)
    }
    const td = row.getByRole('cell').nth(4)
    const text = await td.innerText();
    expect(text).toEqual(validity)
}
test.describe('Table and row visibility', () => {
    test('Hides the results initially', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByTestId('results-table')).toHaveClass(['results-table results-table--hidden']);//not.toBeVisible();
    });

    test('Shows the results when we validate', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        await expect(page.getByTestId('results-table')).toHaveClass(['results-table']);//.toBeVisible();
    });

    test('Shows multiple result rows', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        await page.getByRole('button', { name: 'Send and check' }).click();
        
        const values = ["", "", "", ""];
        await checkResultsRow(await page.getByRole('row').nth(1), values, 'No')
        await checkResultsRow(await page.getByRole('row').nth(2), values, 'No')
    });

    test('Allows rows to be removed', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        await page.getByRole('button', { name: 'Send and check' }).click();
        
        expect(await page.getByRole('row')).toHaveCount(3);

        await page.getByRole('button', { name: 'Remove result' }).nth(0).click();

        expect(await page.getByRole('row')).toHaveCount(2);
    });

    test('When all rows are removed, table is hidden', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        
        await page.getByRole('button', { name: 'Remove result' }).click();

        await expect(page.getByTestId('results-table')).toHaveClass(['results-table results-table--hidden']);//not.toBeVisible();
    });
})

test.describe('an empty form', () => {
    test('Shows empty results', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Send and check' }).click();
        const row = await page.getByRole('row').nth(1)

        const values = ["", "", "", ""];
        await checkResultsRow(row, values, 'No')
        // for(const cell in values) {
        //     const td = row.getByRole('cell').nth(cell)
        //     const text = await td.innerText();
        //     expect(text).toEqual(`'${values[cell]}'`)
        // }
        // const td = row.getByRole('cell').nth(4)
        // const text = await td.innerText();
        // expect(text).toEqual('No')
    });
});

test.describe('an complete form', () => {
    test('Shows valid results', async ({ page }) => {
        await page.goto('/');
        await fillInForm(page, defaultFields);
        
        const row = await page.getByRole('row').nth(1)

        const values = ['Luke Skywalker', 'luke@therebellion.org', '27 09 1996', '07891 234567'];
        await checkResultsRow(row, values, 'Yes')
    });
});

test.describe('a partially complete form', () => {
    test('Shows results', async ({ page }) => {
        await page.goto('/');
          
        const partialFields = {...defaultFields, 'Month': '', 'What is your UK telephone number?': '0123' }
        await fillInForm(page, partialFields);
        
        const row = await page.getByRole('row').nth(1)

        const values = ['Luke Skywalker', 'luke@therebellion.org', '27 1996', '0123'];
        for(const cell in values) {
            const td = row.getByRole('cell').nth(cell)
            const text = await td.innerText();
            expect(text).toEqual(`'${values[cell]}'`)
        }
        const td = row.getByRole('cell').nth(4)
        const text = await td.innerText();
        expect(text).toEqual('No')
    });
});
