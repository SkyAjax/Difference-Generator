#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/gendiff_engine.js';
import path from 'path';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const absPath1 = path.resolve(process.cwd(), filepath1);
    const absPath2 = path.resolve(process.cwd(), filepath2);
    genDiff(absPath1, absPath2);
  })

program.parse();