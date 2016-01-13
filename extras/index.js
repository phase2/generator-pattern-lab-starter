'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var myPrompts = require('../app/prompts.js');
var fs = require('fs');
var _ = require('lodash');

module.exports = generators.Base.extend({
  initializing: function () {
    //this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    var prompts = [];

    myPrompts.forEach(function (item) {
      if (_.isUndefined(this.options[item.name])) {
        prompts.push(item);
      }
    }.bind(this));

    this.prompt(prompts, function (props) {
      this.options = _.assign(this.options, props);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var patternCollection;
      var destPath = this.options.themePath || './';

      if (this.options.drupalDistro === 'drupal') {
        if (this.options['drupalDistroVersion'] === '7.x') {
          patternCollection = 'drupal-7.x';
        }
        if (this.options['drupalDistroVersion'] === '8.x') {
          patternCollection = 'drupal-8.x';
        }
      } else if (this.options.drupalDistro === 'openatrium') {
        if (this.options['drupalDistroVersion'] === '7.x') {
          patternCollection = 'openatrium-7.x';
        }
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
          if (this.options['drupalDistroVersion'] === '8.x') {
            console.log('Nothing exists for OpenAtrium on Drupal 8.x yet');
          }
        }

      }

    }
  }

});
