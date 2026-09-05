const resultRowClass = 'result-row';

const toggleResults = () => {
    const table = document.querySelector('.results-table');
    const visible = table.querySelectorAll('tbody tr')?.length > 0;
    table.classList.toggle('results-table--hidden', !visible);
}

export const displayResults = ({ formValid, results }) => {
    const { dobDay: day, dobMonth: month, dobYear: year } = results;
    const dob = `${day} ${month} ${year}`.trim();

    const innerHTML = `<tr class="${resultRowClass}">
            <td>'${results.fullName}'</td>
            <td>'${results.email}'</td>
            <td>'${dob}'</td>
            <td>'${results.phoneNumber}'</td>
            <td>${formValid ? 'Yes' : 'No'}</td>
            <td><button>Remove result</button></td>
        </tr>`;

    const container = document.createElement('tbody');
    container.innerHTML = innerHTML;
    const row = container.firstElementChild;

    const tableBody = document.querySelector('.results-table tbody');
    tableBody.appendChild(row);

    toggleResults();
}

export const initialiseResults = () => {
    const table = document.querySelector('.results-table');
    
    table.addEventListener('click', (e) => {
        if(e.target.innerText === 'Remove result') {
            const row = e.target.closest(`.${resultRowClass}`)
            row.remove();
            toggleResults();
        }
    });

    toggleResults()
}
