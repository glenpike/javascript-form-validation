import { isPresent, validEmail, validDate, validUKPhoneNumber, validNumber } from './utils/validators.mjs';

// When we validate, we want to check programmatically...

// Check the 'name' field against presence

// Check the email address for valid email addresses.


// const checkField(el) {
//     !!el && !!el.name && !!el.value
// }

export const validateNameField = (el) => {
    const errors = {};
    if(!isPresent(el.value)) {
        errors[el.name] = 'Please enter your full name';
    }

    return errors;
}

export const validateEmailField = (el) => {
    const errors = {};
    if(!validEmail(el.value)) {
        errors[el.name] = 'Please enter a valid email address';
    }
    return errors;
}

export const validatePhoneNumberField = (el) => {
    const errors = {};
    if(!validUKPhoneNumber(el.value)) {
        errors[el.name] = 'Please enter a valid UK landline or mobile number';
    }
    return errors;
}

export const validateDateOfBirthField = ({ elDay, elMonth, elYear }) => {
    const errors = {};
    const dateString = `${elYear.value}-${elMonth.value}-${elDay.value}`;
    if(!validDate(dateString)) {
        const fields = [];
        if(!validNumber(elDay.value, {min: 1, max: 31})) {
            fields.push('day');
        }
        if(!validNumber(elMonth.value, {min: 1, max: 12})) {
            fields.push('month');
        }
        const maxYear = new Date().getFullYear();
        const minYear = maxYear - 150 // oldest person ever was 122
        if(!validNumber(elYear.value, {min: minYear, max: maxYear})) {
            fields.push('year');
        }
        errors[elYear.name] = `Please enter a valid ${fields.join(' & ')}`;
    }
    return errors;
}


