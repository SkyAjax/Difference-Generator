import yaml from 'js-yaml';

const parse = (data, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(data);
  }
  if (fileFormat === 'yaml' || fileFormat === 'yml') {
    return yaml.load(data);
  }
  return `Unsupported file format: ${fileFormat}`;
};

export default parse;
