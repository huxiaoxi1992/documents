# 指路机器人综合开发说明

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
// httpServer 用于共享运行资源给浏览器 Webview
implementation 'org.nanohttpd:nanohttpd-webserver:2.3.1'
//列表view
implementation 'com.android.support:recyclerview-v7:27.1.1'
//json解析类
implementation 'com.google.code.gson:gson:2.8.5'
//需要的百度语音的 jar 这里.so文件没有列举出来 需要去下载对应版本的.so文件
implementation files('src/main/jniLibs/bdasr_V3_20180320_9066860.jar')
```

## 原理说明

指路机器人是一款运行在 RK3288 设备(以下简称为设备)上的室内, 外地图导航软件, 通过 webView 展示自定义 mapbox 地图. 通过管理平台对设备进行认证, 资源上传后, 通过指路机器人 1.8.9app (以下简称 app ), 进行资源下载, 并存放在 sdcard 里面的相应文件下 , 在 app 内部使用 NanoHTTPD 开启一个本地 server , 通过 server 映射运行资源路径, 给 webView 使用, 使它能拿到渲染地图的数据

## 接口 API

baseUrl 为https://apiequipment.signp.cn/

```java
//认证设备
@FormUrlEncoded
@POST("valid")
Observable<ResponseBody> validDevice(
   @Field("sign")String sign, //加密字段
   @Field("from")String from, //平台名称,固定值为android
   @Field("timestamp")String timestamp,//时间戳单位秒
   @Field("code")String code,//设备号
);
```

```java
//认证设备返回值
//返回值的errcode为0才为认证通过, 其余需要去后台认证
{"errcode":"0","errmsg":"操作成功","data":""}
```

```java
//app升级检查
@FormUrlEncoded
@POST("version")
Observable<ResponseBody> newCheckUpdateInfo(
   @Field("sign")String sign, //加密字段
   @Field("from")String from, //平台名称,固定值为android
   @Field("timestamp")String timestamp,//时间戳单位秒
   @Field("code")String code,//设备号
);
```

```java
//app升级检查返回值
//先看url字段和size字段是否不为空, 为空的话无需更新app, 是因为后台没有打开设备的升级功能
//如果url和size字段都不为空, 看var字段, 它代表线上最新app版本, 和当前运行app的version进行比较
//如果线上的var和运行app的version不一致, 去url的连接下载最新app
{
	"errcode": "0",
	"errmsg": "操作成功",
	"data": {
		"ver": "1.8.9",
		"url": "",
		"size": 0
	}
}
```

```java
//获取基础数据
@POST("initialize/v122")
@FormUrlEncoded
Observable<ResponseBody> getData(
   @Field("code")String code,//设备号
   @Field("version")String version,//app版本
   @Field("sign")String sign,//加密字段
   @Field("from")String from,//平台名称,固定值为android
   @Field("timestamp")String timestamp//时间戳单位秒
);
```

```json
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
    "viewUrl": "https://project.signp.cn/entrance/main?s=JYVTzyuZMdzU2rS4HoLavZ6I6fUEJIvBXe0FNlC6t9I=&f=dn1UKCqwiFltOMWVLwR2NdmPDEem0vNgjyatAT2V/3U=&tpl=21.5",
    "viewTimeout": 30,
    "touchable": 1,
    "screenNumber": 1,
    "videoRoundTimes": 1,
    "bind_eqs": "0",
    "distributor_id": "",
    "offlinePackage": {
      "url": "https://signposs1.oss-cn-shenzhen.aliyuncs.com/upload/offlinepackage/fa206b45cc39dd263159fdb583bf351d.zip",
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
//错误日志传到服务端
//这个的baseUrl: https://apis.signp.cn/
//如果上传失败(有可能当时没网)把本次报错存入文件夹内, 日志每隔2天检查上传一次, 上传后清除本地日志
@POST("feedback/error")
@FormUrlEncoded
Observable<ResponseBody> sendErrorNetWork(
   @Field("content")String content,//app错误内容
   @Field("projectID")String projectID,//项目id
   @Field("agent")String agent,//设备号
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

> 由于代码篇幅过大, 介绍方法时, 只截取重要逻辑进行展示分析

### com.vguang.vbarlib.HttpServer (开启 httpServe r 的类)

1. 方法 responseCourseStream(IHTTPSession session)

```java
//对运行资源目录文件进行返回
public Response responseCourseStream(IHTTPSession session) {
        String uri = session.getUri();
        String mime = getMimeTypeForFile(uri);
        uri = uri.substring(1);
        try {
            FileInputStream is = new FileInputStream(Environment.getExternalStorageDirectory() + rootFile+"html/" + uri);
            return newChunkedResponse(Response.Status.OK, mime, is);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newFixedLengthResponse("404");
    }
```

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
       //中间省略了部分代码
       registerReceiver(netWorkChangeReceiver, filter);
       initPopupWindow();//初始化弹窗, 主要用来触发显示下面的ControlChoiceWindow
       initControlChoiceWindow();//其中有3个按钮, 重启设备, 重启app, 进入设置3个按钮
   }
   ```

2. 方法 checkFiles()

   ```java
   //检查是否有多余资源
   //存放运行资源的目录使用了加密的zip名称, 保证了每一次下载的文件的唯一性
   //新旧资源存放目录不一样, 我们可以根据最新的zip的名称对旧资源文件进行删除
   private void checkFiles() {
       //新旧资源的zip名称存放在SharedPreferences下使用不同的key来存放
       SharedPreferences sp = MainActivity.this.getSharedPreferences(key, MODE_PRIVATE);
       String newOfflineData = sp.getString("newOfflineData", "");
       String oldOfflineData = sp.getString("oldOfflineData", "");
       //根据名称去删除对应不需要的文件夹的数据
       //旧文件删除后, 清除SharedPreferences的所有值,把新文件的value存入旧的key中
        editor.clear().commit();
        editor.putString("oldOfflineData", newOfflineData).commit();
       //此处省略了文件删除的逻辑
   }
   ```

3. 方法 validDevice()

   ```java
   //认证设备
   private void validDevice() {
       //调用上面接口API的validDevice()
       if (result.getString(Constant.ERROR_CODE).equals(Constant.SUCCESS_CODE)) {
           //认证成功
           newCheckUpdateInfo();//检查app是否需要升级
       }
       //如果数据返回存在问题, 也就是result获取错误
       //此处省略了代码
       //运行本地资源
       runFromLocalData();
   }
   ```

4. 方法 newCheckUpdateInfo()

   ```java
   //检查app是否需要升级
   private void newCheckUpdateInfo() {
       //调用上面的接口API的newCheckUpdateInfo()
       //后台关闭自动更新
       if (TextUtils.isEmpty(apkUrl) && size == 0) {
           getData();//后台关闭了升级操作, 获取基础数据
       }
     	//验证最新apk大小 下载地址的合法性
       if (!TextUtils.isEmpty(apkUrl) && size != 0) {
           if(globalModel.newVersion.equals(globalModel.version)){
               //判断本地是否下载最新的app
               if (localUpdateFileExist()) {
                   //静默安装apk
                   //通过命令 "pm install -r " + apkFile.getAbsolutePath()实现
                   installAuto(apkPath);
               }else{
                   //下载最新apk
                  downloadApkPackage(data.getString(Constant.OFFLINE_RESOURCE_URL));
                   //下载完成, 最后会调用
                   //省略了app下载逻辑
                   //通过命令 "pm install -r " + apkFile.getAbsolutePath()
                   installAuto(apkPath);
               }
           }
       }

   }
   ```

5. 方法 getData()

   ```java
   //获取基础数据,运行时的资源
   private void getData() {
       //调用上面接口API的getData()
       //保存接口获取的result数据到SharedPreferences
       //旧资源不为空
       //此处省略对各种运行变量进行赋值, 如projectId,rotate等等
       if (!TextUtils.isEmpty(oldOfflineData)) {
           //线上资源不为空且和本地的不一样 说明需要去下载新资源
            if (!TextUtils.isEmpty(onlineResource) && !globalModel.oldOfflineZipFileName.equals(onlineResource)) {
           	//把线上最新的result存到key为"newOfflineData"的SharedPreferences中
            }
           //线上资源和本地一样,无需更新
           else if (!TextUtils.isEmpty(onlineResource) && globalModel.oldOfflineZipFileName.equals(onlineResource)) {
                if (isMapPointChange) {//设备绑定点位有变化需要重新存储result
                    //把线上最新的result存到key为"oldOfflineData"的SharedPreferences中
                }
            }
       }else{//就资源目录为空, app第一次进入需要下载
           //把线上最新的result存到key为"oldOfflineData"的SharedPreferences中
       }
       //开启webSocket()
       openWebSocket();
       //检查本地资源包的完整性
       checkRes(newOfflinePackageObj);
   }
   ```

6. 方法 checkRes(JSONObject zipFileJson)

   ```java
   //检查本地zip资源是否存在
   private void checkRes(JSONObject zipFileJson) {
       if (zipFile.exists()) {
          	//本地zip的大小和接口返回的zip大小一直, 说明zip包完整
           if (fileInputStream.available() == fileSize) {
               isZipResourceComplete = true;
           }
           //判断里面的html文件夹是否存在
           if (!htmlFile.exists()) {//index.html文件不存在
               //删除html文件夹下所有内容, 重新创建html文件夹
               if (isZipResourceComplete) {
                   //本地zip包完整,解压zip
                   unZipTimer = new Timer();
                   unZipTimer.schedule(new UnzipTimerTask(), 500);
                   //解压完成无误后, 开启httpServer
                   startHttpServer();
                   //此处省略了中间代码, 进入首页
                   if (httpServer.isAlive()) {
                   	startOpenMainPage();
                   }
               }else{
                   //本地文件不完整去下载
                   DownLoadZipFileTask downLoadZipFileTask = new DownLoadZipFileTask();
                       downLoadZipFileTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, 					zipFilePath);
                   //下载完成, 执行解压, 开启httpServer, 最后进入首页startOpenMainPage();
               }
           }
       }else{
           //启动一个AsyncTask去下载最新zip
           DownLoadZipFileTask downLoadZipFileTask = new DownLoadZipFileTask();
                       downLoadZipFileTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, finalZipFilePath);
       }
   }
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
   private void sendErrorNetWork(boolean isRestart,ArrayList<BasicNameValuePartner> dataArr){
       //调用上面接口API的sendErrorNetWork()
   }
   ```

## 设备维护思路

> 由于代码都是常规的逻辑, 这里不做展示了, 只说明原理

1. 在 MainActivity 中, 在没有进入 web 端的第一个页面时, 可以点击右下角区域, 在 1 秒内连点 3 次, 然后进入第 3 步的逻辑

2. 在进入 web 端页面后, 可以先长按屏幕任何位置 5 秒或者以上, 然后 1 秒内连续点击屏幕 3 次, 然后进入第 3 步的逻辑

3. 弹出输入密码的弹窗, 输入解锁密码后, 显示功能弹窗, 功能弹窗内有 3 个功能 (1) 重启设备 (2) 进入设置 (3) 重启 app , 点击时,分别进行设备重启, 进入设备设置页面, 以及 app 的重启

4. 在上面的操作中如果操作超时了, 需要重新从头解锁
