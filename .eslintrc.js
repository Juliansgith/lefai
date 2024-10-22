// .eslintrc.js
module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb', // Use Airbnb's base rules
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended', // Accessibility plugin
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'prettier', // Integrate Prettier
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 13,
      sourceType: 'module',
    },
    plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
    rules: {
      // Customize rules as needed
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      // Allow .js files to contain JSX
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  