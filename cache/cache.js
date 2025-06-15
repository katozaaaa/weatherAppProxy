const cache = require('memory-cache');
const { CACHE_DURATION } = require('../config.js');

class WeatherCache {
    get(key) {
        return cache.get(key);
    }

    set(key, value, duration = CACHE_DURATION) {
        return cache.put(key, value, duration);
    }

    generateKey(method, params) {
        return `${method}:${JSON.stringify(params)}`;
    }
}

module.exports = new WeatherCache();