![all-search](https://socialify.git.ci/endday/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

## all-search 全搜，一个搜索引擎快捷跳转菜单

一个让你可以方便的在各个搜索引擎之间跳转的顶部固定菜单，基于vue3，使用rollup构建。

A top fixed menu that allows you to jump between various search engines, build based on Vue, and use rollup.

#### 有什么需求、建议、问题直接提 Issues
#### 做这个脚本纯粹是个人兴趣，用爱发电。
#### 开源不易，多多鼓励，如果觉得还不错，就去 Github 点个⭐ Star 鼓励一下, 或者把脚本分享给身边的人。

## 脚本地址
脚本猫的版本有兼容性差异，脚本猫用户请使用脚本猫专属安装地址

### greasyFork
* [greasyfork地址](https://greasyfork.org/zh-CN/scripts/397993-all-search)
* [jsdelivr地址](https://cdn.jsdelivr.net/npm/all-search@latest/build/index.user.js)
* [unpkg地址](https://unpkg.com/all-search@latest/build/index.user.js)
* 最新的版本链接：https://cdn.jsdelivr.net/npm/all-search@latest/build/index.user.js
* 最新的版本链接2：https://cdn.jsdelivr.net/gh/endday/all-search@master/build/index.user.js

### 脚本猫
* [脚本猫ScriptCat地址](https://scriptcat.org/script-show-page/477)
* [jsdelivr地址](https://cdn.jsdelivr.net/npm/all-search@latest/build/index.sc.user.js)
* [unpkg地址](https://unpkg.com/all-search@latest/build/index.sc.user.js)
* 最新的版本链接：https://cdn.jsdelivr.net/npm/all-search@latest/build/index.sc.user.js
* 最新的版本链接2：https://cdn.jsdelivr.net/gh/endday/all-search@master/build/index.sc.user.js

## 设置地址
* [码云](https://endday.gitee.io/all-search/)
* [github](https://endday.github.io/all-search/)

## 特色功能
* [图形界面添加网址](https://endday.github.io/all-search/)
* 拖动改变分类排序
* 支持垂直和横向布局
* 点击分类使用分类第一个地址打开
* 鼠标中键点击地址可以打开新窗口（也可以使用ctrl+右键单击）
* 提供移动端支持
    * 若页面宽度不足，可以进行滚动，
    * 移动端为点击触发菜单
* 隐藏功能，通过按钮触发展示和隐藏

## 待完成
* 英语支持
* 文字选中工具栏
* 快捷键唤起全局搜索栏（待定）
* 谷歌插件化（待定）

## 兼容和性能
* 针对百度样式问题，没有使用损耗性能的定时器，采用劫持Node.prototype.removeChild来实现
* 针对youtube的spf.js的路由切换进行监听
* 与AC-baidu等主流油猴脚本无兼容问题

## 如何贡献

#### 反馈与交流
[QQ群地址](https://qm.qq.com/cgi-bin/qm/qr?k=AKKJzfydYb3ZTya7k5yT4HUcA37zQfcO&jump_from=webapi)
QQ群号 148498263

#### 本地开发
设置页
```
npm run serve
```

脚本
```
npm run tmDev
```
运行后，将build目录下的index.dev.js复制到油猴或其他脚本管理器中。

tmDev使用了watch，每次修改都会自动重新构建，index.dev.js文件内并没有代码，而是require引用了本地文件index.user.js，所以记得开启油猴的文件访问权限

#### 构建油猴脚本
脚本的版本号引用package.json中的版本号，记得修改
```
npm run tmBuild
```
会打包出油猴使用的index.user.js和脚本猫专属的index.sc.user.js
