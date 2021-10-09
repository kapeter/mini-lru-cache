const cache = require('./index');

cache.put('name', 'bob');
console.log("get name:", cache.get('name')); // 'bob'
cache.del('name');
console.log("after del key:", cache.get('name')); // null

cache.put('name', 'bob', 1000);
console.log('get name immediately:', cache.get('name')); // 'bob'
setTimeout(() => {
  console.log('after 2000ms:', cache.get('name')); // null
}, 2000);

cache.put('name', 'bob');
cache.put('age', '43');
console.log('get name:', cache.get('name')); // 'bob'
console.log('get age:', cache.get('age')); // '43'
console.log('current size:', cache.size()); // 2
cache.clear();
console.log(cache.get('name')); // null
console.log(cache.get('age')); // null
console.log('after clear size:', cache.size()); // 0