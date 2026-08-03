import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.node },
	},
	tseslint.configs.recommended,
	{
		files: ['**/*.{ts,mts,cts}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				onUnsupportedTypeScriptVersion: 'warn',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
	},
	eslintConfigPrettier,
]);
