'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;
var _ = require('lodash');
var options = {};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    if (!this.options.skipWelcome) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the remarkable ' + chalk.red('PatternLabStarter') + ' generator!' + '\nPlease be in the folder you want files in now.'
      ));
    }

    this.pkg = require('../package.json');
    options.themeName = _.last(this.env.cwd.split('/')); // parent folder
    options.themePath = '';
    options = _.assign(options, this.options);
  },

  prompting: function () {
    var done = this.async();
    var prompts = [];

    if (_.isUndefined(options.themeName)) {
      prompts.push({
        name: 'themeName',
        message: 'What would you like to name the theme?',
        default: ''
      });
    }

    if (_.isUndefined(options.installDeps)) {
      prompts.push({
        type: 'confirm',
        name: 'installDeps',
        message: 'Want to install dependencies after?',
        default: true
      });
    }

    this.prompt(prompts, function (props) {
      options = _.assign(options, props);
      done();
    });

    this.composeWith('pattern-lab-starter:extras', {options: options});

  },

  configuring: function () {

  },

  writing: function () {
    var done = this.async();
    this.remote('phase2', 'pattern-lab-starter', 'master', function (err, remote) {
      remote.directory('.', options.themePath);
      done();
    }, true);
  },

  install: function () {
    if (options.installDeps) {
      this.npmInstall();
    }
  },

  end: function () {
    this.log(yosay(
      'All done with main install! \nConsider installing extras with `yo pattern-lab-starter:extras'
    ));
  }
});
