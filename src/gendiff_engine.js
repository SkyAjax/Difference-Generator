/* eslint-disable import/extensions, no-console */

import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';

const genDiff = (file1, file2) => {
  const file1Data = readFileSync(file1);
  const file2Data = readFileSync(file2);
  const parsedFile1 = parse(file1Data, path.extname(file1));
  const parsedFile2 = parse(file2Data, path.extname(file2));
  const uniqueKeys = { ...parsedFile1, ...parsedFile2 };
  const sortedObj = Object.keys(uniqueKeys)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = uniqueKeys[key];

      return accumulator;
    }, {});

  let result = '{\n';
  _.forIn(sortedObj, (value, key) => {
    if (_.has(parsedFile1, key) && !_.has(parsedFile2, key)) {
      result += `  - ${key}: ${value}\n`;
    }
    if (!_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      result += `  + ${key}: ${value}\n`;
    }
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      if ((parsedFile1[key] === value) && (parsedFile2[key] === value)) {
        result += `    ${key}: ${value}\n`;
      } else {
        result += `  - ${key}: ${parsedFile1[key]}\n`;
        result += `  + ${key}: ${value}\n`;
      }
    }
  });
  result += '}';
  console.log(result);
  return result;
};

export default genDiff;
