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

    this.fs.copyTpl(
            sourceRoot+'/**/*',
            moduleDir,
            templateContext
          );
  },
  constructor: function() {
    generators.Base.apply(this, arguments);

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

});
