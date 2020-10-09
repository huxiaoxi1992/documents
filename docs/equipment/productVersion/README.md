# 产品 APK 版本使用列表

## apk 版本使用说明

本文档用于查找适合于当前产品的 APK 版本以及对应代码仓库. 包含:

- `产品型号`, 产品标准型号, 用于对外产品发布号
- `产品名称`, 产品标准名称
- `APK 版本`, 适用于产品的最低 APK 版本, 点击可查看对应代码仓库
- `资源包名称`, 对内使用的产品资源包路径与名称
- `产品所属分类`, 产品批次与所属系统分类
- `维护频率`, 当前 APK 可维护性

## 产品列表

| 产品型号                | 产品名称              | APK 版本                                                              | 资源包名称                 | 所属分类                  | 维护频率 |
| ----------------------- | --------------------- | --------------------------------------------------------------------- | -------------------------- | ------------------------- | -------- |
| TOR                     | 互动指路屏            | [>=智行智引 2.0.0](https://gitlab.com/signp/android-service-worker)   | finder                     | 智行智引系统              | 高       |
| TOM-S                   | 动态导向屏            | [>=智行智引 2.3.0](https://gitlab.com/signp/android-service-worker)   | show                       | 智行智引系统              | 高       |
| TOM-L                   | 导向信息屏            | [>=智行智引 2.0.0](https://gitlab.com/signp/android-service-worker)   | info                       | 智行智引系统              | 高       |
| TOM-main                | 主屏信息屏            | [>=智行智引 2.8.2](https://gitlab.com/signp/android-service-worker)   | info_main                  | 智行智引系统              | 高       |
| TOM-LED                 | LED 导向屏            | [>=LED1.0](https://gitlab.com/signp/android-led)                      | /                          | 智行智引系统              | 高       |
| TORM                    | 互动导向屏            | [>=智行智引 2.1.0](https://gitlab.com/signp/android-service-worker)   | infowithfinder             | 智行智引系统              | 高       |
| TOP                     | 投影导向屏            | [>=智行智引 2.8.2](https://gitlab.com/signp/android-service-worker)   | projection                 | 智行智引系统              | 高       |
| TOD-1.x                 | 导览屏 1.x            | [>=1.7.7ADV](https://gitlab.com/signp/todirection)                    | XX-TODisplay               | 智行智引系统              | 高       |
| TOD                     | 互动导览屏            | [>=智行智引 2.3.0](https://gitlab.com/signp/android-service-worker)   | guide                      | 智行智引系统              | 高       |
| TOD-android             | 安卓原生导览屏        | [>=导览屏 1.0.0](https://gitlab.com/signp/android-native-guider)      | /                          | 医院演示产品              | 中       |
| TOD-panorama            | 全景导览屏            | [>=CrossWalk1.0.0](https://gitlab.com/signp/todirection)              | XX-TODisplay-pano          | 学校演示产品              | 低       |
| TOI                     | 楼层索引屏            | [>=智行智引 2.8.0](https://gitlab.com/signp/android-service-worker)   | index                      | 智行智引系统              | 高       |
| TOI-main                | 主屏索引屏            | [>=智行智引 2.8.2](https://gitlab.com/signp/android-service-worker)   | index_main                 | 智行智引系统              | 高       |
| TOR+TOM                 | 指路屏+信息屏         | [>=智行智引 2.1.0](https://gitlab.com/signp/android-service-worker)   | finder + info              | 智行智引系统              | 高       |
| TOR+TOI                 | 指路屏+索引屏         | [>=智行智引 2.8.0](https://gitlab.com/signp/android-service-worker)   | finder + index             | 智行智引系统              | 高       |
| TOD+TOM                 | 导览屏+信息屏         | [>=智行智引 2.8.2](https://gitlab.com/signp/android-service-worker)   | guide + info               | 智行智引系统              | 高       |
| TOD+TOI                 | 导览屏+索引屏         | [**不可用**](https://gitlab.com/signp/android-service-worker)         | guide + index              | 智行智引系统              | 高       |
| SAMPLE-BOX              | 智行智引样品箱        | [>=智行智引样品箱 1.0.0](https://gitlab.com/signp/android-sample-box) | /                          | 医院演示产品              | 中       |
| TODirection             | 互动指路屏/导览屏 1.x | [>=1.7.7ADV](https://gitlab.com/signp/todirection)                    | XX-TODirection / TODisplay | 1.x 互动指路屏/导览屏产品 | 高       |
| Yangpinxiang            | 样品箱                | [样品箱 3.20.9](https://gitlab.com/signp/samplebox)                   | /                          | 0.x 场景展示样品箱        | 不维护   |
| Yangpinxiang-compatible | 样品箱兼容版          | [样品箱 CrossWalk4.0.0](https://gitlab.com/signp/samplebox)           | /                          | 0.x 场景展示样品箱        | 低       |
| SmartSign               | 项目屏                | [1.2.32](https://gitlab.com/signp/normalapp)                          | /                          | 0.x 项目屏                | 低       |
| SmartSign-compatible    | 项目屏兼容版          | [1.2.33crossWalk](https://gitlab.com/signp/normalapp)                 | /                          | 0.x 项目屏                | 低       |
