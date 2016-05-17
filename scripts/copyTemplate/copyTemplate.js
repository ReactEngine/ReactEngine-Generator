/**
 * Created by jerry on 16/5/12.
 */
var fs = require('fs');
var path = require('path');
var url = require('url');
var ncp = require('ncp').ncp;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var async = require('async');

var copyTemplate = function () {
   return {
        fileUrl :"https://github.com/ReactEngine/ReactEngine/archive/master.zip", //"https://github.com/ReactEngine/reactengine/zipball/master",
        tmpStr : path.resolve(__dirname,'tmp'),
        tmpDir : path.resolve(__dirname,'tmp/template'),
        tmpZip : path.resolve(__dirname,'tmp/ReactEngine-master.zip'),
        needCopyDir : path.resolve(__dirname,'tmp/template/ReactEngine-master/src/modules'),
        targetDir : path.resolve(__dirname,'../..','module/templates'),
        replacement:"<%= moduleName_upperCase%>",

       /**
        * 下载项目
        * @param moduleName
        */
        downloadFileByCurl: function(moduleName) {
           console.log("tmpDir: "+ this.tmpDir);
           console.log("tmpStr: "+ this.tmpStr);
           console.log("tmpZip: "+ this.tmpZip);
           console.log("needCopyDir: "+ this.needCopyDir);
           console.log("targetDir: "+ this.targetDir);

           if(typeof moduleName != 'undefined'){
               this.needCopyDir = this.needCopyDir+ "/" + moduleName;
               this.moduleName = moduleName;
               this.moduleName_UpperCase = moduleName.toUpperCase();
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
           var unzip = "unzip -o  -d " + self.tmpDir +"  "+ self.tmpZip;
           console.info(unzip);
           exec(unzip, {
               maxBuffer: 10000 * 1024//设置maxBuffer 以免出现 [Error: stdout maxBuffer exceeded]
           }, function(err,stdOut,stdErr) {
               if (err) {
                   console.error(err);
               }
               else{
                   console.info("unzip ReactEngine-master.zip  at " + self.tmpDir);
                   if(typeof self.moduleName_UpperCase != 'undefined'){
                       self.replaceContent();
                   }
               }
           });
       },
       replaceContent: function () {
           var self = this;
           var reg = new RegExp(self.moduleName_UpperCase);
           var sed = "find " + self.needCopyDir +" -name \"*\" -type file -print | xargs  sed -i \"\" 's"+ reg +self.replacement+"/g' {}";
           console.log(sed);
           exec(sed, {
               maxBuffer: 10000 * 1024
           }, function(err,stdOut,stdErr) {
               if (err) {
                   console.error(err);
               }
               else{
                   console.log("finished replaced ....");
                   self.copyModuleToTemplate();
               }
           });
       },
       copyModuleToTemplate: function () {
           var self = this;
           //从tmp文件夹复制module文件夹
           ncp(self.needCopyDir, self.targetDir, function (err) {
               if (err) {
                   return console.error(err);
               }
               console.info("template created at " + self.targetDir);
           });
       }
   }
};
module.exports = copyTemplate();

