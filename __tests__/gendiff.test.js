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
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yml'],
  ['file1.json', 'file2.json', 'stylish', stylishResult],
  ['file1.yaml', 'file2.yml', 'stylish', stylishResult],
  ['file1.json', 'file2.json', 'plain', plainResult],
  ['file1.yaml', 'file2.yml', 'plain', plainResult],
  ['file1.json', 'file2.json', 'json', jsonResult],
  ['file1.yaml', 'file2.yml', 'json', jsonResult],
])(('comparing %s, %s with %s output'), (file1, file2, format = 'stylish', expected = stylishResult) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);
  expect(genDiff(filePath1, filePath2, format)).toEqual(expected);
});
