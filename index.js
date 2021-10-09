/*
 * @Desc: LRU Cache
 * @Date: 2021-09-28 19:31:52
 * @Last Modified time: 2021-10-08 16:42:41
 */
'use strict';

const os = require('os');

class LRUCache {
  /**
   * Creates an instance of LRUCache.
   * @memberof LRUCache
   */
  constructor() {
    this._size = this._calcSize();
    this._cache = new Map();
  }
  /**
   * @description calculate size
   * @return {Number} - size
   * @memberof LRUCache
   */
  _calcSize() {
    const mem_free = os.freemem();
    const mem_free_kb = mem_free / 1024;
    return parseInt(mem_free_kb / 2 / 10);
  }
  /**
   * @description get size
   * @param {Number} size - size
   * @memberof LRUCache
   */
  size() {
    return this._cache.size;
  }
  /**
   * @description change size
   * @return {Number} - size
   * @memberof LRUCache
   */
  changeMaxSize(size) {
    this._size = size;
  }
  /**
   * @description insert cache
   * @param {String} key - key
   * @param {Any} value - value
   * @param {Number} time - cache time，ms
   * @memberof LRUCache
   */
  put(key, value, time) {
    if (this._cache.size >= this._size) {
      this._cache.delete(this._cache.keys().next().value);
    }
    const record = {
      value,
      expire: time + Date.now(),
    };
    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(() => {
        this.del(key);
      }, time);
    }
    this._cache.set(key, record);
    return record;
  }

  /**
   * @description delete cache
   * @param {String} key - key
   * @memberof LRUCache
   */
  del(key) {
    const record = this._cache.get(key);
    if (record) {
      if (record.timeout) {
        clearTimeout(record.timeout);
      }
      this._cache.delete(key);
    }
  }
  /**
   * @description get cache value
   * @param {String} key - key
   * @return {Any} - value
   * @memberof LRUCache
   */
  get(key) {
    const record = this._cache.get(key);
    if (typeof record !== 'undefined') {
      if (isNaN(record.expire) || record.expire >= Date.now()) {
        const value = record.value;
        this.del(key);
        this.put(key, value, record.expire - Date.now())
        return value;
      }
      this.del(key);
    }
    return null;
  }
  /**
   * @description clear cache
   * @memberof LRUCache
   */
  clear() {
    for (const key of this._cache.keys()) {
      this.del(key);
    }
  }
}

module.exports = new LRUCache();