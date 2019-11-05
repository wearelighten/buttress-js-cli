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

console.log(chalk.white(`${Config.app.title} Tools v${Config.app.version}...`));

program.version(Config.app.version)
  .command('app', 'App related commands')
  .command('auth', 'Auth related commands')
  .parse(process.argv);