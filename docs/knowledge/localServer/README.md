# 本地服务器 IP 变更配置

## 本地服务器 IP

```bash
# 修改网络配置文件, 最后一个文件根据网卡配置调整
$ vim /etc/sysconfig/network-scripts/ifcfg-enp2s0
# 修改文件中 IPADDR, GATEWAY, NETMASK, DNS1, DNS2 配置, 保存, 重启服务器
$ reboot
```

## seafile

seahub 服务通过 `seahub_settings.py` 文件进行配置, 此服务用于文件下载

```bash
$ vim /opt/seafile-data/seafile/conf/seahub_settings.py
# 修改 ONLYOFFICE_APIJS_URL, FILE_SERVER_ROOT 配置, 保存文件
```

seafile 服务通过 `docker-compose` 文件进行配置部署, 此服务用于文件浏览

```bash
# 切换到 seafile 配置目录
$ cd /root/seafile
# 修改 docker-compose 文件
$ vim ./docker-compose.yml
# 修改 SEAFILE_SERVER_HOSTNAME 配置, 保存, 重启 docker 服务
$ docker-compose up -d --build
```

## gitlab(使用官方 gitLab 服务, 本地配置废弃)

gitlab 服务通过 `docker-compose` 文件进行配置部署

```bash
# 切换到 gitlab 配置目录
$ cd /root/gitlab
# 修改 docker-compose 文件
$ vim ./docker-compose.yml
# 修改 hostname, external_url 配置, 保存, 重启 docker 服务
$ docker-compose up -d --build
```

## gitlab-runner(使用官方 gitLab-runner, 本地配置废弃)

```bash
# 查看 runner 列表配置
$ gitlab-runner list
# 根据列表提供的配置文件路径修改配置文件
$ vim /etc/gitlab-runner/config.toml
# 检查服务运行状况
$ gitlab-runner verify
```
