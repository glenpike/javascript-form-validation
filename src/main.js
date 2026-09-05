import { initialise } from './form-validator.mjs'

const displayResults = ({ formValid, results }) => {
    console.log('results ', results)
    let text = ''
    const fields = { fullName: 'Full name', email: 'Email Address', phoneNumber: 'Telephone or mobile Numner'};
    for(const name in fields) {
        text += `${fields[name]}: '${results[name]}'`;
        text += '\n';
    }
    const { dobDay: day, dobMonth: month, dobYear: year } = results;
    const dob = `${day} ${month} ${year}`;
    text += `Date of birth: '${dob}'`;

    text += `Valid form? ${formValid}`
    const output = document.querySelector("#output");
    output.textContent = text;
}

document.addEventListener("DOMContentLoaded", () => {
  initialise(displayResults)
});