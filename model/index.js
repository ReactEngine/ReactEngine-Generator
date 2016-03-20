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
    var modelName = S(this.modelName).capitalize().s;
    var modelsDir = destRoot + '/src/services/strongloop/models/';
    var templateContext = {
      modelName: modelName,
      modelCommonName: modelName.toLowerCase()
    };

    mkdirp(modelsDir);

    this.fs.copyTpl(sourceRoot + '/ModelCommonName.js'
      , modelsDir + templateContext.modelName + '.js'
      , templateContext);
  },

  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('modelName', {
      required: true,
      type: String,
      desc: 'Name of the module',
    });

    this.log('Creating model ' + this.modelName + '.');
  },

  initializing: function() {
    var message = chalk.bgBlack.bold('\nWelcome to ReactEngine\n') + chalk.underline('reactengine.github.io\n');
    this.log(yosay(message));
  },

  configuring: function() {
    this.config.save();
  },

  writing: function() {
    this._createProjectFileSystem();
  },
});
