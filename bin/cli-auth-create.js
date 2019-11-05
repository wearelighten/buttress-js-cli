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
  .option('--app <app>', 'OAuth app type.')
  .option('--id <id>', 'OAuth app id.')
  .option('--token <token>', 'OAuth app token.')
  .option('--type [type]', '[server,browser]')
  .option('--authLevel [authLevel]', '[0, 1, 2, 3]')
  .parse(process.argv);

const __execProgram = () => {
  const required = [
    'app',
    'id',
    'name',
  ];
  const options = {
    app: (program.app) ? program.app : 'google',
    id: (program.id) ? program.id : null,
    name: (program.name) ? program.name : null,
    token: (program.token) ? program.token : 'test',
    email: (program.email) ? program.email : null,
    profileUrl: (program.profileUrl) ? program.profileUrl : null,
    profileImgUrl: (program.profileImgUrl) ? program.profileImgUrl : 'test',
    role: (program.role) ? program.role : null,
    domain: (program.host) ? program.host : 'test',
    authLevel: (program.authLevel) ? program.authLevel : 1
  };

  Object.keys(options).forEach(key => {
    if ( !options[key] && required.includes(key) ) {
      throw new Error(`Missing option: --${key}`);
    }
  });

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
};

console.log(chalk.white(`Connecting to Buttress...`));

return Buttress.init({
  buttressUrl: `${Config.auth.buttress.url}`,
  appToken: Config.auth.buttress.appToken,
  apiPath: Config.auth.buttress.apiPath,
  version: Config.auth.buttress.apiVersion
})
.then(__execProgram)
.then(() => {
  console.log(chalk.white(`Program complete, exiting...`));
})
.catch(err => {
  console.error(err);
  process.exit(-1);
});
