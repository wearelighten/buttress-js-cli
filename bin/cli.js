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
const Config = require('node-env-obj')('./');

program.version(Config.app.version)
  .option('-f, --fix-types', 'Fix-up tender meters')
  .option('--limit <n>', 'Limit number of tenders to process', parseInt)
  .option('--dry-run', 'Dry run, no live data writes')
  .option('--integrity', 'Check data integrity against app schema')
  .option('--verbose', 'Verbose mode')
  .option('--csv', 'Export out as csv')
  .parse(process.argv);

const __execProgram = () => {
  const options = {
    preview: (program.preview) ? program.preview : false,
    dryRun: (program.dryRun) ? program.dryRun : false,
    limit: (program.limit) ? program.limit : false,
    verbose: (program.verbose) ? program.verbose : false,
    csv: (program.csv) ? program.csv : false
  };

  let promises = {
    checkDataIntegrity: null,
  };

  if (program.checkDataIntegrity) {
    promises.checkDataIntegrity = processCheckDataIntegrity(options);
  }

  let tasks = [];
  for (let p in promises) {
    if (!promises.hasOwnProperty(p)) continue;
    tasks.push(promises[p]);
  }

  return tasks.reduce((prev, curr) => {
    return prev.then(() => curr);
  }, Promise.resolve());
};

const processCheckDataIntegrity = (supply, options) => {

};

console.log(chalk.white(`Initialising ${Config.app.title} process...`));


new Promise(resolve => {
  Buttress.init({
    buttressUrl: `${Config.auth.buttress.url}/api/v1`,
    appToken: Config.auth.buttress.appToken
  });

  resolve();
})
.then(__execProgram)
.catch(err => {
  console.error(err);
  process.exit(-1);
});
