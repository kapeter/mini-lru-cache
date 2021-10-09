# mini-lru-cache

A simple Least Recently Used (LRU) Cache for node.js

## Installation

```
npm install mini-lru-cache --save
```

## Usage

```javascript
const cache = require('mini-lru-cache');

cache.put('name', 'bob');
console.log(cache.get('name')); // 'bob'
cache.del('name');
console.log(cache.get('name')); // null

cache.put('name', 'bob');
cache.put('age', '43');
console.log(cache.get('name')); // 'bob'
console.log(cache.get('age')); // '43'
console.log(cache.size()); // 2
cache.clear();
console.log(cache.get('name')); // null
console.log(cache.get('age')); // null
console.log(cache.size()); // 0
```

## API

### put(key: any, value: any, time: NULL | number)

Stores a value，If time isn't passed in, it is stored forever, Returns the cached value

### get(key: any)

Retrieves a value for a given key，If value isn't cached, returns `null`

### del(key: any)

Deletes a key

### clear()

Deletes all keys

### size()

Returns the current number of entries in the cache

### changeMaxSize(size: number)

Change the max number of entries in the cache, default: os.freemem() / 1024 / 2 / 10

