# utools_gitmoji

uTools gitmoji 插件

数据来自 [gitmoji](https://gitmoji.dev/)

## 使用插件

utools 插件应用市场搜索 `gitmoji`

由于插件市场存在相同功能但已经停止更新的插件，请使用全名搜索

### 如何使用

- 提交前打开插件，搜索想要添加的表情
- 按 `Enter` 或 鼠标左键点击复制
- 粘贴到 commit 信息处提交

效果参考本项目的提交记录

### 按键说明

- 键盘上下箭头切换
- 按 `Tab` 切换下一条，`Shift + Tab` 切换上一条
- 按 `Enter` 或 鼠标左键 复制

## 关于插件类型

- plugin 基于 vite + preact + tailwindcss 的插件，支持关键词高亮，插件功能设置
- template_plugin 基于 utools 模板插件开发，不支持关键词高亮，已废弃

由于 `utools template` 限制，部分功能无法实现，因此不再更新 `template` 插件

支持拼音搜索、中英文搜索

中文翻译可能不太对，欢迎提 issues 或 pr

## 关于打包

``` bash
> cd plugin

> yarn build:no_check
```

## 版权说明

代码仅供个人学习，请勿用于商业用途
