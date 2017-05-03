'use strict';
var Generator = require('yeoman-generator');
var myPrompts = require('./prompts.js');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var exec = require('child_process').execSync;
var _ = require('lodash');
var options = {};

module.exports = Generator.extend({
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
    var prompts = [];

    myPrompts.forEach(function (item) {
      if (_.isUndefined(options[item.name])) {
        prompts.push(item);
      }
    });

    return this.prompt(prompts).then(function (props) {
      options = _.assign(options, props);
    });

    // disabling this for now as pattern lab starter v8 doesn't really have drupal 7 or drupal 8 differences
    // this.composeWith('pattern-lab-starter:extras', {options: options}, {
    //   local: path.resolve(__dirname, '../extras')
    // });

  },

  configuring: function () {

  },

  default: function () {
    exec('curl -OL https://github.com/phase2/pattern-lab-starter/archive/master.tar.gz | tar -xzf -', {
      cwd: options.themePath
    });
    this.fs.move(options.themePath + '/pattern-lab-starter-master, options.themePath + '/pattern-lab-starter');
  },

  install: function () {
    if (this.options.installDeps) {
      console.log('Running "npm install"...');
      this.npmInstall();
    }
  },

  end: function () {
    var finalWords;
    if (this.options.installDeps) {
      finalWords = 'All done!\n' +
      'Run ' + chalk.red('"npm start"') + ' to start.\n' +
      'See readme.md for more.\n' +
      'Have a great day!';
    } else {
      finalWords = 'All done!\n' +
      'Install dependencies with ' + chalk.red('"npm install"') +
      'Run ' + chalk.red('"npm start"') + ' to start.\n' +
      'See readme.md for more.\n' +
      'Have a great day!';
    }

    this.log(yosay(finalWords));
    console.log('If you don\'t see your prompt, try hitting enter.');
  }
});
