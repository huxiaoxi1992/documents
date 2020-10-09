# 数据图形实地勘察与采集方案

## 重要性与必要性

数据是 GIS 系统的核心, 只有准确有效的数据才能对整个地图服务提供可靠的支持, 数据的准确与否决定着整个系统的实用性与可靠性.
采集的基础数据是所有数据的来源, 是对已有数据(如 CAD, 网页地图等)的校准与补充, 后续的数据预处理都必须以实地采集的数据为基础进行校正与修改.

## 数据采集时间要求

数据收集与处理按照地图的绘制完成与否通常分为三个阶段, 分别是地图绘制前, 地图绘制, 以及地图绘制后. 任何数据勘察需要在基础地图绘制完成后进行, 即必须先绘图, 再进行数据采集.

地图绘制后, 数据勘察与采集目的在于检查绘制的地图是否可靠以及补充原有数据的不足, 根据项目需求的不同, 收集更多未获取的数据信息, 数据采集是每个正式项目必须执行的工作流程.

## 实地勘察的分类与目的

实地勘察分为两种类型, 一种是室内数据的采集, 另一种是室外数据的采集.

其中室内数据的采集包括对项目的罗盘偏角进行收集, 对室内路线的采集与检查, 点位的名称、位置的标注与检查, 相关项目可能用到的标注及图文的采集.

室外数据的采集根据是否使用 GPS 对路线的采集分为两种类型, 不使用 GPS 的项目的数据采集和室内一致, 使用 GPS 项目的室外数据采集除了以上要求以外, 还包括 GPS 路线的采集, 详见 GPS 使用与路线数据采集手册.

## 实地数据采集与勘察工具

| 工具               | 数量                 | 要求                                                                   | 作用                                                              |
| ------------------ | -------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 地图图纸           | 2(必须)              | 以 A3 大小打印绘制的地图图纸, 包括节点与路线                           | 1、记录标注有问题的点位与路线 2、采集需要的额外数据需要的标注依据 |
| 相机(手机)         | 1(必须)              | 便于携带, 可拍照                                                       | 拍摄存在问题或需要修改的点位, 便于复查                            |
| 记录仪             | 1(必须)              | 可录像                                                                 | 对行走的路线进行记录, 便于后期数据交接时的沟通                    |
| 签字笔             | 2(必须)              | 红、黑各一支                                                           | 用于对图纸点位与路线标注                                          |
| 彩色记号笔         | 2(必须)              | 蓝、橙两色各一支                                                       | 用于对图纸区域进行标注                                            |
| 点位数据采集记录表 | 1(必须)              | 见点位数据采集记录表                                                   | 记录需要修改的点位信息                                            |
| 文件夹/板          | 1(必须)              | 能夹住 A4 大小图纸, 便于手持与标注                                     | 方便手持文件与记录                                                |
| 手持 GPS(安卓手机) | 1(室外 GPS 项目必须) | 有 GPS 功能, 并能记录 GPS 路径, 安卓手机使用 AndroiTS GPSTest 进行采集 | 采集室外路径数据                                                  |

## 罗盘偏角校正

使用手机对项目地图与实际场景的罗盘偏角进行校准.

使用方法: 进入目标楼层后, 对照图纸与周围环境, 当确认自己面朝方向与图纸的北方相同时, 使用手机罗盘, 记录当前罗盘偏角作为图纸北方与地磁北方的偏角.

:::warning 注意

- 使用前需对手机罗盘进行校准, 以 8 字形方式来回晃动手机;
- 记录当前罗盘偏角时最好使用多个手机进行记录取平均值以消除误差;
- 多个手机进行罗盘测量时切勿靠近, 二者磁场会相互干扰.

:::

## 路线采集与检查

路线采集与检查是对地图数据中的路网进行收集与校正, 路线的采集准确与否直接影响到规划的路径是否合理.

路线采集要求对项目的所有路线完成至少一次整体的行走, 保证每个路径的可用性与连通性, 行走过程需配合记录仪进行录像, 以便于后期数据制作时的交流.

路线采集要求:

- 完成至少一次整体路线行走;
- 使用记录仪对行走路线进行记录;
- 换乘设施的可用性与连通性检查, 不可用的设施需要予以标注;
- 地图中与实际不符的路线进行标注.

## 点位采集与检查

点位采集与检查包括点位名称及类别的采集, 点位位置的标注与检查两个部分.

点位数据采集记录表如下:

| 点位编号 | 点位名称 | 点位名称备注 | 点位特征 | 点位照片时间 | 点位修改方式   |
| -------- | -------- | ------------ | -------- | ------------ | -------------- |
| 1F-1     | 电梯     | /            | 码/屏/图 | XX:YY:ZZ     | 移动至地图对侧 |
| ...      | ..       | ...          | ...      | ...          | ...            |

### 点位名称及类别的采集

点位名称是地图数据用于描述当前位置的最方便也是最有效的参数, 因此点位名称的采集对于能否准确描述当前以及目标位置来说至关重要, 点位名称如有不清楚的, 可参考各楼的索引牌或向工作人员咨询.

点位名称的数据采集包括以下内容:

- 当前位置的标注名称, 使用最通用的称呼进行记录;
- 当前位置的门牌号或别称, 通常作为关键词使用.

点位类别为了方便当前点位进行搜索, 点位类别可通过点位类别分类表进行标注, 对于不存在分类的点位类型, 请向当地工作人员问询.

### 点位位置的标注与检查

点位位置的标注与检查是对当前点位的地理特性进行标注, 也是对当前点位的状态的收集, 主要包括以下几个内容:

- 对需要修改的点位进行标注;
- 使用手机对修改的点位进行拍照, 并在图纸上记录对应时间;
- 检查当前点位特征, 是否为二维码点位, 屏点位, 蓝牙点位, 全景图点位等.

## 要素标注标准

`增加`: 使用黑色签字笔在对应位置绘制新增要素, 并记录名称修改等信息;

`删除`: 使用黑色签字笔在对应要素上画 ×;

`修改`: 同删除与增加;

`移动`: 使用红色签字笔标注要素移动箭头;

`合并`: 使用蓝色记号笔将需要合并的要素进行连接, 勾画

## 不同项目的图文信息

### 消防安全通道

对于需要使用消防安全图的项目, 在数据采集时需要对已有的消防通道图进行收集, 拍照并在绘制的地图中记录安全通道口, 通常为楼梯与安全通道点位.

### 全景照片

全景照片的拍摄见全景拍照手册