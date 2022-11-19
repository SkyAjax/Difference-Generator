import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absPath1 = path.resolve(process.cwd(), filepath1);
  const absPath2 = path.resolve(process.cwd(), filepath2);
  const data1 = fs.readFileSync(absPath1);
  const data2 = fs.readFileSync(absPath2);
  const parsedData1 = parse(data1, path.extname(filepath1));
  const parsedData2 = parse(data2, path.extname(filepath2));
  const tree = buildTree(parsedData1, parsedData2);
  return formatter(tree, format);
};

export default genDiff;
