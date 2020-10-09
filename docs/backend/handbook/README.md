# 后端开发工作手册

## 开发工具

### 科学上网

建议使用 Google 搜索作为常用搜索引擎

### markdown 文档

推荐使用 `vscode` 配合 [prettier 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 文档格式化用于 markdown 文档编写.

或者直接使用 `IDEA` 完成文档编写.

单独编写 markdown 文档建议使用 [typora](https://typora.io/).

[markdown 语法](https://www.jianshu.com/p/b03a8d7b1719)

### git 与 gitlab

[git 官方文档](https://git-scm.com/book/zh/v2)

[git 教程](https://backlog.com/git-tutorial/cn/)

### Terminal 命令行

推荐使用 git bash 替换 windows 自带命令行, 并集成至 IDE 中

[常用 Linux 命令](../../knowledge/linux/)

## 后端开发知识

后端开发以 [阿里巴巴 java 开发手册](https://github.com/alibaba/p3c/blob/master/阿里巴巴Java开发手册（泰山版）.pdf) 为基础, 任何未提到的开发标准以此为基础.

### 数据库

[Mysql 性能优化与规范](https://www.cnblogs.com/huchong/p/10219318.html)

### springBoot

[springBoot 官方文档](https://spring.io/projects/spring-boot)

[springBoot 百科全书](https://www.processon.com/view/5dabfcade4b0ea86c2b7c00e?fromnew=1#map)

### swagger 接口文档

[SpringFox 接口文档生成](http://springfox.github.io/springfox/)

### 消息队列

[spring AMQP](https://spring.io/projects/spring-amqp)

[AMQP MQTT 比较](https://signposs1.oss-cn-shenzhen.aliyuncs.com/docs/StormMQ_WhitePaper_-_A_Comparison_of_AMQP_and_MQTT.pdf)

[设备与服务端消息通讯方法](../amqp/)

### docker

[Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

### RESTful API

[Web API 设计指南](https://docs.microsoft.com/zh-cn/azure/architecture/best-practices/api-design)

[RESTful API 最佳实践](https://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

### CI/CD

[GitLab CI/CD](https://docs.gitlab.com/ee/ci/)

[GitLab CI/CD 配置管理](https://blog.51cto.com/flyfish225/2156602)

## 地理信息系统与地图理论

### GIS 与 webGIS

[地理信息系统](https://zh.wikipedia.org/wiki/地理信息系统)

[webGIS](http://enterprise.arcgis.com/zh-cn/server/latest/create-web-apps/windows/about-web-gis.htm)

### GeoJSON 格式

GeoJson 格式是常用的 web 端地理信息数据格式, 通常用于地理信息数据的绘制

[GeoJson 格式](https://www.oschina.net/translate/geojson-spec)

### PostGIS 插件

[PostGIS](https://postgis.net/) 是 `PostgreSQL` 数据库的空间数据库扩展. 它增加了对地理对象的支持, 允许在 SQL 中运行地理信息查询.
