const result = '[{"type":"nested","key":"common","children":[{"type":"added","key":"follow","value":false},{"type":"unchanged","key":"setting1","value":"Value 1"},{"type":"removed","key":"setting2","value":200},{"type":"changed","key":"setting3","value":[true,null]},{"type":"added","key":"setting4","value":"blah blah"},{"type":"added","key":"setting5","value":{"key5":"value5"}},{"type":"nested","key":"setting6","children":[{"type":"nested","key":"doge","children":[{"type":"changed","key":"wow","value":["","so much"]}]},{"type":"unchanged","key":"key","value":"value"},{"type":"added","key":"ops","value":"vops"}]}]},{"type":"nested","key":"group1","children":[{"type":"changed","key":"baz","value":["bas","bars"]},{"type":"unchanged","key":"foo","value":"bar"},{"type":"changed","key":"nest","value":[{"key":"value"},"str"]}]},{"type":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"added","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

export default result;
