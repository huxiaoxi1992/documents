# 后端开发配置

## 操作系统

本地开发要求使用 `windows 10` 专业版或企业版作为操作系统.

推荐使用 `Windows 10 LTSC 1809` 作为操作系统, 此版本为纯净版本, 无其他无用内置程序.

或者使用 `Windows 10 2004` 及以上版本配合 `wsl2` 进行多系统的开发.

## 开发工具

| 适用性   | 名称                                                                                                                 | 备注                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **必须** | [V2RayN](https://github.com/2dust/v2rayN/releases)                                                                   | 科学上网                                        |
| **必须** | JDK 1.8, 建议使用 [Amazon Corretto 8](https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html) | JDK 与环境变量配置                              |
| **必须** | [git](https://git-scm.com/)                                                                                          | 版本管理                                        |
| **必须** | IDEA                                                                                                                 | 主力 IDE                                        |
| **必须** | maven                                                                                                                | 使用 IDEA 自带 maven, 配置阿里云 maven 中央仓库 |
| **必须** | [docker](https://docs.docker.com/docker-for-windows/install/)                                                        | 容器服务                                        |
| **必须** | MySQL                                                                                                                | 推荐使用 docker 容器进行安装                    |
| **必须** | navicat                                                                                                              | 数据库管理工具                                  |
| **必须** | MindManager                                                                                                          | 思维导图                                        |
| **必须** | xshell, xftp                                                                                                         | 远程连接工具与上传工具                          |
| **必须** | [公司开发工具包](https://o.signp.cn/application/橙立科技工具包-安装包.exe)                                           | 公司管理后台地址链接与文档                      |

## IDEA 插件与配置

| 适用性   | 插件名称                       | 介绍                         |
| -------- | ------------------------------ | ---------------------------- |
| **必须** | lombok                         | 常用注解方便开发             |
| **必须** | alibaba java coding guidelines | 阿里巴巴代码标准检查         |
| **必须** | sonarlint                      | 用于针对需要进行代码标准检查 |

## git 配置与使用

### 公司 GitLab 地址

[https://gitlab.com/signp](https://gitlab.com/signp)

### ssh key 生成方法

```bash
#在本地查看email地址
$ git config --list
#如果没有，需要运行
$ git config --global user.name test123
$ git config --global user.email test123@qq.com
#在本地根目录生成公钥:
$ cd
$ ssh-keygen -t rsa -C test123@qq.com
```

复制生成的公钥至服务器中 `~/.ssh/authorized_keys`

### 使用前须知

1. 注册 gitlab 账号
1. 发送 gitlab 账号绑定的邮箱给管理员, 加入公司项目组
1. 复制本地 ssh key 至 gitlab 账号中
   ![ssh](../../frontend/config/ssh.png)
1. git clone 代码仓库至本地
   ![git clone](../../frontend/config/clone.png)

如上图所示, 复制项目 git ssh 地址, 在项目目录下打开命令行, 输入

`git clone git@gitlab.com:singp/project`

## docker 配置

[docker 安装教程](https://docs.docker.com/docker-for-windows/install/)

[docker 学习视频](http://192.168.1.228:9999/lib/1e74c57b-62e4-4424-9b72-44bf0a05e238/file/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91/Basics%20of%20Docker.zip)
