module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["vite.config.ts", ".eslintrc.cjs"],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.node.json",
      },
    },
  ],
};
