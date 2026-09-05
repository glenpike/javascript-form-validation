import { isPresent, validEmail, validDate, validUKPhoneNumber, validNumber } from '../../src/utils/validators.mjs';

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

test.describe('validNumber', () => {
    test('returns true for number', () => {
        expect(validNumber(100)).toBe(true);
    });

    test('returns true for string numbers', () => {
        expect(validNumber('100')).toBe(true);
    });

    test('returns false for invalid number strings', () => {
        expect(validNumber('100x')).toBe(false);
    });

    test('returns false for an object', () => {
        expect(validNumber({})).toBe(false);
    });

    test('returns false for null', () => {
        expect(validNumber(null)).toBe(false);
    });

    test.describe('with min value', () => {
        test('returns true when value is greater', () => {
            expect(validNumber(100, { min: 50 })).toBe(true);
        });

        test('returns true when value is equal', () => {
            expect(validNumber(100, { min: 100 })).toBe(true);
        });


        test('returns false when value is less', () => {
            expect(validNumber(100, { min: 101 })).toBe(false);
        });
    });

    test.describe('with max value', () => {
        test('returns true when value is less', () => {
            expect(validNumber(100, { max: 500 })).toBe(true);
        });

        test('returns true when value is equal', () => {
            expect(validNumber(100, { max: 100 })).toBe(true);
        });


        test('returns false when value is greater', () => {
            expect(validNumber(101, { max: 100 })).toBe(false);
        });
    });

    test.describe('with min and max values', () => {
        test('returns true when value is in the range', () => {
            expect(validNumber(100, { min: 99, max: 101 })).toBe(true);
        });


        test('returns false when value is outside range', () => {
            expect(validNumber(102, { min: 99, max: 101 })).toBe(false);
        });
    });
});
