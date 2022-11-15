import path from 'path';
import { readFileSync } from 'node:fs';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './gendiff_engine.js';

const gendiff = (file1, file2, format = 'stylish') => {
  const file1Data = readFileSync(file1);
  const file2Data = readFileSync(file2);
  const parsedFile1 = parse(file1Data, path.extname(file1));
  const parsedFile2 = parse(file2Data, path.extname(file2));
  const tree = buildTree(parsedFile1, parsedFile2);
  return formatter(tree, format);
};

export default gendiff;
