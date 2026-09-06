const resultsListClass = 'results-list';
const resultsItemClass = 'results-list__item';
const buttonText = 'Remove result';


const toggleResults = () => {
    const resultsDisplay = document.querySelector('.results-display');
    const visible = resultsDisplay.querySelectorAll(`.${resultsItemClass}`)?.length > 0;
    resultsDisplay.classList.toggle('results-display--hidden', !visible);
};

export const displayResults = ({ formValid, results }) => {
    const { dobDay: day, dobMonth: month, dobYear: year } = results;
    const dob = `${day} ${month} ${year}`.trim();

    const innerHTML = `<li class="${resultsItemClass}">
            <ul class="result-data" data-testid="result-data">
                <li><span>Full name:</span><span data-testid="field-0">'${results.fullName}'</span></li>
                <li><span>Email:</span><span data-testid="field-1">'${results.email}'</span></li>
                <li><span>Date of Birth:</span><span data-testid="field-2">'${dob}'</span></li>
                <li><span>Phone number:</span><span data-testid="field-3">'${results.phoneNumber}'</span></li>
                <li><span>Valid form>?:</span><span data-testid="field-validity">${formValid ? 'Yes' : 'No'}</span></li>
                <li><button class="btn btn--delete">${buttonText}</button></li>
            </ul>
        </li>`;

    const container = document.createElement('ul');
    container.innerHTML = innerHTML;
    const resultItem = container.firstElementChild;

    const resultsDisplay = document.querySelector(`.${resultsListClass}`);
    resultsDisplay.prepend(resultItem);

    const resultStatus = document.getElementById('result-status');
    resultStatus.textContent = 'Result added to the list.';

    toggleResults();
};

export const initialiseResults = () => {
    const resultsDisplay = document.querySelector(`.${resultsListClass}`);

    resultsDisplay.addEventListener('click', (e) => {
        if (e.target.innerText === buttonText) {
            const item = e.target.closest(`.${resultsItemClass}`);
            const next = item.nextElementSibling ?? item.previousElementSibling;
            if (next) {
                next.querySelector('button')?.focus();
            } else {
                document.getElementById('formTitle').focus();
            }
            item.remove();
            const resultStatus = document.getElementById('result-status');
            resultStatus.textContent = 'Result removed from the list.';
            toggleResults();
        }
    });

    toggleResults();
};
