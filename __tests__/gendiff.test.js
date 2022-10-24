import genDiff from '../src/gendiff_engine';

test('gendiff', () => {
  expect(genDiff(__fixtures/file1.json, __fixtures/file2.json)).toEqual('{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }');
});
