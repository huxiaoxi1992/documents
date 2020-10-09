# 智行智引 2.8.2app 文档说明

## 开发环境

1. 开发工具使用 android studio 3.0 以上, 目前使用 java 开发, 如需要简化开发也可使用 kotlin
2. 运行设备 rk3288 需要 android 6.0
3. rk3288 的 webview 版本最优为 webview 60.0.3112.116

## 资源远程仓库

```java
//设备与管理平台的通信方式
implementation ('io.socket:socket.io-client:1.0.0') {
        // excluding org.json which is provided by Android
        exclude group: 'org.json', module: 'json'
    }
//rxjava2.0
implementation 'io.reactivex.rxjava2:rxandroid:2.1.0'
implementation 'io.reactivex.rxjava2:rxjava:2.2.2'
//retrofit网络框架
implementation 'com.squareup.retrofit2:retrofit:2.7.1'
implementation 'com.squareup.retrofit2:converter-gson:2.6.2'
implementation 'com.squareup.retrofit2:adapter-rxjava2:2.3.0'
implementation 'com.squareup.okhttp3:logging-interceptor:4.0.0'
//列表
implementation 'com.android.support:recyclerview-v7:28.0.0'
```

## 原理说明

`智行智引`是一款运行在 `RK3288` 设备(以下简称为设备)上的室内 , 外 `2.0智行智引` 产品载体 , 每个产品对应一个产品类型 , 产品类型由管理平台设置对应的产品名称 ，`app` 内部使用 `webView`, 根据不同的产品类型来打开不同的产品页面 。 与 `1.0` 产品最大的区别就是 `app` 不在下载运行资源， 而通过 `web` 端自己去下载需要的资源 存到自己的 `db` 中 。

## 接口 API

baseUrl 为https://apiequipment.signp.cn/

```java
//认证设备
@FormUrlEncoded
@PUT("v2/equipment/valid")
@Headers("urlName:appBase")//多个baseUrl做区分用, 本身接口没有
Observable<ResponseBody> validDevice(
     @Query("token") String token,
     @Query("timestamp") String timestamp,
     @Field("code") String code,
     @Field("version") String version
);
```

```java
//认证设备返回值
{"type":"projection","software_version":"","software_url":"","software_size":""}
```

```java
//获取基础数据
@GET("v2/initialize")
@Headers("urlName:appBase")
@FormUrlEncoded
Observable<ResponseBody> getData(
   @Field("code")String code,//设备号
   @Field("version")String version,//app版本
   @Field("sign")String sign,//加密字段
   @Field("from")String from,//平台名称,固定值为android
   @Field("timestamp")String timestamp//时间戳单位秒
);
```

```java
//基础数据返回
//主要是返回后台的设备的配置, 运行资源的下载地址
{
	"errcode": "0",
	"errmsg": "操作成功",
	"data": {
		"type": "finder",
		"name": "王寺巷",
		"projectId": 60,
		"map_id": 622,
		"id": 622585,
		"map_gid": "622_",
		"rotate": 0,
		"point": "POINT(103.213495882037 35.5893718589856)",
		"backgroundImg": "",
		"video": "",
		"viewUrl": "https:\/\/project.signp.cn\/entrance\/main?s=JYVTzyuZMdzU2rS4HoLavZ6I6fUEJIvBXe0FNlC6t9I=&f=dn1UKCqwiFltOMWVLwR2NdmPDEem0vNgjyatAT2V\/3U=&tpl=21.5",
		"viewTimeout": 30,
		"touchable": 1,
		"screenNumber": 1,
		"videoRoundTimes": 1,
		"bind_eqs": "0",
		"distributor_id": "",
		"offlinePackage": {
			"url": "https:\/\/signposs1.oss-cn-shenzhen.aliyuncs.com\/upload\/offlinepackage\/fa206b45cc39dd263159fdb583bf351d.zip",
			"size": "10791962"
		},
		"infraredAreas": "",
		"size": {
			"infraredWidth": "",
			"infraredHeight": "",
			"screenWidth": "",
			"screenHeight": ""
		},
		"source_update": ""
	}
}
```

```java
//提交app版本
@POST("v2/version")
@Headers("urlName:appBase")
Observable<ResponseBody> versionCommit(
    @Query("code") String code,
    @Query("token") String token,
    @Query("timestamp") String timestamp,
    @Body RequestBody requestBody
);
```

```java
//提交app版本返回值
{"app":{"version":"2.8.2"},"devices":[{"type":"projection","version":"0.1.1"}]}
```

