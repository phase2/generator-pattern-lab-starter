'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var _ = require('lodash');
//var options = {};

module.exports = generators.Base.extend({
  initializing: function () {
    //this.pkg = require('../package.json');
    //options = _.assign(options, this.options);
  },

  //prompting: function () {
  //var done = this.async();

  // Have Yeoman greet the user.
  //this.log(yosay(
  //  'Hi! Let\'s get you some extra goodies to use!'
  //));

  // Creates an array of directories inside "app/templates/" - our pattern options
  //var patternOptions = _.filter(fs.readdirSync(this.templatePath()), function (value) {
  //  // filtering out directories that start with `.` - like `.DS_Store`
  //  if (!value.match(/^\./)) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  //});
  ////
  //if (patternOptions.drupal7 && options.backEnd === '7.x') {
  //  options.patternCollection = 'drupal7';
  //}

  // Setting up our questions
  //var prompts = [];

  //if (_.isUndefined(options.patternCollection)) {
  //  prompts.push({
  //    type: 'list',
  //    name: 'patternCollection',
  //    message: 'Which set of patterns would you like?',
  //    choices: patternOptions
  //  });
  //}

  // Asking our questions
  //this.prompt(prompts, function (props) {
  //  options = _.assign(options, props);
  //  done();
  //}.bind(this));

  //},

  writing: {
    app: function () {
      var patternCollection;
      var destPath = this.options.themePath || './';

      if (['drupal', 'openatrium'].indexOf(this.options.drupalDistro) !== -1) {
        patternCollection = this.options.drupalDistro + '-' + this.options['drupalDistroVersion'];
      }

      if (patternCollection) {
        console.log('extras writing');
        this.fs.copyTpl(
          this.templatePath(patternCollection),
          this.destinationPath(destPath),
          this.options
        );

        if (this.options.drupalDistro === 'drupal') {
          if (this.options['drupalDistroVersion'] === '7.x') {
            this.fs.move(
              this.destinationPath(destPath) + '/' + 'pattern_lab_starter.info',
              this.destinationPath(destPath) + '/' + this.options.themeName + '.info'
            );
          }
          if (this.options['drupalDistroVersion'] === '8.x') {
            this.fs.move(
              this.destinationPath(destPath) + '/' + 'pattern_lab_starter.info.yml',
              this.destinationPath(destPath) + '/' + this.options.themeName + '.info.yml'
            );
            this.fs.move(
              this.destinationPath(destPath) + '/' + 'pattern_lab_starter.libraries.yml',
              this.destinationPath(destPath) + '/' + this.options.themeName + '.libraries.yml'
            );
          }
        } else if (this.options.drupalDistro === 'openatrium') {
          if (this.options['drupalDistroVersion'] === '7.x') {
            this.fs.move(
              this.destinationPath(destPath) + '/' + 'pattern_lab_starter.info',
              this.destinationPath(destPath) + '/' + this.options.themeName + '.info'
            );
          }
        }

      }

    }
  }

});
