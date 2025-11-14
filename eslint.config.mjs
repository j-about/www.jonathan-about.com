import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/no-unknown-property': [
        'error',
        {
          ignore: [
            'position',
            'args',
            'map',
            'transparent',
            'alphaTest',
            'intensity',
            'attach',
            'rotation',
            'scale',
            'geometry',
            'material',
          ],
        },
      ], // Allow Three.js/react-three-fiber props
      'react-hooks/purity': 'off', // Three.js animations require imperative updates
      'react-hooks/immutability': 'off', // Three.js requires direct mutations
      'react-hooks/set-state-in-effect': 'warn', // Allow but warn for intentional cases
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
)
