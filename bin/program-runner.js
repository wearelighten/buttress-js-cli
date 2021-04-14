'use strict';

/**
 * ButtressJS CLI
 *
 * @file bin/program-runner.js
 * @description
 * @module System
 * @author Lighten
 */

const chalk = require('chalk');
const Buttress = require('buttress-js-api');
const Config = require('./config.js');

module.exports = (__execProgram) => {
  console.log(chalk.white(`Connecting to Buttress...`));

  return Buttress.init({
    buttressUrl: `${Config.auth.buttress.url}`,
    appToken: Config.auth.buttress.appToken,
    apiPath: Config.auth.buttress.apiPath,
    version: Config.auth.buttress.apiVersion,
    allowUnauthorized: (Config.auth.buttress.allowUnauthorized === 'true'),
    update: false,
  })
    .then(__execProgram)
    .then(() => console.log(chalk.white(`Program complete, exiting...`)))
    .catch((err) => {
      console.error(err);
      process.exit(-1);
    });
};