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
  .requiredOption('--app <app>', 'OAuth app type.')
  .requiredOption('--id <id>', 'OAuth app id.')
  .requiredOption('--name <name>', 'OAuth app id.')
  .option('--token <token>', 'OAuth app token.')
  .option('--type [type]', '[server,browser]')
  .option('--authLevel [authLevel]', '[0, 1, 2, 3]')
  .action((args) => {
    return Runner(() => {
      const options = {
        app: (args.app) ? args.app : 'google',
        id: (args.id) ? args.id : null,
        name: (args.name) ? args.name : null,
        token: (args.token) ? args.token : 'test',
        email: (args.email) ? args.email : null,
        profileUrl: (args.profileUrl) ? args.profileUrl : null,
        profileImgUrl: (args.profileImgUrl) ? args.profileImgUrl : 'test',
        role: (args.role) ? args.role : null,
        domain: (args.host) ? args.host : 'test',
        authLevel: (args.authLevel) ? args.authLevel : 1
      };

      const auth = {
        app: options.app,
        id: options.id,
        name: options.name,
        token: options.token,
        email: options.email,
        profileUrl: options.profileUrl,
        profileImgUrl: options.profileImgUrl,
      };

      const token = {
        authLevel: options.authLevel,
        permissions: [{
          route: "*",
          permission: "*"
        }],
        role: options.role,
        domains: [options.domain]
      }

      console.log(chalk.white(`Creating User...`));

      return Buttress.Auth.findOrCreateUser(auth, token)
        .then(user => {
          console.log(user);
          // console.log(chalk.white(`Created App ${chalk.green(app.name)} with token ${chalk.green(app.token)}`));
        });
    })
  })
  .parse(process.argv);
