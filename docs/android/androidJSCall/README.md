# 1.8.0 机器人与 js 之间的调用文档

## android 调用 js 的方法

| 方法名                                | 说明                                   | 备注   |
| ------------------------------------- | -------------------------------------- | ------ |
| javascript:sleepCallBack()            | 回到首页                               |        |
| javascript:mainRead()                 | 给 JS 传递项目基础数据                 |        |
| javascript:sendMapGidResult()         | 把主屏点击按钮对应的 MapGid 发送给副屏 | 广告屏 |
| javascript:systemReset()              | 控制广告屏重新下载图片资源             | 广告屏 |
| javascript:loadData()                 | 给 JS 传送加密数据                     | 废弃   |
| javascript:connectionChangeReceiver() | 给 JS 发送当前网络状态                 | 废弃   |
| javascript:androidSearchPath()        | 给 JS 发送扫码枪扫码结果               |        |
| javascript:searchByVoice()            | 给 JS 发送语音识别结果                 |        |

## Js 调用 android 的方法

| 方法名                                       | 说明                                                        | 备注 |
| -------------------------------------------- | ----------------------------------------------------------- | ---- |
| window.jsCallAndroid.jsCallBack("")          | 给 JS 的 audio 初始化使用                                   |      |
| window.jsCallAndroid.wakeUpMicroPhone("");   | 唤醒语音识别使用方法                                        |      |
| window.jsCallAndroid.sleepCallBackSwitch("") | 模拟导航动画进行中 不允许返回首页                           |      |
| window.jsCallAndroid.sendToast("")           | js 错误信息提示                                             |      |
| window.jsCallAndroid.switchLanguage("")      | 机器人语言切换                                              |      |
| window.jsCallAndroid.sendMapGidResult("")    | 把主屏点击的按钮对应的 MipGid 保存起来,稍后发给副屏         |      |
| window.jsCallAndroid.systemReset("")         | 接收主屏发送给副屏的重新下载图片的命令,稍后把命令发送给副屏 |      |

## socket 的命令

| 方法名               | 说明           | 备注 |
| -------------------- | -------------- | ---- |
| updateResource       | 更新资源包     |      |
| clearCloseScreenInfo | 清除开关机数据 |      |
| closeScreen          | 更新资源包     |      |
| enterSetting         | 进入设置页面   |      |
