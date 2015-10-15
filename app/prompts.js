'use strict';

module.exports = [
  {
    name: 'projectName',
    message: 'Machine name of project?'
  },
  {
    name: 'themeName',
    message: 'What would you like to name the theme?',
    default: ''
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
