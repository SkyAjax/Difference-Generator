/* eslint-disable import/extensions, no-console */

import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import stylish from './stylish.js';

const genDiff = (file1, file2) => {
  const file1Data = readFileSync(file1);
  const file2Data = readFileSync(file2);
  const parsedFile1 = parse(file1Data, path.extname(file1));
  const parsedFile2 = parse(file2Data, path.extname(file2));
  const iter = (tree1, tree2) => {
    const keys1 = _.keys(tree1);
    const keys2 = _.keys(tree2);
    // console.log(acc, tree1, tree2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));
    // console.log(sortedObj);
    return sortedKeys.map((key) => {
      if (!_.has(tree2, key)) {
        return { type: 'removed', key, value: tree1[key] };
      }
      if (!_.has(tree1, key)) {
        return { type: 'added', key, value: tree2[key] };
      }
      if (_.isObject(tree1[key]) && _.isObject(tree2[key])) {
        // console.log(iter(file1Children, file2Children, newAcc += 1));
        // console.log(newValue)
        return { type: 'nested', key, value: iter(tree1[key], tree2[key]) };
      }
      if (tree1[key] !== tree2[key]) {
        // console.log(key, tree1[key], tree2[key])
        return { type: 'changed', key, value: [tree1[key], tree2[key]] };
      }
      return { type: 'unchanged', key, value: tree1[key] };
    });
  };
  return iter(parsedFile1, parsedFile2, 1);
};

export default genDiff;
