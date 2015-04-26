'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;

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
        type: 'confirm',
        name: 'someOption',
        message: 'In the directory where you want this?',
        default: true
      }
      //{
      //  type: 'confirm',
      //  name: 'installDeps',
      //  message: 'Want to install dependencies after?',
      //  default: true
      //}
    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: function() {
    var done = this.async();

    this.remote('phase2', 'pattern-lab-starter', 'master', function (err, remote) {
      remote.directory('.', '');
      done();
    });
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
    this.log('The `extras` sub-generator, can be ran by itself anytime with `yo pattern-lab-starter:extras`');
  }
});
