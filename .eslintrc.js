module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["prettier"],
  plugins: ["prettier", "simple-import-sort", "unused-imports"],
  overrides: [
    {
      files: ["*.test.js", "*.data.js", "*.stories.js", "*.js"],
      rules: {
        // "react-hooks/rules-of-hooks": "warn", // Checks rules of Hooks
        // "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        "import/no-anonymous-default-export": "off",
        "jest/valid-expect": "off",
        "jest/valid-title": "off",
        "no-unused-vars": "off",
        "jest/valid-expect-in-promise": "off",
        "simple-import-sort/imports": [
          "warn",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "8",
    requireConfigFile: false,
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "no-redeclare": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "unused-imports/no-unused-imports": "warn",
  },
};
