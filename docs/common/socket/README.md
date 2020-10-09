# socket 协议规范与功能标准

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。WebSocket 通信协议于 2011 年被 IETF 定为标准 RFC 6455，并由 RFC7936 补充规范。WebSocket API 也被 W3C 定为标准。

WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

## 应用场景与分类

产品使用 WebSocket 协议用作服务端与客户端产品信息推送, 包括远程操作指令, 热门, 个性化, 紧急疏散等消息推送等功能.

socket 信息命令仅通过安卓端进行接受, 并转发给 webView, webView 针对不同命令进行处理

## 功能与事件定义

### socket 地址

```
https://socket1.signp.cn
```

### 向服务器发送事件

#### 登录

登录事件由客户端向服务端发起, 用于在建立连接后标识关联设备, 以便于对指定设备进行消息推送

| 分类      | 参数                                        | 说明                       |
| --------- | ------------------------------------------- | -------------------------- |
| method    | emit                                        | 向服务器发送事件           |
| eventName | `login`                                     | 登录事件                   |
| content   | `projectID + '|equipment|' + equipmentCode` | 项目号+硬件设备类别+设备号 |

### 响应服务器事件

客户端只对服务器事件 `new_msg` 事件进行响应, 所有命令操作均对事件传入的内容(content)进行响应, 传入的内容与事件名称均为`JSON 字符串`格式

| 分类      | 参数      | 说明           |
| --------- | --------- | -------------- |
| method    | on        | 响应服务器事件 |
| eventName | `new_msg` | 服务器事件     |

#### 更新 app 资源

更新 APP 资源事件用于远程操作 APP 进行资源更新, 此命令在`安卓端`处理

```json
{
  "cmd": "updateResource";
}
```

#### 热门点位消息

更新热门指引信息

```json
{
  "cmd": "updateKeywords", // 指令名称
  "keywords": [
    {
      "click": 3, // 点击次数
      "endTime": 1556081860, // 显示时间
      "map_gid": "1255_7", // 点位编号
      "name": "感染性疾病楼（发热门诊、肠道门诊）" // 点位名称
    },
    {
      //...
    }
  ]
}
```

#### 个性指引更新

推送一条个性化指引点位信息

```json
{
  "cmd": "updateMessage",
  "map_gid": "1255_7",
  "from_map_gid": "1256_1" // 消息来源点位
}
```

#### 手机蓝牙信息推送

手机蓝牙信息推送, 互动指路屏跳转至对应点位, 信息屏增加至个性化指引数据

```json
{
  "cmd": "mobileRoute",
  "map_gid": "1255|1255_7" // 楼层编号|点位编号
}
```

#### 进入紧急疏散状态

远程控制设备进入紧急疏散状态, 禁用所有屏幕操作与显示, 只对逃生路线显示箭头方向

```json
{
  "cmd": "evacuate",
  "content": "紧急状况, 请及时处理" // 疏散消息通知条文字
}
```

#### 退出紧急疏散状态

远程控制设备退出紧急疏散状态, 恢复正常操作

```json
{
  "cmd": "exevacuate",
  "content": "紧急状况, 请及时处理"
}
```

#### 更新 service worker

- 说明 :
- 推送的数据 :

```json
{
  "cmd": "updateSW"
}
```

#### 显示消息通知条

```json
{
  "cmd": "notice",
  "content": "测试数据显示", // 消息正文
  "timeout": 10000 // 显示时长, 未设置永久显示
}
```