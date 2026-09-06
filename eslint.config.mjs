import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import css from "@eslint/css";

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
]);