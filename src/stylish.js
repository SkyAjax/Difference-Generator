import _ from 'lodash';

const sign = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  nested: ' ',
};

const indent = (depth) => ' '.repeat((depth * 4) - 2);
const bracketIndent = (depth) => ' '.repeat((depth * 4) - 4);

// const stringify = (val, spacesCount = 2) => {
//   if (!_.isObject(val)) {
//     return `${val}`;
//   }
//   const result = [];
//   const iter = (currentValue, depth) => {
//     // console.log(currentValue)
//     const currentIndent = indent(depth);
//     const bracketIndent = indent(depth) - spacesCount;
//     const lines = currentValue.map((child) => {
//        const { key, value } = child;
//       //  console.log(value);
//       result.push(`${currentIndent}${key}: ${iter(value, depth + 1)}`);
//     });
//     return [
//       '{',
//       ...result,
//       `${bracketIndent}}`,
//     ].join('\n');
//   }
//   return iter(val, 1);
// };

const stylish = (ast) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((child) => {
      // console.log(child);
      const { type, key, value } = child;
      console.log(type, key, _.isObject(value));
      const finValue = _.isObject(value) && value !== null ? value : iter(value, depth + 1);
      console.log(finValue)
      // console.log(value)
      if (type === 'added') {
        // console.log(child);
        return `${indent(depth)}${sign.added} ${key}: ${value}`;
        // console.log(result);
      } if (type === 'removed') {
        // console.log(child);
        return `${indent(depth)}${sign.removed} ${key}: ${value}`;
        // console.log(result);
      } if (type === 'changed') {
        // console.log(child);
        const [oldValue, newValue] = value;
        return `${indent(depth)}${sign.removed} ${key}: ${oldValue}\n${indent(depth)}${sign.added} ${key}: ${newValue}`;
        // console.log(result);
      } if (type === 'unchanged') {
        // console.log(child);
        return `${indent(depth)}${sign.unchanged} ${key}: ${value}`;
        // console.log(result);
      } if (type === 'nested') {
        // console.log(child);
        return `${indent(depth)}${sign.nested} ${key}: ${iter(value, depth + 1)}`;
        // console.log(result);
      }
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
