import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'
import vitest from 'eslint-plugin-vitest'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ignoreFilePath = path.resolve(__dirname, '.eslintignore')

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(ignoreFilePath),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: { 'react/prop-types': 'off', '@typescript-eslint/no-explicit-any': 'off', 'react/jsx-uses-react': 'error' }
  },
  // pluginReact.configs.flat['jsx-runtime'],
  eslintConfigPrettier,
  {
    // update this to match your test files
    files: ['**/*.spec.js', '**/*.test.js', '**/*.test.jsx', '**/tests/**/*.js', '**/*.test.tsx'],
    plugins: {
      vitest
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals
      }
    },
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules,
      'vitest/expect-expect': 'off'
    }
  }
]
