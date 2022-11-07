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
  const iter = (tree1, tree2, acc) => {
    const result = [];
    let newAcc = acc;
    // console.log(acc, tree1, tree2);
    const uniqueKeys = _.merge({}, tree1, tree2);
    // console.log(uniqueKeys);
    const sortedObj = Object.keys(uniqueKeys)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = uniqueKeys[key];

        return accumulator;
      }, {});
    // console.log(acc, sortedObj);
    _.forIn(sortedObj, (value, key) => {
      // console.log(_.isObject(tree1[key]) && _.isObject(tree2[key]), tree1[key], tree2[key])
      // console.log(key, _.has(tree1, key), _.has(tree2, key));
      // console.log(tree1[key], _.isObject(tree1[key]))
      if (!_.has(tree2, key)) {
        result.push({ type: 'removed', key, value });
      } else if (!_.has(tree1, key)) {
        result.push({ type: 'added', key, value });
      } else if (tree1[key] === tree2[key]) {
        result.push({ type: 'unchanged', key, value });
      } else if (_.isObject(tree1[key]) && _.isObject(tree2[key])) {
        const file1Children = tree1[key];
        // console.log(file1Children)
        const file2Children = tree2[key];
        // console.log(iter(file1Children, file2Children, newAcc += 1));
        const newValue = iter(file1Children, file2Children, newAcc += 1);
        // console.log(newValue)
        return result.push({ type: 'nested', key, value: newValue });
      } else {
        // console.log(key, tree1[key], tree2[key])
        return result.push({ type: 'changed', key, value: [tree1[key], tree2[key]] });
      }
    });
    // console.log(result[3])
    return stylish(result);
    // return JSON.stringify(result, ' ', 2);
  };
  return iter(parsedFile1, parsedFile2, 1);
};

export default genDiff;
