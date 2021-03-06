---
title: 橙立科技前端工作手册
---

## 推荐工具与索引

[开发文档手册速查](https://devdocs.io/)

[印记中文 - 前端开发文档索引](https://www.docschina.org)

[BootCDN](https://www.bootcdn.cn/all/)

## 开发工具

### 科学上网

建议使用 Google 搜索作为常用搜索引擎

### markdown 文档

推荐使用 `vscode` 用于 markdown 文档编写, 配合 [prettier 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 用于文档格式化

[markdown 语法](https://www.jianshu.com/p/b03a8d7b1719)

<!-- [技术文档写作规范](../../common/docStyleGuide/)

[技术测试报告写作规范](../../common/testDocGuide/) -->

### Git

[Git 官方文档](https://git-scm.com/book/zh/v2)

[Git 教程](https://backlog.com/git-tutorial/cn/)

### Terminal 命令行

推荐使用 `git bash` 替换 windows 自带命令行, 并集成至编辑器中

[常用 Linux 命令](../../knowledge/linux/)

### Chrome 开发者工具

[Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn)

[Android 设备的桌面端调试](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/?hl=zh-cn)

## 前端知识

### JavaScript 基础

[现代 Javascript 教程](https://zh.javascript.info/)

### ES6 语法

[ECMAScript 6 入门](http://es6.ruanyifeng.com/)

### Promise 与异步函数

[JavaScript Promise 简介](https://developers.google.com/web/fundamentals/primers/promises?hl=zh-cn)

[异步函数 - 提高 Promise 的易用性](https://developers.google.com/web/fundamentals/primers/async-functions?hl=zh-cn)

### CSS 预处理器与 Sass

[Sass 指南](https://github.com/W3cplus/sass-guidelines)

### flex 布局

Flexible Box 模型，通常被称为 [flexBox 布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)，是一种一维的布局模型。它给 flexBox 的子元素之间提供了强大的空间分布和对齐能力。

[flexBox 示例](https://yoksel.github.io/flex-cheatsheet)

### yarn 包管理器

[yarn 包管理器](https://yarnpkg.com/zh-Hans/) 是一个快速、可靠、安全的依赖管理。

### IndexedDB

[IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 是一种低级 API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该 API 使用索引来实现对该数据的高性能搜索

在`数据量不大`的情况, 一般使用 [localForage](http://localforage.docschina.org/) 简化 indexedDB 操作. 对于需要大量数据储存(`>100MB`)的前端存储, 最好使用原生 indexedDB API, localForage 存在单个键值对最大容量限制(128M)

### eslint 规范

ESLint - 可组装的 JavaScript 检查工具

项目一般使用 `airbnb` + `eslint-plugin-vue` + `eslint-plugin-prettier` 作为格式要求

[Airbnb eslint config](https://github.com/lin-123/javascript)

[Vue 风格指南](https://cn.vuejs.org/v2/style-guide/)

[prettier 配置选项](https://prettier.io/docs/en/options.html)

### mock.js 接口模拟

Mock.js - 生成随机数据，拦截 Ajax 请求

[mock.js](http://mockjs.com/)

项目使用[本地搭建的 RAP2 服务](http://192.168.1.228:3000/) 作为前后端`同步开发`的接口文档, 其中 `RAP2` 使用 `MockJs` 作为模拟数据的生成依赖, 相关的随机值生成方法参考 `MockJs` 文档.

> 后端接口搭建完成后, 将使用后端生成的 `swagger doc` 用于最终标准的接口文档.

[RAP2](https://github.com/thx/rap2-delos)

### vue 全家桶

[Vue.js](https://cn.vuejs.org/v2/guide/)

[Vue CLI](https://cli.vuejs.org/zh/)

[Vue Router](https://router.vuejs.org/zh/)

[Vuex](https://vuex.vuejs.org/zh/)

[Vue 资源](https://github.com/vuejs/awesome-vue)

### react 全家桶(了解)

[react](https://react.docschina.org/)

[Create React App](https://facebook.github.io/create-react-app/docs/getting-started)

[react router](https://reacttraining.com/react-router/web/guides/quick-start)

[redux](https://cn.redux.js.org/)

[The React Handbook](https://medium.freecodecamp.org/the-react-handbook-b71c27b0a795) (推荐阅读)

[antd](https://ant-design.gitee.io/index-cn)

### service worker (了解)

[Service Worker](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn) 是浏览器在后台独立于网页运行的脚本，它可以用于增强页面的离线功能，详细 API 见 [Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

[Workbox](https://developers.google.com/web/tools/workbox/) 是谷歌开发的 Service Worker 工具, 通常使用 [Workbox-webpack-plugin](https://webpack.docschina.org/guides/progressive-web-application/) 与现有配置整合打包

### 性能优化(强烈建议完整阅读)

谷歌推荐的 web 开发性能优化方法 [Web Fundamentals performance](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)

## 地理信息系统与地图理论

### GIS 与 webGIS

[地理信息系统](https://zh.wikipedia.org/wiki/地理信息系统)

[webGIS](http://enterprise.arcgis.com/zh-cn/server/latest/create-web-apps/windows/about-web-gis.htm)

[GIS 与数据图形基础](https://signposs1.oss-cn-shenzhen.aliyuncs.com/docs/GIS%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%9B%BE%E5%BD%A2%E5%9F%BA%E7%A1%80.pdf)

### GeoJSON 格式

[GeoJson 格式](https://www.oschina.net/translate/geojson-spec) 是常用的 web 端地理信息数据格式, 通常用于地理信息数据的绘制

### Mapbox-gl

Mapbox-gl 是一个使用 webGL 用于地图绘制的库, 主要包括地图控制与地图样式绘制两个部分

[Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/api/)

[样式配置手册](https://docs.mapbox.com/mapbox-gl-js/style-spec/)

具体的样式操作与地图编辑可以使用 [mapbox-style-editor](https://signposs1.oss-cn-shenzhen.aliyuncs.com/test/mapbox-style-editor-master.zip) 进行练习

### Turf.js (了解)

[Turf.js](https://github.com/Turfjs/turf) 是一个地理信息数据分析处理库, 可以借鉴相应的地理信息算法
