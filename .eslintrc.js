// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  ignorePatterns: [
    'lib/',
    'dist/',
    '.wxt/',
    '.output/'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // scripts/ 与 e2e/ 下的 .mjs 用了顶层 await，2022 才支持
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'spaced-comment': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
