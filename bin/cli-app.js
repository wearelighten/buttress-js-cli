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
const Config = require('node-env-obj')('../');

program.version(Config.app.version)
  .command('create', 'Create a app & a token')
  .parse(process.argv);