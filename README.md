# Webform Validation Example Code

## Objective

* Build a webpage with a form, which asks for Name, E-mail, Date of birth and Phone number. 
* When the user submits the form, validate and display the data below the form on the same page. 
* Each new submission should be appended to the existing data, and it should be possible to remove it.

## The page/form

There is a page in `src/index.html` with a form.  This is styled with `src/styles.css` and uses JavaScript to progressively enhance the form behaviour - entry point is `src/main.js`.

## Installation

Run `npm install` to include any packages for linting, testing, etc.

The JavaScript files within maybe renamed to `*.js.txt` and `*.mjs.txt` for emailing.  They will need to be 'restored'.  There is a helper in `scripts/rename-js.mjs` (if this has a `.txt` extension, along with the other files, rename that file manually first). Run `npm run js:restore` to rename them all automatically.  If renaming needs to be done manually, find all the files with a `.mjs.txt` or `.js.txt` extension in the src and test directories.

Once JavaScript is restored, it should be possible serve the web page locally with `npm start`.

## Code

JavaScript is written in ES6 'module' format.  No build tools have been used yet, but linting checks for browser compatibility.

CSS is written with CSS3 variables.  Again, the linter checks for any rules that maybe unsupported in various browsers.

HTML validation checks for a11y, etc.

Code is broken down into modular form with the utilities separated, so we have 'main' initialising the form validation & results display modules separately.  The form validation receives a callback to pass the results for display when the form is submitted.  HTML validation is disabled (progressively), so we rely on pure JS validation.  I have tried to be pragmatic about dates of birth and phone numbers whilst ensuring they are 'valid'; a person may have a non-geographic phone number that is their only contact number, e.g. they are homeless being helped by an agency, etc.

I paid heed to the Gov UK Design System as I am familiar with that system, but I haven't tried to faithfully recreate it's components and patterns here.

## Testing

Run: `npm test`

Lint: `npm run lint` does everything

I used Playwright for testing - as a challenge to learn it a little more - and I am running unit and e2e tests.  Unit tests might normally be handled in some other software, but there's only a handful and Playwright's interface allows simple testing of these, so we don't need a whole other system to run those, so the choice was pragmatic.

Missing tests 
- focussing on an element when we remove one of the results.
- validation handling on the D.O.B. fields after first submission.


Also manually tested on 

Mac OS:
Chrome 152.0.7977.77
Firefox 155.0.1
Safari 26.4

Windows
Edge 148.0.3967.54

Android
Brave 1.94.119
Chrome 152.0.7977.82

Lighthouse Chrome Accessibility checks

## AI

I used Claude to help discuss my minimal setup originally - figuring out what tooling and test runner was best from my ideas.  I wrote the HTML/CSS/JS and test code myself.  I ran into some issues with locators in playwright, eslint config and scripting the obfuscate/restore script and asked Claude Code to help with those.  I also asked it for advice with some config / Playwright issues.  So the majority of the actual code is my work, but I am trying to be pragmatic about spending hours debugging fragile configuration with fast moving library tools and spend time on the code itself.