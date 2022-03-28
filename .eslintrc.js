module.exports = {
  root: true,
  overrides: [
    {
        files: ['pages/**/*.vue', 'layouts/*.vue'],
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },
],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
