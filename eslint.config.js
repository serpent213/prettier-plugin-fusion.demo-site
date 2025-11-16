import eslintPluginAstro from "eslint-plugin-astro"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import parser from "@typescript-eslint/parser"

export default [
  // Use the recommended configs
  ...eslintPluginAstro.configs.recommended,

  // Global ignore patterns
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**", "tmp/**", "public/**", "coverage/**"]
  },

  // TypeScript-specific configuration (exclude .astro files to avoid parser conflicts)
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslint
    },
    rules: {
      // Disable base rule in favor of TypeScript version
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "no-console": "off",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  },

  // Additional rules for all files
  {
    rules: {
      "no-console": "off",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  }
]
