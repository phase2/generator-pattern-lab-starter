'use strict';
var yeoman = require('yeoman-generator');
var myPrompts = require('./prompts.js');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var exec = require('child_process').exec;
var _ = require('lodash');
var options = {};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    if (!this.options.skipWelcome) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the remarkable ' + chalk.red('PatternLabStarter') + ' generator! ' + this.pkg.version + '\nPlease be in the folder you want files in now.'
      ));
    }
    //options.themeName = _.last(this.env.cwd.split('/')); // parent folder
    options.themePath = '';
    options = _.assign(options, this.options);
  },

  prompting: function () {
    var done = this.async();
    var prompts = [];

    myPrompts.forEach(function (item) {
      if (_.isUndefined(options[item.name])) {
        prompts.push(item);
      }
    });

    //if (_.isUndefined(options.installDeps)) {
    //  prompts.push({
    //    type: 'confirm',
    //    name: 'installDeps',
    //    message: 'Want to install dependencies after?',
    //    default: true
    //  });
    //}

    this.prompt(prompts, function (props) {
      options = _.assign(options, props);
      done();
    });

    this.composeWith('pattern-lab-starter:extras', {options: options}, {
      local: path.resolve(__dirname, '../extras')
    });

  },

  configuring: function () {

  },

  default: function () {
    var done = this.async();
    this.remote('phase2', 'pattern-lab-starter', 'v5.0.2', function (err, remote) {
      remote.directory('.', options.themePath);
      done();
    }, true);
  },

  install: function () {
    if (this.options.installDeps) {
      console.log('Running "npm install"...');
      this.npmInstall();
    }
  },

  end: function () {
    this.log(yosay(
      'All done!'
    ));
    console.log('If you don\'t see your prompt, try hitting enter.');
  }
});
