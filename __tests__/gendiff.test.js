import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import stylishResult from '../__fixtures__/stylish_result.js';
import plainResult from '../__fixtures__/plain_result.js';
import jsonResult from '../__fixtures__/json_result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json')],
  [getFixturePath('file1.yaml'), getFixturePath('file2.yml')],
])('default', (data1, data2, format = 'stylish', expected = stylishResult) => {
  expect(genDiff(data1, data2, format)).toEqual(expected);
});

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish', stylishResult],
  [getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish', stylishResult],
])('stylish', (data1, data2, format = 'stylish', expected = stylishResult) => {
  expect(genDiff(data1, data2, format)).toEqual(expected);
});

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain', plainResult],
  [getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain', plainResult],
])('plain', (data1, data2, format = 'stylish', expected = stylishResult) => {
  expect(genDiff(data1, data2, format)).toEqual(expected);
});

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'json', jsonResult],
  [getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json', jsonResult],
])('json', (data1, data2, format = 'stylish', expected = stylishResult) => {
  expect(genDiff(data1, data2, format)).toEqual(expected);
});
