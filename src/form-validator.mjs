import { isPresent, validEmail, validDate, validUKPhoneNumber, validNumber } from './utils/validators.mjs';

const toggleFieldError = (el, isValid) => {
    el.classList.toggle('invalid', !isValid);
};

const setErrorMessage = (el, isValid, msg) => {
    toggleFieldError(el, isValid);
    const errorMsg = el.closest('.form-input')?.querySelector('.error-msg');
    errorMsg.textContent = isValid ? '' : msg;
};

const validateNameField = (el) => {
    let msg = '';
    let result = isPresent(el.value);
    if (!result) {
        msg = 'Please enter your full name';
    }
    setErrorMessage(el, result, msg);
    return result;
};

const validateEmailField = (el) => {
    let msg = '';
    let result = validEmail(el.value);
    if (!result) {
        msg = 'Please enter a valid email address';
    }
    setErrorMessage(el, result, msg);
    return result;
};

const validatePhoneNumberField = (el) => {
    let msg = '';
    let result = validUKPhoneNumber(el.value);
    if (!result) {
        msg = 'Please enter a valid UK landline or mobile telephone number';
    }
    setErrorMessage(el, result, msg);
    return result;
};

const validateDateOfBirthField = ({ elDay, elMonth, elYear }) => {
    let msg = '';
    let result = true;
    const fields = [];

    const dateString = `${elYear.value}-${elMonth.value}-${elDay.value}`;
    if (!validDate(dateString)) {
        msg = 'Please enter a valid date';
        result = false;
    }
    const validDay = validNumber(elDay.value, { min: 1, max: 31 });
    if (!validDay) {
        fields.push('day');
        result = false;
    }
    const validMonth = validNumber(elMonth.value, { min: 1, max: 12 });
    if (!validMonth) {
        fields.push('month');
        result = false;
    }
    const maxYear = new Date().getFullYear(); // Yeah, we're assuming small children are prodigies
    const minYear = maxYear - 150; // oldest person ever was 122
    const validYear = validNumber(elYear.value, { min: minYear, max: maxYear });
    if (!validYear) {
        fields.push('year');
        result = false;
    }
    if (fields.length > 0) {
        msg = `Please enter a valid ${fields.join(' & ')} in the past`;
    }

    setErrorMessage(elDay, result, msg);
    toggleFieldError(elDay, validDay);
    toggleFieldError(elMonth, validMonth);
    toggleFieldError(elYear, validYear);
    return result;
};

const validateForm = (form) => {
    const formInputs = Array.from(form.elements);

    let formValid = true;
    const results = {};

    const dobFields = { elDay: null, elMonth: null, elYear: null };

    const validationFns = {
        fullName: validateNameField,
        email: validateEmailField,
        phoneNumber: validatePhoneNumberField,
    };
    formInputs.forEach((el) => {
        if (validationFns[el.name]) {
            const validField = validationFns[el.name](el);
            if (!validField) {
                formValid = false;
            }
            results[el.name] = el.value;
        } else if (/^dob(Day|Month|Year)$/.test(el.name)) {
            dobFields[el.name.replace('dob', 'el')] = el;
            results[el.name] = el.value;
        }
    });
    const validField = validateDateOfBirthField(dobFields);
    if (!validField) {
        formValid = false;
    }

    return { formValid, results };
};

export const initialise = (resultsCallbackFn) => {
    const form = document.querySelector("form");

    form.noValidate = true;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const results = validateForm(form);
        resultsCallbackFn(results);
        return false;
    });

    form.addEventListener('change', (e) => {
        toggleFieldError(e.target, true);
    });
};
