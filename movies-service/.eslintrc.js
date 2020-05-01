module.exports = {
  extends: ['ts-anaet'],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./"
  },
  rules: {
    "import/no-unresolved": "error"
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
