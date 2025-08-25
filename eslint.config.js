import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			reactX.configs['recommended-typescript'],
			reactDom.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'react-dom/no-missing-button-type': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
		},
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	eslintConfigPrettier,
]);
