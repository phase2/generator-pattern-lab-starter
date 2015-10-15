'use strict';
var _ = require('lodash');

module.exports = [
  {
    name: 'themeName',
    message: 'What would you like to name the theme?',
    default: _.last(process.cwd().split('/')),
    filter: function (response) {
      return response.replace(/ /g, '_');
    }
  },
  {
    name: 'drupalDistro',
    message: 'What distribution of Drupal is installed?',
    type: 'list',
    default: 'drupal',
    choices: [
      'drupal',
      'openatrium'
    ]
  },
  {
    name: 'drupalDistroVersion-drupal',
    message: 'What version of Drupal is installed?',
    type: 'list',
    default: '7.x',
    choices: [
      '7.x',
      '8.x'
    ]
  },
  {
    name: 'projectDescription',
    message: 'Description of project?'
  }
];