```java
//错误日志传到服务端
//如果上传失败(有可能当时没网)把本次报错存入文件夹内, 日志每隔2天检查上传一次, 上传后清除本地日志
@PUT("v2/feedback/error")
@FormUrlEncoded
Observable<ResponseBody> feedback(
   @Field("content")String content,//app错误内容
   @Field("projectID")String projectID,//项目id
   @Field("agent")String agent,//设备号
   @Query("timestamp") String timestamp
);
```

## socket 通信规范

```java
//socket连接事件
//在该事件下, 将登录参数发送给socket的server端
//其中projectId为项目id在getData()接口中可以获取到, code为设备号, 可以通过Build.SERIAL获取到
private Emitter.Listener onConnect = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            socketStateToast(Socket.EVENT_CONNECT);
            globalModel.mSocket.emit("login", projectId + "|equipment|" + code);
        }
};
```

```java
//自定义消息接收
//现在使用的就只有一个updateResource命令, 该命令是去获取一次最新的基础数据, 并重启app
private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            if (args[0] != null) {
                if (args.length >= 2) {
                    saveSuccessMessageFunction = args[1];//ack回执
                }
                canSendSuccessMessage = true;
                try {
                    JSONObject msg = new JSONObject(args[0].toString());
                    String cmd = msg.optString("cmd");
                    if (cmd.equals("updateResource")) {//认证或者更新资源
                        MainActivity.this.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                needRestart = true;
                                getData();
                            }
                        });
                    } else if (cmd.equals("clearCloseScreenInfo")) {
                        //清除开关机数据缓存
                        clearCloseScreenInfo();
                    } else if (cmd.equals("closeScreen")) {//定时开关机
                        initDarkAndLightScreenTime(args[0].toString(), false);//socket推送
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
       }
};
```

## android 与 JavaScript 的交互

```java
 //JS调用Android的所有方法
    public class jsCallAndroid {
        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.jsCallBack("");
         *  js的audio初始化
         *  @parm cmd  给js一个audio调用方法,以及回到web首页
         */
        public void jsCallBack(final String cmd) {
            currentSleep = 0;
            mapView.post(new Runnable() {
                @Override
                public void run() {
                    mapView.loadUrl(cmd);
                }
            });
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.wakeUpMicroPhone("");
         *  唤醒语音识别使用方法
         *  @parm recordState 录音机状态 当状态为0 表示在录音中  当状态为1时 表示录音结束
         */
        public void wakeUpMicroPhone(final String recordState) {
            MainActivity.this.recordStates = recordState;
            if (recordState.equals("0")) {
                startRecord();
            } else if (recordState.equals("1")) {
                stopRecord();
            } else if (recordState.equals("2")) {
                cancelRecognizer();
            }
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.sleepCallBackSwitch("");
         * 模拟导航动画进行中 不允许返回首页
         * @parm state 当状态为0时 表示导航动画在进行中 当状态为1时 表示动画执行完毕
         */
        public void sleepCallBackSwitch(String state) {
            MainActivity.this.stateLock = state;
            if (state.equals("0")) {
                currentSleep = 0;//表示运行
            }
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.sendToast("","");
         * 错误信息提示
         * @param result 错误内容
         * @param duration 持续时间
         */
        public void sendToast(String result, int duration) {
            Toast.makeText(MainActivity.this, result, duration).show();
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.switchLanguage("");
         * 机器人语言切换
         * @param language 语言类型 en_US 英文  zh_CN 中文
         */
        public void switchLanguage(String language) {
            languageEnvironment = language;
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.sendMapGidResult("");
         * 蓝牙接收mapGid
         * @param targetMapGid
         */
        public void sendMapGidResult(String targetMapGid, String name) {
            String callJs = "javascript:sendMapGidResult('" + targetMapGid + "','" + name + "')";
            LogUtil.logE(TAG, "callJs-->" + callJs);
            mPresentation.updateInfo(callJs, false);//地图
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.updateWebInputState("");
         * webStartInput webEndInput
         * web端页面输入框与扫码枪输入框做兼容处理,web端输入框聚焦时,扫码枪输入框禁用
         * @param result 错误内容
         * @param duration 持续时间
         */
        public void updateWebInputState(String state) {
            MainActivity.this.webInputState = state;
            if (state.equals(Constant.WEB_START_INPUT)) {
                editText.setEnabled(false);
                editText.setFocusable(false);
            } else if (state.equals(Constant.WEB_END_INPUT)) {
                editText.setEnabled(true);
                editText.setFocusable(true);
                editText.requestFocus();
            }
        }


        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.systemReset();
         * 广告屏更新图片重启
         */
        public void systemReset() {
            String callJs = "javascript:systemReset()";
            mPresentation.updateInfo(callJs, true);//重新刷新副屏页面
        }

        @JavascriptInterface
        /**
         * @parm mode  deleteDir 删除所有 deleteFile 部分删除
         * js调用规则 window.jsCallAndroid.clearCache("deleteDir");
         * 删除浏览器缓存
         */
        public boolean clearCache(String mode) {
            boolean isDeleteCache = false;
            if (mode.equals(Constant.DELETE_DIR)) {
                isDeleteCache = FileUtils.deleteDir(MainActivity.this.getCacheDir());
            } else {//默认删除file
                isDeleteCache = FileUtils.deleteFile(MainActivity.this.getCacheDir());
            }
            LogUtil.logE(TAG, "isDelete-->" + isDeleteCache);
            if (isDeleteCache) {
                Toast.makeText(MainActivity.this, "清除缓存成功", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(MainActivity.this, "清除缓存失败", Toast.LENGTH_SHORT).show();
            }
            return isDeleteCache;
        }

        @JavascriptInterface
        /**
         * js调用规则 window.jsCallAndroid.clearIndexDb();
         * 删除indexDb
         */
        public boolean clearIndexDb() {
            String indexPath = "/data/data/" + MainActivity.this.getPackageName() + "/app_webview/";
            boolean isDeleteIndexDb = FileUtils.deleteDir(new File(indexPath));
            if (isDeleteIndexDb) {
                Toast.makeText(MainActivity.this, "清除indexDb文件成功", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(MainActivity.this, "清除indexDb文件失败", Toast.LENGTH_SHORT).show();
            }
            LogUtil.logE(TAG, "isDeleteIndexDb-->" + isDeleteIndexDb);
            return isDeleteIndexDb;
        }
    }
```

