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

const fs = require('fs');

const program = require('commander');
const chalk = require('chalk');
const Config = require('./config.js');

console.log(chalk.white(`${chalk.bold(Config.app.title)} Tools v${chalk.bold(Config.app.version)}...`));
console.log(chalk.white(`URL: ${chalk.green(`${Config.auth.buttress.url}/${Config.auth.buttress.apiPath}`)} Token: ${chalk.green(Config.auth.buttress.appToken)}`));

program.version(Config.app.version);

program.command('app', 'App related commands');
program.command('auth', 'Auth related commands');

program.command('help', { isDefault: true })
  .action(() => program.help());

program.command('list')
  .description('List out existing connections')
  .action(() => listStore());

program.command('connect')
  .description('Connect to an instance')
  .argument('[url]', 'URL of the buttress instance')
  .argument('[token]', 'Auth token')
  .argument('[apiPath]', 'API path of the app')
  .action((url, token, apiPath) => {
    let idx = (url && !token) ? parseInt(url) : null;

    const isAddition = (idx === null || isNaN(idx));

    if (isAddition) {
      if (!url) return console.error(`error: missing required argument 'url'`);
      if (!token) return console.error(`error: missing required argument 'token'`);
      if (!apiPath) return console.error(`error: missing required argument 'apiPath'`);

      url = url.endsWith('/') ? url.slice(0, -1) : url;
    }

    const store = getStore();

    if (isAddition) {
      idx = store.connections.findIndex((c) => c.url === url && c.token === token && c.apiPath === apiPath);

      if (idx === -1) {
        store.connections.push({url, token, apiPath});
        idx = store.connections.length - 1;
        console.log('');
        console.log(`Connection details have been saved, you can now use '${chalk.bold(`bjs connect ${idx}`)}' to connect in the future.`);
      }
    }

    if (!store.connections[idx]) {
      return console.error(`error: unable to find connection with id '${idx}'`);
    }

    store.lastConnection = idx;

    writeStore(store);

    console.log('');

    console.log(chalk.white(`Now connected to ${chalk.green(`${Config.auth.buttress.url}/${Config.auth.buttress.apiPath}`)} using ${chalk.green(Config.auth.buttress.appToken)}`));
  });

program.command('delete')
  .description('Delete some stored connection details')
  .argument('<idx>', 'Index of the stored connection')
  .action((idx) => {
    const store = getStore();

    store.connections.splice(idx, 1);

    writeStore(store);

    listStore();
  });

const getStore = () => {
  let store = {
    lastConnection: null,
    connections: [],
  };

  try {
    store = fs.readFileSync(`.connections`, 'utf8');
    store = JSON.parse(store);
  } catch(err) {
    if (err.code === 'ENOENT') {}
    else {
      throw err;
    }
  }

  return store;
};

const writeStore = (store) => {
  try {
    fs.writeFileSync(`.connections`, JSON.stringify(store));
  } catch (err) {
    console.error(err);
  }
}

const listStore = () => {
  const store = getStore();

  console.log('');
  console.log('idx | url | token | apiPath');
  console.log('---------------------------');

  store.connections.forEach((connection, idx) => {
    console.log(`${idx} ${connection.url} ${connection.token} ${connection.apiPath}`);
  });
};

program.parse();