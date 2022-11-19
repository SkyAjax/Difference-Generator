import _ from 'lodash';

const buildTree = (tree1, tree2) => {
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
      return { type: 'nested', key, children: buildTree(tree1[key], tree2[key]) };
    }
    if (tree1[key] !== tree2[key]) {
      return {
        type: 'changed', key, value1: tree1[key], value2: tree2[key],
      };
    }
    return { type: 'unchanged', key, value: tree1[key] };
  });
};

export default buildTree;
