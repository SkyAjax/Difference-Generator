import yaml from 'js-yaml';

const parse = (filePath, fileExt) => {
  if (fileExt === '.json') {
    return JSON.parse(filePath);
  }
  if (fileExt === '.yaml' || fileExt === '.yml') {
    return yaml.load(filePath);
  }
  return 'Unsupported file format';
};

export default parse;
