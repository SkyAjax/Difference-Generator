import yaml from 'js-yaml';
import path from 'path';

const parse = (data, filePath) => {
  const fileExt = path.extname(filePath);
  if (fileExt.endsWith('json')) {
    return JSON.parse(data);
  }
  if (fileExt.endsWith('yaml') || fileExt.endsWith('yml')) {
    return yaml.load(data);
  }
  return 'Unsupported file format';
};

export default parse;
