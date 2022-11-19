import yaml from 'js-yaml';

const parse = (data, fileExt) => {
  if (fileExt.endsWith('json')) {
    return JSON.parse(data);
  }
  if (fileExt.endsWith('yaml') || fileExt.endsWith('yml')) {
    return yaml.load(data);
  }
  return 'Unsupported file format';
};

export default parse;
