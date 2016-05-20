'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');//级联创建目录
var yosay = require('yosay');
var chalk = require('chalk');
var S = require('string');
var fs = require('fs');
var path = require('path');
module.exports = generators.Base.extend({
  _createProjectFileSystem: function() {
    var destRoot = this.destinationRoot();//yeoman项目的根路径,目的是保证用户可以在子目录里面让他们的命令运行有效,以确保终端用户的操作一致,
    var sourceRoot = this.sourceRoot();//模板上下文 ,存储模板文件的目录
    var moduleName = S(this.moduleName).capitalize().s;
    var moduleDir = destRoot + '/src/modules/' + moduleName.toLowerCase();
    var templateContext = {
      moduleName: moduleName,
      moduleName_lowerCase: moduleName.toLowerCase(),
      moduleName_upperCase:moduleName.toUpperCase()
    };
    mkdirp(moduleDir + '/actions');
    //根据module的type来复制对应的template
    var moduleType = this.options.type;
    //console.log(this._getHasModuleTypes());
    if(typeof moduleType =='undefined'){//command has no --type option
      this._errorAction(1);
    }else {
      sourceRoot = path.resolve(sourceRoot,'..',moduleType);
      if(! fs.existsSync(sourceRoot)){ //module type is not exists
        this._errorAction(2);
      }else{
        this.fs.copyTpl(
            sourceRoot+'/**/*',
            moduleDir,
            templateContext
        );
      }
    }
  },
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.option('--type'); //this code can adds option --type for generator :  eg:yo reactengine:module --type=list book  it create module book and module type is list.
    this.argument('moduleName', {
      required: true,
      type: String,
      desc: 'Name of the module'
    });
    this.log('Creating module ' + this.moduleName + '.');
  },

  initializing: function() {
    var message = chalk.bgBlack.bold('\nWelcome to ReactEngine\n') + chalk.underline('reactengine.github.io\n');
    this.log(yosay(message));
  },
  //存储用户配置 ,让子generator之间使用共同的配置,它们会被写入到.yo-rc.json 文件,如果文件不存在 这个方法会创建.yo-rc.json 文件.
  configuring: function() {
    this.config.save();
  },
 // 调用writing方法创建一个gruntfile
  writing: function() {
    this._createProjectFileSystem();
  },
  /**
   * 获取module 文件夹下面的所有template类型
   * @returns {*}
   * @private
     */
  _getHasModuleTypes: function () {
    var sourceRoot = this.sourceRoot();
    var dir = path.resolve(sourceRoot,'..');
    var readDir = [];
    var tempDir = [];
    if(fs.existsSync(dir)){
      tempDir = fs.readdirSync(dir);
    }
    tempDir.forEach(function (child) {
      var childPath = path.resolve(dir,child);
      var stat = fs.statSync(childPath);
      if (stat.isDirectory() ) {
        readDir.push(child);
      }
    });
    return readDir;
  },
  /**
   * 命令行输入错误提醒方式
   * @param type 1:command no --type | 2: module type not exist
   * @private
     */
  _errorAction: function (type) {
    switch (type){
      case 1:
            console.log("command error : please read README.md!");
            break;
      case 2:
            console.log("module type error: please read README.md!");
            break;
      default:
            console.log("system error: please retry again!");
    }
  }

});
