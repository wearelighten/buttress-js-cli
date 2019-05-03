#!/usr/bin/env node
'use strict';

/**
 * ButtressJS CLI
 *
 * @file bin/cli.js
 * @description
 * @module System
 * @author Lighten
 *
 */

const program = require('commander');
const chalk = require('chalk');
const Buttress = require('buttress-js-api');
const Config = require('node-env-obj')('../');

program.version(Config.app.version)
  .option('-n, --name <name>', 'The name of the application.')
  .option('--type [type]', '[server,browser]')
  .option('--authLevel [authLevel]', '[0, 1, 2, 3]')
  .parse(process.argv);

const __execProgram = () => {
  const options = {
    name: (program.name) ? program.name : false,
    type: (program.type) ? program.type : 'server',
    authLevel: (program.authLevel) ? program.authLevel : 2
  };

  return Buttress.App.save({
    name: options.name,
    type: options.type,
    authLevel: options.authLevel
  })
    .then(app => {
      console.log(chalk.white(`Created App ${chalk.green(app.name)} with token ${chalk.green(app.token)}`));
    });
};

console.log(chalk.white(`Connecting to Buttress...`));

return Buttress.init({
  buttressUrl: `${Config.auth.buttress.url}/api/v1`,
  appToken: Config.auth.buttress.appToken
})
.then(__execProgram)
.then(() => {
  console.log(chalk.white(`Program complete, exiting...`));
})
.catch(err => {
  console.error(err);
  process.exit(-1);
});
