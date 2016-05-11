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
    //調用替換內容方法,如 替換TEACHER 為 STUDENT
    this._replaceFileContent(moduleDir,'TEACHER','STUDENT', function () {});
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
  /***
   * 替換文件夾內所有文件中的字符串
   * @param dir 需要替換文件夾
   * @param str 需要被替換掉的字符串
   * @param replacement 用以替換的字符串
   * @param done //回調,暫時無用處
     * @private
     */
  _replaceFileContent: function (dir , str, replacement, done) {
    var self = this;
    if(typeof str == 'undefined' && typeof replacement == 'undefined'){
      return;
    }
    fs.readdir(dir, function(err, list) {
      if (err) {
        return done(err);
      }
      if (!list.length) {
        return done(null);
      }
      list.forEach(function(file) {
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            self._replaceFileContent( file , str , replacement , done);
          }
          else {
            var fileData = self.fs.read(file);
            var reg = new RegExp(str, 'g');
            var afterReplace = fileData.replace(reg, replacement);
            self.fs.write(file,afterReplace);
          }
        });
      });
    })
  }
});
