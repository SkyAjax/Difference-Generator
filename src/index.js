import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

const buildPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (absolutePath) => {
  const data = fs.readFileSync(absolutePath);
  const parsedData = parse(data, absolutePath);
  return parsedData;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = buildPath(filepath1);
  const absolutePath2 = buildPath(filepath2);
  const parsedData1 = readFile(absolutePath1);
  const parsedData2 = readFile(absolutePath2);
  const tree = buildTree(parsedData1, parsedData2);
  return formatter(tree, format);
};

export default genDiff;
