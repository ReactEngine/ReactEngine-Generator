/**
 * Created by jerry on 16/5/12.
 */
var mkDirP = require('mkdirp');//级联创建目录
var fs = require('fs');
var path = require('path');
var url = require('url');
var http = require('http');
var ncp = require('ncp').ncp;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


var copyTemplate = function () {

   return {
        fileUrl :"https://github.com/ReactEngine/ReactEngine/archive/master.zip", //"https://github.com/ReactEngine/reactengine/zipball/master",
        tmpStr : path.resolve(__dirname,'..','tmp'),
        tmpDir : path.resolve(__dirname,'..','tmp/template'),
        tmpZip : path.resolve(__dirname,'..','tmp/ReactEngine-master.zip'),
        needCopyDir : path.resolve(__dirname,'..','tmp/template/ReactEngine-master/src/modules'),
        targetDir : path.resolve(__dirname,'..','module/templates'),
       /**
        * 下载项目
        * @param moduleName
        */
        downloadFileByCurl: function(moduleName) {
           if(typeof moduleName != 'undefined'){
               this.needCopyDir = this.needCopyDir+ "/" + moduleName;
               this.moduleName = moduleName;
           }
           var self = this;
           console.info("needCopyDir : " + this.needCopyDir);
           var file = fs.createWriteStream(self.tmpZip);
           var curl = spawn('curl', ["-L",self.fileUrl]);
           console.info("zip downloading  ...");
           curl.stdout.on('data', function(data) {
               file.write(data);
           });
           curl.stdout.on('end', function(data) {
               file.end();
               console.info('finished download  ' + self.tmpZip);
               //解压文件
               self.unzipTemplate();
           });
           curl.on('exit', function(code) {
               if (code != 0) {
                   console.error(code);
               }
           });
       },
       unzipTemplate: function () {
           var self = this;
           var unzip = "unzip -o  -d " + self.tmpDir +" "+ self.tmpZip;
           console.info(unzip);
           exec(unzip, {
               maxBuffer: 10000 * 1024//设置maxBuffer 以免出现 [Error: stdout maxBuffer exceeded]
           }, function(err,stdOut,stdErr) {
               if (err) {
                   console.error(err);
               }
               else{
                   console.info("unzip ReactEngine-master.zip  at " + self.tmpDir);
                   //从tmp文件夹复制module文件夹
                   ncp(self.needCopyDir, self.targetDir, function (err) {
                       if (err) {
                           return console.error(err);
                       }
                       console.info("template created at " + self.targetDir);
                       if(typeof self.moduleName != 'undefined'){
                           var strUpperCase = self.moduleName.toUpperCase();
                           console.info('module name '+strUpperCase +" will be replaced.");
                           //替换module字符串
                           self.replaceTemplateContent(self.targetDir,strUpperCase,"<%= moduleName_upperCase%>");
                           process.on('exit', function () {
                               console.info("module name "+ strUpperCase +" has been replaced by <%= moduleName_upperCase%>.");
                           });
                       }
                   });
               }
           });
       },
      /***
       * 替換文件夾內所有文件中的字符串
       * @param dir 需要替換文件夾
       * @param str 需要被替換掉的字符串
       * @param replacement 用以替換的字符串
       * @private
       */
      replaceTemplateContent: function (dir , str, replacement) {
          var self = this;
          fs.readdir(dir, function(err, list) {
              if (err) {
                  return err;
              }
              if (!list.length) {
                  return null;
              }
              list.forEach(function(file) {
                  file = path.resolve(dir, file);
                  fs.stat(file, function(err, stat) {
                      if (stat && stat.isDirectory()) {
                          self.replaceTemplateContent( file , str , replacement);
                      }
                      else {
                          var fileData = fs.readFileSync(file,'UTF-8');//可以使用mem-fs-editor module的read();
                          var reg = new RegExp(str, 'g');
                          var afterReplace = fileData.replace(reg, replacement);
                          fs.writeFile(file,afterReplace);
                      }
                  });
              });
          })
       },
        replaceContent: function (dir , str, replacement) {
            console.info("replace content  ......");
            var self = this;
            var list = fs.readdirSync(dir);
            if (!list.length) {
                return null;
            }
            list.forEach(function(file) {
                file = path.resolve(dir, file);
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        self.replaceContent( file , str , replacement);
                    }
                    else {
                        var fileData = fs.readFileSync(file,'UTF-8');//可以使用mem-fs-editor module的read();
                        var reg = new RegExp(str, 'g');
                        var afterReplace = fileData.replace(reg, replacement);
                        fs.writeFile(file,afterReplace);
                    }
                });
            });
       }
   }
};
module.exports = copyTemplate();

