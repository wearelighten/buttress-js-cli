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
const Buttress = require('@buttress/api');

const Config = require('./config');
const Runner = require('./program-runner');

program.version(Config.app.version)
  .argument('<name>', 'Name for the data sharing agreement')
  .argument('<url>', 'URL of the buttress instance')
  .argument('[token]', 'Registration token')
  .option('--appId [appId]', 'Local App Id that the data sharing agreement should be setup for')
  .action((name, url, token, args) => {
    return Runner(async () => {
      try {
        url = new URL(url);
      } catch(err) {
        if (err.code === 'ERR_INVALID_URL') return console.error(`error: invalid argument 'url', please provide a valid URL`);
        throw err;
      }

      const endpoint = url.origin;
      const pathParts = url.pathname.split('/').filter((s) => s);

      if (pathParts.length < 1) {
        return console.error(`error: invalid argument 'url', the URL must contain an app API path`);
      }

      const res = await Buttress.App.registerDataSharing({
        name: name,

        remoteApp: {
          endpoint: endpoint,
          apiPath: pathParts.join('/'),
          token: (token) ? token : null,
        },

        dataSharing: { localApp: null, remoteApp: null },

        _appId: (args.appId) ? args.appId : null,
      });

      console.log('')

      console.log(`Data sharing agreement has been created with the name ${chalk.green(res.name)}`);

      if (!res.active) {
        console.log(`The data sharing agreement won't become active until the agreement has been setup on the remote app`);
        console.log(`To do this please give the following registration token to the app owner.`);
        console.log(`Registration Token: ${chalk.green(res.remoteAppToken)}`);
        console.log('');
      }
    });
  })
  .parse(process.argv);