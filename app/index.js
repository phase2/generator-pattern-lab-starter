'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;

var answers = {};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('PatternLabStarter') + ' generator!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'themeName',
        message: 'What theme name do you want? A folder with that will be created. Just hit enter if you are already in the theme folder'
      },
      {
        type: 'confirm',
        name: 'extras',
        message: 'Would you like to install some extras too?',
        default: false
      }
      //{
      //  type: 'confirm',
      //  name: 'installDeps',
      //  message: 'Want to install dependencies after?',
      //  default: true
      //}
    ];

    this.prompt(prompts, function (props) {
      answers.themeName = props.themeName;
      if (props.extras) {
        this.composeWith('pattern-lab-starter:extras');
      }
      done();
    }.bind(this));
  },

  writing: function() {
    var done = this.async();
    this.remote('phase2', 'pattern-lab-starter', 'master', function (err, remote) {
      remote.directory('.', answers.themeName);
      done();
    }, true);
  },

  install: function () {
    this.installDependencies();
    this.log('Installing Ruby dependencies with `bundle install` ... ');
    this.spawnCommand('bundle', ['install']);
  },

  end: function() {
    //var done = this.async();
    //var that = this;

    this.log(yosay(
      'All done with main install!'
    ));
    //
    //this.prompt([
    //  {
    //    type: 'confirm',
    //    name: 'extras',
    //    message: 'Would you like to install some extras too?',
    //    default: false
    //  }
    //], function (props) {
    //  this.log('The `extras` sub-generator, can be ran by itself anytime with `yo pattern-lab-starter:extras`');
    //  if (props.extras) {
    //    this.spawnCommand('yo', ['pattern-lab-starter:extras']);
    //  }
    //}.bind(this));
    //this.log('The `extras` sub-generator, can be ran by itself anytime with `yo pattern-lab-starter:extras`');
  }
});
