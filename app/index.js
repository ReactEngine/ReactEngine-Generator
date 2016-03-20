'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generators.Base.extend({
  _createProjectFileSystem: function() {
   
  },

  _getPrompts: function() {
    var prompts = [{
      name: 'name',
      message: 'What is the name of your project?',
      default: 'react-redux-starter',
    }, {
      name: 'description',
      message: 'What is the description of your project?',
    }, {
      name: 'version',
      message: 'What is the version of your project?',
      default: '0.0.0',
    }, {
      name: 'license',
      message: 'How is your project licensed?',
      default: 'MIT',
    }, {
      name: 'author',
      message: 'What is your name?',
    }, {
      name: 'email',
      message: 'What is your email address?',
    }];

    return prompts;
  },

  _saveAnswers: function(answers, callback) {
    this.appName = answers.name;
    this.appDescription = answers.description;
    this.appVersion = answers.version;
    this.appLicense = answers.license;
    this.appAuthor = answers.author;
    this.appEmail = answers.email;
    callback();
  },

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    var message = chalk.bgBlack.bold('\nWelcome to ReactEngine\n') + chalk.underline('https://reactengine.github.io\n');
    this.log(yosay(message));
  },

  prompting: function() {
    // var done = this.async();

    // this.prompt(this._getPrompts(), function(answers) {
    //   this._saveAnswers(answers, done);
    // }.bind(this));

  },

  configuring: function() {
    this.config.save();
  },

  writing: function() {
    this._createProjectFileSystem();
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false,
    });
  },
});
