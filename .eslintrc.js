module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    mongo: true,
    serviceworker: true
  },
  extends: [
    'standard', // using the shareable configuration object eslint-config-standard
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'node',
    'mongo',
    'jest',
    '@typescript-eslint'
  ],

  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/prop-types': ['off'],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  },

  // https://eslint.org/docs/user-guide/configuring#adding-shared-settings
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx'
        ]
      }
    },
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to 'createReactClass'
      pragma: 'React', // Pragma to use, default to 'React'
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to 'Fragment'
      version: 'detect', // React version. 'detect' automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to 'detect' in the future
      flowVersion: '0.53' // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' }
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' }
    ]
  }
}
