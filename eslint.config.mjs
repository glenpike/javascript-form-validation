import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import css from "@eslint/css";
import compat from "eslint-plugin-compat";

export default defineConfig([
	{
		files: ["src/**/*.mjs", "src/**/*.js", "tests/*"],
        plugins: {
			js,
            stylistic,
		},
		extends: ["js/recommended"],
        languageOptions: {
            globals: {
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
            },
        },
		rules: {
			"no-unused-vars": "warn",
            'stylistic/semi': 'error',
            "no-console": "warn",
		},
	},
    {
        files: ["**/*.css"],
        language: "css/css",
        plugins: { css },
        extends: ["css/recommended"],
    },
    {
        // Browser-support checking only makes sense for the code that
        // actually ships to a browser, not the Node-side tooling/tests.
        ...compat.configs["flat/recommended"],
        files: ["src/**/*.js", "src/**/*.mjs"],
    },
]);