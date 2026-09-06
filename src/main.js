import { initialise } from './form-validator.mjs';
import { initialiseResults, displayResults } from './results-display.mjs';

document.addEventListener("DOMContentLoaded", () => {
    initialiseResults();
    initialise(displayResults);
});