## 核心方法

### `由于代码篇幅过大, 介绍方法时, 只截取重要逻辑进行展示分析`

### com.vguang.vbarlib.MainActivity ( app 首页)

1. 方法 beforeInitView()

   ```java
   //主要做一些初始化的设置和参数读取
   private void beforeInitView() {
       //获取app版本, 取值为packageInfo.versionName
       getVersion();
      	//日志上传timer
       crashTimer.schedule(new CrashTimerTask(),0,24*2*3600);
       //网络状态变化广播注册
       netWorkChangeReceiver = new NetWorkChangeReceiver();
        //启动app状态检查服务
       Intent intent = new Intent(this, AppAliveCheckService.class);
       startService(intent);
       //中间省略了部分代码
       registerReceiver(netWorkChangeReceiver, filter);
       initPopupWindow();//初始化弹窗, 主要用来触发显示下面的ControlChoiceWindow
       initControlChoiceWindow();//其中有3个按钮, 重启设备, 重启app, 进入设置3个按钮
   }
   ```

2. 方法 validDevice()

   ```java
   //认证设备
   private void validDevice() {
       //调用上面接口API的validDevice()
      //此方法返回了 app 的版本和大小,可以做是否升级判断
       //主要根据线上 app 的 version 和当前运行 app 的 version ,比较,如果不同就升级下载
    	checkAppVersion(softwareVersion);
   }
   ```

3. 方法 checkAppVersion()

   ```java
   //检查app是否需要升级
   private void checkAppVersion() {
       if (TextUtils.isEmpty(apkUrl)) {//后台关闭自动更新
               tv.setText(R.string.onGetBasicData);
               //管理后台关闭了更新
               tv.postDelayed(this::getData, TEXT_SHOW_DELAY);
           } else {//后台开启了自动更新
               if (!version.equals(globalModel.version)) {//验证最新apk下载地址以及大小的合法性
                   if (localUpdateFileExist(version)) {
                       showUpdateBtns();//本地存在最新安装包
                   } else {
                       downloadApkPackage(apkUrl);//验证通过,下载apk
                   }
               } else {
                   tv.setText(R.string.onGetBasicData);
                   hideUpdateBtns();
                   //管理后台开启了更新, 但当前版本就是最新版本
                   tv.postDelayed(this::getData, TEXT_SHOW_DELAY);
               }
           }
   }
   ```

4. 方法 getData()

   ```java
   //获取基础数据,运行时的资源
   private void getData() {
       //调用上面接口API的getData()
       //保存接口获取的result数据到SharedPreference
       //开启webSocket()
       openWebSocket();
       initRunningEnvironment(wholeJson);//基础数据下载保存完毕 初始运行环境
       //然后可以打开首页了
   }
   ```

