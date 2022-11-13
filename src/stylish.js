import _ from 'lodash';

const sign = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const indent = (depth) => ' '.repeat((depth * 4) - 2);
const bracketIndent = (depth) => ' '.repeat((depth * 4) - 4);

const stringify = (val, spacesCount) => {
  // console.log(val, spacesCount);
  const iter = (currentValue, depth) => {
    // console.log(!_.isObject(currentValue))
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    // console.log(currentValue)
    const innerIndent = (innerDepth) => ' '.repeat((innerDepth * 4));
    const innerBracketIndent = (innerDepth) => ' '.repeat((innerDepth * 4));
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => `${innerIndent(depth + 1)}${key}: ${iter(value, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${innerBracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(val, spacesCount);
};

const stylish = (ast) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((child) => {
      // console.log(child);
      const { type, key, value } = child;
      // console.log(type, key, _.isObject(value));
      // console.log(value)
      if (type === 'added') {
        // console.log(child);
        return `${indent(depth)}${sign.added} ${key}: ${stringify(value, depth)}`;
        // console.log(result);
      } if (type === 'removed') {
        // console.log(child);
        return `${indent(depth)}${sign.removed} ${key}: ${stringify(value, depth)}`;
        // console.log(result);
      } if (type === 'changed') {
        // console.log(child);
        const [oldValue, newValue] = value;
        return `${indent(depth)}${sign.removed} ${key}: ${stringify(oldValue, depth)}\n${indent(depth)}${sign.added} ${key}: ${stringify(newValue, depth)}`;
        // console.log(result);
      } if (type === 'unchanged') {
        // console.log(child);
        return `${indent(depth)}${sign.unchanged} ${key}: ${stringify(value, depth)}`;
        // console.log(result);
      } if (type === 'nested') {
        // console.log(child);
        return `${indent(depth)}${sign.nested} ${key}: ${iter(value, depth + 1)}`;
        // console.log(result);
      }
      return 'Unexpected value';
    });
    return [
      '{',
      ...lines,
      `${bracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
