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
  .command('register', 'Register data sharing between two applications')
  .parse(process.argv);
