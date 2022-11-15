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
    const lines = tree.map((child) => {
      const { type, key, value } = child;
      switch (type) {
        case 'added':
          return `Property '${getPropertyName(properties, key)}' was added with value: ${getValue(value)}`;
        case 'removed':
          return `Property '${getPropertyName(properties, key)}' was removed`;
        case 'changed': {
          const [value1, value2] = value;
          return `Property '${getPropertyName(properties, key)}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        }
        case 'unchanged':
          return [];
        case 'nested': {
          const { children } = child;
          return iter(children, [...properties, key]);
        }
        default:
          return "Can't define tree";
      }
    });
    const filtered = lines.filter((child) => child);
    return filtered.flatMap((child) => child).join('\n');
  };
  return iter(ast, []);
};

export default plain;
