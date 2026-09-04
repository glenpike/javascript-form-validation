import { isPresent, validEmail, validDate, validUKPhoneNumber } from '../../src/utils/validators.mjs';

import { test, expect } from '@playwright/test';

test.describe('isPresent', () => {
    test('returns true when there is a value present', () => {
        expect(isPresent('abc123')).toEqual(true);
    });

    test('returns false when there is no value present', () => {
        expect(isPresent('')).toEqual(false);
    });

    test('returns false when element is null', () => {
        expect(isPresent(null)).toEqual(false);
    });
});

test.describe('validEmail', () => {
    test('returns true when the email is valid', () => {
        expect(validEmail('accessibility@dwp.gov.uk')).toBe(true);
    });

    test('returns true when the email is has a prefix', () => {
        expect(validEmail('accessibility+test@dwp.gov.uk')).toBe(true);
    });

    test('returns false when the email is invalid', () => {
        expect(validEmail('@dwp.gov.uk')).toEqual(false);
    });

    test('returns false when the email is null', () => {
        expect(validEmail(null)).toEqual(false);
    });
});

test.describe('validDate', () => {
    test('returns true when the date is valid', () => {
        expect(validDate('1980-12-25')).toBe(true);
    });

    test('returns true when the date is invalid', () => {
        expect(validDate('1980-23-40')).toBe(false);
    });

    test('returns false when the date is invalid', () => {
        expect(validDate('not a date')).toEqual(false);
    });

    test('returns false when the date is null', () => {
        expect(validDate(null)).toEqual(false);
    });
});

test.describe('validUKPhoneNumber', () => {
    test('returns true for a mobile number', () => {
        expect(validUKPhoneNumber('07891234567')).toBe(true);
    });

    test('returns true for a landline number', () => {
        expect(validUKPhoneNumber('01234567890')).toBe(true);
    });

    test('returns true for a with the country code', () => {
        expect(validUKPhoneNumber('+441234567890')).toBe(true);
    });

    test('returns true for a with the international code', () => {
        expect(validUKPhoneNumber('00441234567890')).toBe(true);
    });


    test('returns false when the number is invalid', () => {
        expect(validUKPhoneNumber('not a number')).toEqual(false);
    });

    test('returns false when the number is null', () => {
        expect(validUKPhoneNumber(null)).toEqual(false);
    });
});

