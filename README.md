# 全新的项目

从 0 搭建一个现代化的项目工程。

## 开发

`pnpm i` 安装依赖
`pnpm start` 启动项目

`pnpm add xxx -w` 安装到根目录
`pnpm add xxx --filter @lib/xxx` 安装 xxx 到 @lib/xxx
`pnpm remove xxx` 移除依赖

## 选型

选择

- [x] react18
- [x] typescript
- 工具库
  - [x] lodash-es
  - [] axios 请求处理
  - [] dayjs 时间处理
- frame
  - [] loading
- antd
- 微前端

工程化

- [x] pnpm & pnpm workspaces。依赖管理安全、快。
- 页面
  - [x] 约定书路由 with react-router 6
  - [] 页面标题
- 样式管理
  - [ ] less
  - [ ] css module
  - [ ] tailwindcss
- [ ] svg icon
- 构建
  - [x] webpack5
  - [x] alias `'@': ./src/`
  - [ ] hot ?
  - [ ] webpack 内置到 app 里。
- 代码规范
  - [x] git-validator(eslint, prettier, husky, lint-staged, commitlint)
  - [] stylelint
- 配置文件
  - [x] .gitignore
  - [x] babel
- 文档
  - [x]storybook

## 目录

TODO

---

## tailwind

tailwindcss 本身
prettier-plugin-tailwindcss 调整处理 className 的顺序
