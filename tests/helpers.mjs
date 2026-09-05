export const defaultFields = {
    'What is your full name?': 'Luke Skywalker',
    'What is your email address?': 'luke@therebellion.org',
    'Day': '27',
    'Month': '09',
    'Year': '1996',
    'What is your telephone number?': '07891 234567'
}

export const fillInForm = async (page, fields) => {
    for(const field in fields) {
        const input = await page.getByLabel(field);
        await input.fill(fields[field])
    }

    await page.getByRole('button', { name: 'Send and check' }).click();
}
