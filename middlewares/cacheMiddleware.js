const cache = require('../cache/cache');

function cacheMiddleware(method) {
    return async (req, res, next) => {
        const params = { ...req.query, ...req.params };
        const cacheKey = cache.generateKey(method, params);

        try {
            const cachedData = cache.get(cacheKey);
            if (cachedData) {
                console.log('Cache hit for', cacheKey);
                return res.json(cachedData);
            }

            console.log('Cache miss for', cacheKey);
            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = cacheMiddleware;