import _ from 'lodash';

const signs = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const getIndent = (depth, extraSpace = 0) => ' '.repeat((depth * 4) - extraSpace);

const stringify = (val, depth) => {
  const iter = (currentValue, innerDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${getIndent(innerDepth + 1)}${key}: ${iter(value, innerDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${getIndent(innerDepth)}}`,
    ].join('\n');
  };
  return iter(val, depth);
};

const stylish = (ast) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((node) => {
      const { type } = node;
      if (type === 'added') {
        const { key, value } = node;
        return `${getIndent(depth, 2)}${signs.added} ${key}: ${stringify(value, depth)}`;
      } if (type === 'removed') {
        const { key, value } = node;
        return `${getIndent(depth, 2)}${signs.removed} ${key}: ${stringify(value, depth)}`;
      } if (type === 'changed') {
        const { key, value1, value2 } = node;
        return `${getIndent(depth, 2)}${signs.removed} ${key}: ${stringify(value1, depth)}\n${getIndent(depth, 2)}${signs.added} ${key}: ${stringify(value2, depth)}`;
      } if (type === 'unchanged') {
        const { key, value } = node;
        return `${getIndent(depth)}${key}: ${stringify(value, depth)}`;
      } if (type === 'nested') {
        const { key, children } = node;
        return `${getIndent(depth, 2)}${signs.nested} ${key}: ${iter(children, depth + 1)}`;
      }
      return 'Unexpected value';
    });
    return [
      '{',
      ...lines,
      `${getIndent(depth, 4)}}`,
    ].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
