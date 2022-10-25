/* eslint-disable import/extensions, no-console */

import _ from 'lodash';
import { readFileSync } from 'node:fs';

const genDiff = (json1, json2) => {
  const file1 = readFileSync(json1);
  const file2 = readFileSync(json2);
  const parsedJson1 = JSON.parse(file1);
  const parsedJson2 = JSON.parse(file2);
  const uniqueKeys = { ...parsedJson1, ...parsedJson2 };
  const sortedObj = Object.keys(uniqueKeys)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = uniqueKeys[key];

      return accumulator;
    }, {});

  let result = '{\n';
  _.forIn(sortedObj, (value, key) => {
    if (_.has(parsedJson1, key) && !_.has(parsedJson2, key)) {
      result += `  - ${key}: ${value}\n`;
    }
    if (!_.has(parsedJson1, key) && _.has(parsedJson2, key)) {
      result += `  + ${key}: ${value}\n`;
    }
    if (_.has(parsedJson1, key) && _.has(parsedJson2, key)) {
      if ((parsedJson1[key] === value) && (parsedJson2[key] === value)) {
        result += `    ${key}: ${value}\n`;
      } else {
        result += `  - ${key}: ${parsedJson1[key]}\n`;
        result += `  + ${key}: ${value}\n`;
      }
    }
  });
  result += '}';
  console.log(result);
  return result;
};

export default genDiff;
