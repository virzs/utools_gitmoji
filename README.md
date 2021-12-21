# utools_gitmoji

uTools gitmoji 插件

数据来自 [gitmoji](https://gitmoji.dev/)

## 关于插件类型

- plugin 基于 vite + preact + tailwindcss 的插件，支持关键词高亮，但可能在某些设备上没有模板插件稳定
- template_plugin 基于 utools 模板插件开发，不支持关键词高亮

支持拼音搜索、中英文搜索

中文翻译可能不太对，欢迎提 issues 或 pr

## 关于打包

``` bash
> cd plugin

> yarn build:no_check
```

`build` 文件在 `plugin/dist` 中

复制 `logo.png`、`plugin.json` 文件到 `dist` 文件夹

将 `plugin.json` 中 `main` 修改为 `index.html`
