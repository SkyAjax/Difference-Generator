import _ from 'lodash';

const getValue = (value) => {
  if (!_.isObject(value)) {
    if (typeof (value) === 'string') {
      return `'${value}'`;
    }
    return value;
  }
  return '[complex value]';
};

const getPropertyName = (properties, key) => [...properties, key].join('.');

const plain = (ast) => {
  const iter = (tree, properties) => {
    const lines = tree.map((node) => {
      const { type } = node;
      switch (type) {
        case 'added': {
          const { key, value } = node;
          return `Property '${getPropertyName(properties, key)}' was added with value: ${getValue(value)}`;
        }
        case 'removed': {
          const { key } = node;
          return `Property '${getPropertyName(properties, key)}' was removed`;
        }
        case 'changed': {
          const { key, value1, value2 } = node;
          return `Property '${getPropertyName(properties, key)}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        }
        case 'unchanged':
          return null;
        case 'nested': {
          const { key, children } = node;
          return iter(children, [...properties, key]);
        }
        default:
          throw new Error("Can't define type");
      }
    });
    const filtered = lines.filter((child) => child);
    return filtered.flatMap((child) => child).join('\n');
  };
  return iter(ast, []);
};

export default plain;