5. 根据产品的类型, 拼接对应产品的加载地址

```java
 //获取主屏加载的url
    private String getUrl() {
        String currentProjectType;//当前设备类型
        switch (globalModel.type) {
            case TYPE_INFO_WITH_FINDER: //指路信息屏类型 1个屏
                currentProjectType = TYPE_INFO_WITH_FINDER;
                break;
            case TYPE_GUIDER:
            case TYPE_INFO_AND_GUIDER:
                currentProjectType = TYPE_GUIDER;//导览屏
                break;
            case TYPE_PROJECTION: //投影屏
                currentProjectType = TYPE_PROJECTION;//投影屏
                break;
            case TYPE_SHOW: //展示屏
                currentProjectType = TYPE_SHOW;//导览屏
                break;
            case TYPE_INDEX_MAIN:
                currentProjectType = TYPE_INDEX_MAIN;//主屏索引
                break;
            case TYPE_INFO_MAIN:
                currentProjectType = TYPE_INFO_MAIN;//主屏信息
                break;
            default:
                currentProjectType = TYPE_FINDER;//指路仪
                break;
        }
        if (DEBUG_MODE) {
            url = getRuntimeUrl(currentProjectType, MODE_TEST);
        } else {
            url = getRuntimeUrl(currentProjectType, MODE_DIST);
        }
        return url;
    }

    /**
     * @param mode        模式
     * @param ProjectType
     * @return
     */
    private String getRuntimeUrl(String ProjectType, String mode) {
        return Constant.FIRST_URL_CONTENT + globalModel.projectId + File.separator
                + ProjectType + File.separator + mode + Constant.LAST_URL_CONTENT;
    }

```

6. 根据产品类型 , 如果产品有副屏 , 则去生成对应的地址

```java
 /**
     * 开启副屏首页
     */
    private void openSubScreenMainPage(boolean needRotate) {
        String callJs = "javascript:mainRead('" + wholeJson + "')";
        String url;
        String type = "errorType";
        if (globalModel.type.equals(TYPE_INFO_FINDER) || globalModel.type.equals(TYPE_INFO)) {
            type = TYPE_INFO;
        } else if (globalModel.type.equals(TYPE_INDEX) || globalModel.type.equals(TYPE_INDEX_AND_FINDER)) {
            type = TYPE_INDEX;
        }
        if (DEBUG_MODE) {
            url = getRuntimeUrl(type, MODE_TEST);
        } else {
            url = getRuntimeUrl(type, MODE_DIST);
        }
        LogUtil.logE("runTimeURL", "副屏url-->" + url);
        mPresentation.openSubMainPage(url, callJs, sleep, needRotate);
    }
// mPresentation 这个是基于 hdmi 加载的 android 的其他页面 , 它继承 Presentation 是 android 做多屏展
//示的类
```

### com.vguang.vbarlib.CrashHandler(全局错误捕获)

1. 方法 collectErrorInfo(Context ctx,Throwable ex)

   ```java
   //搜集错误日志
   private void collectErrorInfo(Context ctx,Throwable ex) {
       //搜集设备的相关信息和报错信息
   }
   ```

2. 方法 saveCrashInfoToFile()

   ```java
   //把上面搜集好的数据以字符串形式存放到指定目录
   private String saveCrashInfoToFile() {
       //主要是文件的存放工作
   }
   ```

3. 方法 sendErrorNetWork(`boolean isRestart,ArrayList<BasicNameValuePartner> dataArr`)

   ```java
   //把错误日志上传到服务器
   private void sendErrorNetWork(boolean isRestart){
       //调用上面接口API的feedback()
   }
   ```

## 设备维护思路

### `由于代码都是常规的逻辑, 这里不做展示了, 只说明原理`

1. 在 MainActivity 中, 在没有进入 web 端的第一个页面时, 可以点击右下角区域, 在 1 秒内连点 3 次, 然后进入第 3 步的逻辑

2. 在进入 web 端页面后, 可以先长按屏幕任何位置 5 秒或者以上, 然后 1 秒内连续点击屏幕 3 次, 然后进入第 3 步的逻辑

3. 弹出输入密码的弹窗, 输入解锁密码后, 显示功能弹窗, 功能弹窗内有 3 个功能 (1) 重启设备 (2) 进入设置 (3) 重启 app , 点击时,分别进行设备重启, 进入设备设置页面, 以及 app 的重启

4. 在上面的操作中如果操作超时了, 需要重新从头解锁
