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

const Config = require('./config');
const Runner = require('./program-runner');

program.version(Config.app.version)
  .requiredOption('-n, --name <name>', 'Name of the app to be created')
  .option('--type [type]', '[server,browser]')
  .option('--authLevel [authLevel]', '[0, 1, 2, 3]')
  .action((args) => {
    return Runner(() => {
      const options = {
        name: (args.name) ? args.name : null,
        type: (args.type) ? args.type : 'server',
        authLevel: (args.authLevel) ? args.authLevel : 2
      };
    
      return Buttress.App.save({
        name: options.name,
        type: options.type,
        authLevel: options.authLevel
      })
        .then((result) => {
          if (!result) {
            console.log(chalk.red(`Failed to create app`));
            return;
          }
    
          console.log(chalk.white(`Created App ${chalk.green(result.name)} with token ${chalk.green(result.token)}`));
        });
    });
  })
  .parse(process.argv);