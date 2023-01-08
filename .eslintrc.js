module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        jest: true
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    }
};
