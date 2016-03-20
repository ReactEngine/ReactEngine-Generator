# generator-reactengine

ReactEngine 代码生成器(基于 yoman).  
说明: [ReactEngine](https://github.com/ReactEngine/ReactEngine) 是一个基于 [Reac Native](https://facebook.github.io/react-native) + [Redux](https://github.com/reactjs/redux) + [Strongloop](https://strongloop.com) 的快速开发框架.  
目的: 快速开发,原则上一个 JS 工程师可以搞定 iOS/Android/Server 开发.  

# 安装
```bash
npm install -g yo   
npm install -g generator-reactengine
```

# 使用说明
## 1. 生成 model
```bash
cd yo-project-dir # 进入你的工程目录     
yo reactengine:model [options] <modelName>
```
#### 选项(options)

| 选项(options) | 描述 | 默认值 |
| ------------------ | --------------- | -------------- |
| `-h`, `--help`     | 显示此帮助信息    |                |
| `--skip-cache`     | 不要记住我的选择  | 默认: false     |
| `--skip-install`   | 不要自动安装依赖  | 默认: false     |

#### 参数

| 参数   | 描述 | 类型 | 是否必须 |
| ----------- | -------------- | ------- | -------- |
| modelName  |    模块名称     | 字符串   |     是    |

#### 实例

如下命令   
```bash
yo reactengine:model book
```
<p>
  <img src="./ScreenShots/CreateModel.png" width="340">
</p>
会在 ```你的工程目录/src/services/strongloop/models``` 下生成一个 ```Book.js``` 文件,封装了 ```create/find/findById/findOne/count/exists/update/updateOrCreate/updateAttributes/deleteById``` 等方法,用于和服务器交互.   
你也可以通过修改  ```Book.js``` 来扩展该 Model.   
具体请参考 [ReactEngine](https://github.com/ReactEngine/ReactEngine).



## 2. 生成 module
```
cd yo-project-dir # 进入你的工程目录
yo reactengine:module [options] <moduleName>
```
#### 选项(options)

| 选项(options) | 描述 | 默认值 |
| ------------------ | --------------- | -------------- |
| `-h`, `--help`     | 显示此帮助信息    |                |
| `--skip-cache`     | 不要记住我的选择  | 默认: false     |
| `--skip-install`   | 不要自动安装依赖  | 默认: false     |

#### 参数

| 参数   	  | 	描述 		| 	类型   | 	是否必须 |
| ----------- | -------------- | ------- | ---------- |
| moduleName  |    模块名称     | 字符串   |     是      |
ds
#### 实例

如下命令   
```bash
yo reactengine:module todo
```
<p>
  <img src="./ScreenShots/CreateModule.png" width="450">
</p>
会在 ```你的工程目录/src/modules``` 下创建一个 ```todo``` 文件夹,    包含了redux 需要的 ```actions/constants/components/containers/reducers ``` 等文件,包含一个简单的列表和增删改查等流程.
你可以修改该 modules 来快速开发.  
具体请参考 [ReactEngine](https://github.com/ReactEngine/ReactEngine).
相关截图:  
<p>
  <img src="./ScreenShots/ModuleAdd.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleList.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleUpdate.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleDelete.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleEmpty.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
</p>