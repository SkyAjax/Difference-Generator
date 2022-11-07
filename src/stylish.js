import _ from 'lodash';

const sign = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const indent = (depth) => ' '.repeat((depth * 4) - 2);

const stringify = (val, spacesCount = 2) => {
  if (!_.isObject(val)) {
    return `${val}`;
  }
  const result = [];
  const iter = (currentValue, depth) => {
    // console.log(currentValue)
    const currentIndent = indent(depth);
    const bracketIndent = indent(depth) - spacesCount;
    const lines = currentValue.map((child) => {
       const { key, value } = child;
      //  console.log(value);
      result.push(`${currentIndent}${key}: ${iter(value, depth + 1)}`);
    });
    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  }
  return iter(val, 1);
};

const stylish = (ast) => {
  let result = '';
  const iter = (currentValue, depth) => {
    currentValue.map((child) => {
      console.log(child);
      const { type, key, value } = child;
      // console.log(value)
      if (type === 'added') {
        // console.log(child);
        result += (`${indent(depth)}${sign.added} ${key}: ${stringify(value, depth)}`);
        // console.log(result);
      } else if (type === 'removed') {
        // console.log(child);
        result += (`${indent(depth)}${sign.removed} ${key}: ${stringify(value, depth)}`);
        // console.log(result);
      } else if (type === 'changed') {
        // console.log(child);
        const [oldValue, newValue] = value;
        result += (`${indent(depth)}${sign.removed} ${key}: ${stringify(oldValue, depth)}`);
        result += (`${indent(depth)}${sign.removed} ${key}: ${stringify(newValue, depth)}`);
        // console.log(result);
      } else if (type === 'unchanged') {
        // console.log(child);
        result += (`${indent(depth)}${sign.unchanged} ${key}: ${stringify(value, depth)}`);
        // console.log(result);
      } else if (type === 'nested') {
        // console.log(child);
        result += (`${indent(depth)}${sign.nested} ${key}: { ${iter(value, depth + 1)}`);
        // console.log(result);
      }
      return result;
    });
  };
  iter(ast, 1);
};

export default stylish;
