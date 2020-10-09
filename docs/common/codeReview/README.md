# 橙立科技代码评审规范

评审规范参考 [How to do a code review](https://google.github.io/eng-practices/review/reviewer/), 文档翻译见[谷歌开源内部代码评审规范](https://www.infoq.cn/article/QJi1Kqm4pH3UNAqNzl3l).

## 评审标准

代码评审的主要目的是确保代码库的`整体质量`随时间推移逐步得到提升，所有代码评审工具和过程都是为了实现这一目标而设计的。

### 原则

最高原则: 如果 CL 达到可以`提升系统整体代码质量`的程度，就可以让它们通过了，即使它们可能还不完美。

当然，也有例外的时候。例如，如果 CL 中包含了`系统不需要`的功能，那么即使代码写得很好，评审人员也可以拒绝让它们通过。

有时候，一个问题有多种解决方案，如果开发人员能够证明（通过数据或基于可靠的工程原理）几种解决方案是`同样有效的`，那么评审人员应该`接受开发人员的选择`，否则就应该基于软件设计标准原则做出决定。

如果没有其他适用的原则，评审人员可以要求开发人员`与当前代码库保持一致`，只要不破坏系统的整体代码质量。

### 评审人员职责

评审人员的职责是确保每个 CL（变更列表）的质量，保证代码库整体质量不会随着时间的推移而下降。

评审人员要对他们评审的代码负起责任，确保代码库保持一致性和可维护性。

### 指导意见

代码评审的一个作用是向开发人员`传授知识`。如果你的建议纯粹是带有教育性质的，并且对于满足的标准来说并不是那么重要，那么请在前面加上“Nit:”。

## 注意事项

### 设计

代码评审中最重要的部分是 CL 的总体设计。

- 代码段的交互需要存在联系
- 变更的归属, 通用方法还是隶属于组件的变更
- 能与系统的其他部分良好地集成
- 是否需要此时引入该变更

### 功能

1. 开发人员先测试好变更代码，确保它们能够正确运行。
2. 考虑一些边缘情况，尝试像用户一样思考问题，并找出只是通过阅读代码无法看到的错误。

### 复杂性

1. 函数, 类, 组件的复杂度尽可能低
2. 单一文件只做单一的工作, 避免面条式代码
3. 拒绝过度设计

### 测试

暂不做要求

### 命名

1. vscode `Code Spell Checker` 扩展提示拼写的准确性
2. 充分表达一个变量, 函数是用来做什么的
3. 变量与函数名完全遵守`小驼峰`命名规范, 即使存在字母缩写简称
4. 类, 组件名首字母大写

### 代码风格

严格按照配置的 ESLint 静态检查完成代码风格的统一, 格式统一作为代码的基础要求

### 注释与文档

1. 所有注释要求使用`汉语`书写
2. 注释用于解释代码的`用处`, 而不是解释在干什么
3. 注释需要指出代码中不可能包含的信息, 比如代码的缘由
4. 类、模块或函数文档需要对代码的用途、用法和行为进行说明。比如函数文档要求使用 `JSDoc` 完成参数, 说明, 例子, 等描述

### 系统性

注意文件代码的拆分与整合, 要尽量避免小的变更带来的复杂性

### 鼓励与赞赏

对好的代码实践进行鼓励和赞赏