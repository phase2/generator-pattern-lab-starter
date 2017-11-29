'use strict';

var Generator = require('yeoman-generator');
var chalk = require('chalk');
var exec = require('child_process').execSync;
var fs = require('fs-extra');
var path = require('path');
var yosay = require('yosay');
var _ = require('lodash');
var myPrompts = require('./prompts.js');

var options = {};

module.exports = Generator.extend({
  initializing: function () {
    this.pkg = require('../../package.json');

    if (!this.options.skipWelcome) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the remarkable ' + chalk.red('PatternLabStarter') + ' generator! ' + this.pkg.version + '\nPlease be in the folder you want files in now.'
      ));
    }

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
  },

  configuring: function () {

  },

  default: function () {
    const release = options['release'] || 'master'
    const release_path = release + '.tar.gz';
    const compressed = _.last(_.split(release_path, '/'));
    const decompressed = _.replace('particle-' + release, '/', '-');
    const download_url = 'https://github.com/phase2/particle/archive/' + release_path;
    const dest = options.themePath ? path.resolve(process.cwd(), options.themePath) : './';
    const themeName = 'patternlab';
    const themePathFull = path.join(dest, themeName);

    this.log('Assembling your Particle theme on release "' + release + '"...');

    try {
      fs.removeSync(compressed);
    } catch (err) {
      if (err.code != 'ENOENT') {
        console.error(err);
        process.exit(2);
      }
    }
    try {
      fs.removeSync(decompressed)
    } catch (err) {
      if (err.code != 'ENOENT') {
        console.error(err);
        process.exit(2);
      }
    }
    try {
      fs.removeSync(themePathFull)
    } catch (err) {
      if (err.code != 'ENOENT') {
        console.error(err);
        process.exit(2);
      }
    }

    // @todo replace tarball retrieval & extraction with a Node library.
    try {
      this.log('Retrieving template from ' + download_url + '...');
      exec([
        'curl --fail --silent -OL ' + download_url,
        'tar -xzf ' + compressed
      ].join(' && '), {
        encoding: 'utf8'
      });
    } catch(err) {
      this.log.error('An error occurred running retrieving and extracting the template.');
      process.exit(1);
    }
    // Remove the successfully decompressed archive source.
    fs.removeSync(compressed);

    if (!fs.existsSync(dest)) {
      try {
        fs.mkdirpSync(dest);
      } catch(error) {
        this.log.error('Could not create the theme path: ' + error);
        process.exit(2);
      }
    }

    try {
      fs.renameSync(decompressed, themePathFull)
    } catch(error) {
      console.error(error);
      this.log.error('Could not move theme into position: ' + error);
      process.exit(2);
    }
  },

  install: function () {
    // if (this.options.installDeps) {
    //   console.log('Running "npm install"...');
    //   this.npmInstall();
    // }
  },

  end: function () {
    if (this.options.skipGoodbye) {
      return;
    }

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
    this.log("If you don't see your prompt, try hitting enter.");
  }
});
