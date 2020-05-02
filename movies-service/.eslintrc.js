module.exports = {
  extends: ['ts-anaet'],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  rules: {
    "import/no-unresolved": "error",
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        "ignoreSiblings": true,
        "argsIgnorePattern": "req|res|next|^err"
      }
    ],
  },
  plugins: ["import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      // use <root>/tsconfig.json
      "typescript": { }
    }
  }
};
