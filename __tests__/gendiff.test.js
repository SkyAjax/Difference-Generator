import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff_engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff.json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result);
});

test('gendiff.yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toEqual(result);
});
