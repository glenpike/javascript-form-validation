import { validateNameField, validateEmailField, validateDateOfBirthField } from '../src/form-validator.mjs';

import { test, expect } from '@playwright/test';

test.describe('validateNameField', () => {
    test('no errors when value is set', () => {
        expect(validateNameField({ name: 'fullName', value: 'Obi-Wan Kenobi'})).toEqual({});
    });

    test('returns error when there is no value present', () => {
        expect(validateNameField({ name: 'fullName', value: ''})).toEqual({ fullName: 'Please enter your full name' });
    });
});

test.describe('validateEmailField', () => {
    test('returns no errors when the email is valid', () => {
        expect(validateEmailField({ name: 'email', value: 'accessibility@dwp.gov.uk'})).toEqual({});
    });

    test('returns errors when the email is invalid', () => {
        expect(validateEmailField({ name: 'email', value: '@dwp.gov.uk'})).toEqual({ email: 'Please enter a valid email address'});
    });

    test('returns errors when the email is empty', () => {
        expect(validateEmailField({ name: 'email', value: ''})).toEqual({ email: 'Please enter a valid email address'});
    });
});

test.describe('validateDateOfBirthField', () => {
    test('returns no errors when the date is valid', () => {
        const fields = {
            elYear: { name: 'year', value: '1990' },
            elMonth: { name: 'month', value: '11' },
            elDay: { name: 'day', value: '20' }
        }
        expect(validateDateOfBirthField(fields)).toEqual({});
    });

    test('returns errors when all the fields are invalid', () => {
        const fields = {
            elYear: { name: 'year', value: new Date().getFullYear() + 1 },
            elMonth: { name: 'month', value: '0' },
            elDay: { name: 'day', value: '32' }
        }
        expect(validateDateOfBirthField(fields)).toEqual({ year: 'Please enter a valid day & month & year'});
    });

    test('returns errors when one of the fields is invalid', () => {
        const fields = {
            elYear: { name: 'year', value: 2000 },
            elMonth: { name: 'month', value: '' },
            elDay: { name: 'day', value: '1' }
        }
        expect(validateDateOfBirthField(fields)).toEqual({ year: 'Please enter a valid month'});
    });

    // TODO - phone number...
});