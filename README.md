#### 开发环境

-	安装node.js，git
-	atom，atom插件(bottom-dock,gulp-manager)-启动运行面板ctrl+K,ctrl+g
-	atom-beautify 格式化代码(html,js,css) 快捷:ctrl+alt+b
-	markdown-writer markdown语法
-	minimap 小地图
-	language-vue 高亮vue
- stylus 高亮
-	vue-format 格式vue代码 快捷:ctrl+alt+v
- tortoise-svn 嵌入svn工具

#### 全局安装 (使用管理员权限)

-	webpack（装过可忽略） 前端模块化管理,打包工具,还可以模块按需加载.http://webpackdoc.com/

```
npm i webpack -g
```

-	gulp4.0 （装过可忽略） 前端构建工具http://www.gulpjs.com.cn/docs/api/

```
npm install gulpjs/gulp#4.0 -g
npm install gulpjs/gulp#4.0 --save-dev
```

-	bower （装过可忽略） 包管理工具 https://segmentfault.com/a/1190000002971135

```
npm i bower -g
```

-	supervisor （装过可忽略）

```
npm i supervisor -g
```
- eslint （装过可忽略）es语法规则检验
```
npm eslint -g
```
#### 工程安装

root

```
npm i
```

root/bower

```
bower i
```

root/server
```
npm i
```

#### 基于前端开发技术

keen-ui、less、jquery、Vue

#### 启动构建模式

root/

```
gulp
```

#### 启动生产模式

root/

```
gulp build
```



#### 可能用到命令
- npm命令
	```
	npm install                                  更新项目依赖的包
	```
	```
	npm list -g --depth 0                        查看已安装全局包
	```
- bower命令
	```
	bower install                                更新项目依赖包
	```
	```
	bower search jquery                          bower查找包
	```
	```
	bower install jquery --save                  保存插件
	```
	```
	bower uninstall jquert --save                卸载插件
	```
#### Atom常用快捷
- ctrl+f         本文搜索
- ctrl+Shift+f   全文搜索  
- ctrl+alt+b     美化代码
#### 插件
- jquery
- keen-ui  ui
- vue-pagenav  vue分页
- vue-datepicker 时间控件
- vue-scrollbar 滚动条

- z-tree 树
- echarts 百度图表
- table   自定义表格
