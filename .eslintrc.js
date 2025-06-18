module.exports = {
    ignorePatterns: [
        'node_modules/',
        'dist/',
        '*.log',
        '!.eslintrc.js'
    ],
    env: {
        node: true,
        es2021: true,
        jest: true
    },
    extends: [
        'standard',
        'plugin:node/recommended',
        'plugin:import/recommended',
        'plugin:promise/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        // Basic rules
        indent: [ 'warn', 4, { SwitchCase: 1 } ],
        'linebreak-style': [ 'warn', 'unix' ],
        quotes: [ 'warn', 'single' ],
        semi: [ 'warn', 'always' ],
        'object-curly-spacing': [ 'warn', 'always' ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'space-before-function-paren': [ 'warn', 'never' ],

        // Node.js rules
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'off',

        // Imports
        'import/order': [ 'error', {
            groups: [ 'builtin', 'external', 'internal' ],
            'newlines-between': 'always'
        } ],

        // Promises
        'promise/catch-or-return': 'error',
        'promise/always-return': 'error',

        // Express-specific rules
        'no-unused-vars': [ 'error', {
            argsIgnorePattern: '^_|next|req|res|err'
        } ]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: [ '.js' ],
                moduleDirectory: [ 'node_modules', 'src/' ]
            }
        }
    }
};
