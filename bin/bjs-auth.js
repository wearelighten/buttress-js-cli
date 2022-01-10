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
const Config = require('./config.js');

program.version(Config.app.version)
  .command('create', 'Create a user with a token')
  .parse(process.argv);