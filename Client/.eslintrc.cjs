module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh", "import"],
  settings: {
    "import/resolver": {
      typescript: {
        "project": "tsconfig.json"
      }
    },
  },
  rules: {
    "indent": ["warn", 3],

    "react-refresh/only-export-components": [
      "off",
      { allowConstantExport: true },
    ],
    
    "import/no-unresolved": "off",

    "no-useless-catch": "off",
    "no-empty-pattern": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "warn"
  },
}
