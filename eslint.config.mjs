import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
	{
		files: [["**/*.mjs", "src/**/*.js", "tests/*"]],
        plugins: {
			js,
            stylistic,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
            'stylistic/semi': 'error',
		},
	},
]);