const memoryCache = require('memory-cache');

const { CACHE_DURATION } = require('../../config/config.js');

class Cache {
    get(key) {
        return memoryCache.get(key);
    }

    set(key, value, duration = CACHE_DURATION) {
        return memoryCache.put(key, value, duration);
    }

    generateKey(path, params) {
        return `${path}:${JSON.stringify(params)}`;
    }
}

module.exports = new Cache();
