import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff_engine.js';
import stylishResult from '../__fixtures__/stylish_result.js';
import plainResult from '../__fixtures__/plain_result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish json', () => {
  expect((genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish'))).toEqual(stylishResult);
});

test('stylish yaml', () => {
  expect((genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish'))).toEqual(stylishResult);
});

test('plain json', () => {
  expect((genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain'))).toEqual(plainResult);
});

test('plain yaml', () => {
  expect((genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain'))).toEqual(plainResult);
});
