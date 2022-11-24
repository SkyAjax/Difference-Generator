import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

const buildPath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (absolutePath) => {
  const data = fs.readFileSync(absolutePath);
  const fileFormat = path.extname(absolutePath);
  const parsedData = parse(data, fileFormat.slice(1));
  return parsedData;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = buildPath(filepath1);
  const absolutePath2 = buildPath(filepath2);
  const data1 = getData(absolutePath1);
  const data2 = getData(absolutePath2);
  const tree = buildTree(data1, data2);
  return formatter(tree, format);
};

export default genDiff;
