
module.exports = {
  root: true, // ESLint 检查的根目录，通常是项目的根目录
  env: {
    node: true, // 启用 Node.js 全局变量和 Node.js 作用域
    browser: true, // 启用浏览器全局变量和浏览器作用域
    es6: true, // 启用 ES6 全局变量和 ES6 作用域
  },
  parser: '@typescript-eslint/parser', // 指定 ESLint 解析器
  parserOptions: {
    ecmaVersion: 'latest', // 启用 最新 语法支持
    sourceType: 'module', // 启用 ECMAScript 模块语法
    ecmaFeatures: {
      jsx: true, // 启用 JSX 语法支持
      impliedStrict: true, // 启用隐式严格模式
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended', // 启用 ESLint 推荐的规则
    'plugin:mdx/recommended', // 启用 MDX 推荐的规则
    'plugin:react/recommended', // 启用 React 推荐的规则
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // 启用 @typescript-eslint 推荐的规则
    'plugin:storybook/recommended',
    'prettier', // 放最后
  ],
  rules: {
    'react/display-name': 'off', // 关闭组件定义时必须写 displayName 规则
    'react/jsx-props-no-spreading': 'off', // 关闭禁止 JSX 属性展开规则
    "react/self-closing-comp": ["error"],
    'react/prop-types': 'off',
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // 使用 eslint-plugin-react 自动检测 React 的版本
    },
  },
};