"use strict";

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  "extends": 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'indent': ['error', 2]
  }
};