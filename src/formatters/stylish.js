import _ from 'lodash';

const signs = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const getIndent = (depth) => ' '.repeat((depth * 4) - 2);
const getBracketIndent = (depth) => ' '.repeat((depth * 4) - 4);

const stringify = (val, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const getInnerIndent = (innerDepth) => ' '.repeat((innerDepth * 4));
    const getInnerBracketIndent = (innerDepth) => ' '.repeat((innerDepth * 4));
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${getInnerIndent(depth + 1)}${key}: ${iter(value, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${getInnerBracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(val, spacesCount);
};

const stylish = (ast) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((child) => {
      const { type, key, value } = child;
      if (type === 'added') {
        return `${getIndent(depth)}${signs.added} ${key}: ${stringify(value, depth)}`;
      } if (type === 'removed') {
        return `${getIndent(depth)}${signs.removed} ${key}: ${stringify(value, depth)}`;
      } if (type === 'changed') {
        const [value1, value2] = value;
        return `${getIndent(depth)}${signs.removed} ${key}: ${stringify(value1, depth)}\n${getIndent(depth)}${signs.added} ${key}: ${stringify(value2, depth)}`;
      } if (type === 'unchanged') {
        return `${getIndent(depth)}${signs.unchanged} ${key}: ${stringify(value, depth)}`;
      } if (type === 'nested') {
        const { children } = child;
        return `${getIndent(depth)}${signs.nested} ${key}: ${iter(children, depth + 1)}`;
      }
      return 'Unexpected value';
    });
    return [
      '{',
      ...lines,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
