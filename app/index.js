'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;
var _ = require('lodash');

var answers = {};
var options = {

};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    if (!this.options.skipWelcome) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the remarkable ' + chalk.red('PatternLabStarter') + ' generator!' + '\nPlease be in the folder you want files in now.'
      ));
    }

    this.pkg = require('../package.json');

    options.themeName = _.last(this.env.cwd.split('/'));
    //console.log('---');
    //console.log(options);
    //console.log(this.options);
    //console.log(this.config);
    //console.log('---');
    options = _.assign(options, this.options, this.config);
    //console.log(options);
    //console.log('---');

  },

  prompting: function () {
    var done = this.async();
    var prompts = [];

    //if (!options.themeName) {
    //  prompts.push({
    //    type: 'input',
    //    name: 'themeName',
    //    message: 'What would you like to call the theme?',
    //    default: _.last(options.env.cwd.split('/'))
    //  });
    //}

    //if (!options.themePath) {
    //  prompts.push({
    //    name: 'themePath',
    //    message: 'Where would you like to install it?',
    //    default: ''
    //  });
    //}

    if (!options.installDeps) {
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
    }.bind(this));
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
      this.installDependencies();
      this.log('Installing Ruby dependencies with `bundle install` ... ');
      this.spawnCommand('bundle', ['install']);
    }
  },

  end: function () {
    //var done = this.async();
    //var that = this;

    this.log(yosay(
      'All done with main install! \nConsider installing extras with `yo pattern-lab-starter:extras'
    ));
  }
});
