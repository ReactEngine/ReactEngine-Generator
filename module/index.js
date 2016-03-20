'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var S = require('string');

module.exports = generators.Base.extend({
  _createProjectFileSystem: function() {
    var destRoot = this.destinationRoot();
    var sourceRoot = this.sourceRoot();
    var moduleName = S(this.moduleName).capitalize().s;
    var moduleDir = destRoot + '/src/modules/' + moduleName.toLowerCase();
    var templateContext = {
      moduleName: moduleName,
      moduleCommonName: moduleName.toLowerCase()
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
      desc: 'Name of the module',
    });

    this.log('Creating module ' + this.moduleName + '.');
  },

  initializing: function() {
    var message = chalk.bgBlack.bold('\nWelcome to ReactEngine\n') + chalk.underline('https://reactengine.github.io\n');
    this.log(yosay(message));
  },

  configuring: function() {
    this.config.save();
  },

  writing: function() {
    this._createProjectFileSystem();
  },
});
