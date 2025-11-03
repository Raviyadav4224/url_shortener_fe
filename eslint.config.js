import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist", "build", "*.config.js"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      vite: {
        configPath: "./vite.config.js",
      },
      "import/resolver": {
        alias: {
          map: [
            ["@", "./src"],
            ["@hooks", "./src/hooks"],
            ["@components", "./src/components"],
          ],
          extensions: [".js", ".jsx"],
        },
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "no-console": "error",
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "import/no-unresolved": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Node built-ins & npm packages
            ["internal"], // your custom alias paths (like @/components)
            ["parent", "sibling", "index"], // relative imports
            ["object"], // import {something} from obj?
          ],
          pathGroups: [
            {
              pattern: "@hooks/**",
              group: "internal",
            },
            {
              pattern: "**/*.css",
              group: "index",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always", // blank line between groups
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
