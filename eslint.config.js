import stylistic from "@stylistic/eslint-plugin";
import unicorn from "eslint-plugin-unicorn";
import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,

	stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: true,
		jsx: false,
		arrowParens: true,
		braceStyle: "1tbs",
		blockSpacing: true,
		quoteProps: "consistent-as-needed",
		commaDangle: "always-multiline",
	}),

	{
		plugins: { unicorn },
		languageOptions: {
			globals: globals["shared-node-browser"],
		},
		rules: {
			"eqeqeq": ["warn", "always", { null: "ignore" }],
			"logical-assignment-operators": 2,

			"@stylistic/arrow-parens": 0,
			"@stylistic/max-statements-per-line": 0,
			"@stylistic/no-multi-spaces": 0,
			"@stylistic/no-multiple-empty-lines": 0,

			"unicorn/escape-case": 2,
			"unicorn/number-literal-case": 2,
			"unicorn/no-array-for-each": 2,
			"unicorn/no-instanceof-array": 2,
			"unicorn/no-zero-fractions": 2,
			"unicorn/no-useless-undefined": 2,
			"unicorn/no-useless-spread": 2,
			"unicorn/no-useless-promise-resolve-reject": 2,
			"unicorn/no-useless-length-check": 2,
			"unicorn/no-useless-fallback-in-spread": 2,
			"unicorn/no-unnecessary-await": 2,
			"unicorn/prefer-array-find": 2,
			"unicorn/prefer-array-index-of": 2,
			"unicorn/prefer-date-now": 2,
			"unicorn/prefer-ternary": 2,
			"unicorn/prefer-logical-operator-over-ternary": 2,
			"unicorn/prefer-switch": 2,
			"unicorn/prefer-native-coercion-functions": 2,
			"unicorn/prefer-prototype-methods": 2,
		},
	},
];
