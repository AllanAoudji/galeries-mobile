module.exports = {
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        esmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/no-use-before-define': [
            'error',
            { variables: false },
        ],
        'no-use-before-define': 'off',
        'no-unused-vars': 2,
        'prettier/prettier': 2,
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react-native/no-color-literals': 2,
        'react-native/no-inline-styles': 0,
        'react-native/no-raw-text': 0,
        'react-native/no-unused-styles': 2,
        'react-native/split-platform-components': 2,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {},
        },
    },
};
