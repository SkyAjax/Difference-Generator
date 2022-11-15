/* eslint-disable import/extensions, no-console */

import _ from 'lodash';

const buildTree = (file1, file2) => {
  const iter = (tree1, tree2) => {
    const keys1 = _.keys(tree1);
    const keys2 = _.keys(tree2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));
    return sortedKeys.map((key) => {
      if (!_.has(tree2, key)) {
        return { type: 'removed', key, value: tree1[key] };
      }
      if (!_.has(tree1, key)) {
        return { type: 'added', key, value: tree2[key] };
      }
      if (_.isObject(tree1[key]) && _.isObject(tree2[key])) {
        return { type: 'nested', key, children: iter(tree1[key], tree2[key]) };
      }
      if (tree1[key] !== tree2[key]) {
        return { type: 'changed', key, value: [tree1[key], tree2[key]] };
      }
      return { type: 'unchanged', key, value: tree1[key] };
    });
  };
  return iter(file1, file2);
};

export default buildTree;
