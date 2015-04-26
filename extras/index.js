'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var _ = require('lodash');

module.exports = generators.Base.extend({
initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
     var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Hi! Let\'s get you some extra goodies to use!'
    ));

    // Creates an array of directories inside "app/templates/" - our pattern options
    var patternOptions = _.filter(fs.readdirSync(this.templatePath()), function(value){
      // filtering out directories that start with `.` - like `.DS_Store`
      if (!value.match(/^\./)) {
        return true;
      } else {
        return false;
      }
    });

    // Setting up our questions
    var prompts = [{
      type: 'list',
      name: 'patternCollection',
      message: 'Which set of patterns would you like?',
      choices: patternOptions
    }];

    // Asking our questions
    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));

  },
  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath(this.props.patternCollection),
        this.destinationPath()
      );
    }
  }
  // install: function () {
  //   this.installDependencies();
  // }
});
