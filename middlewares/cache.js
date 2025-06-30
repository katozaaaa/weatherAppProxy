const cache = require('../tools/cache/cache');
const AppError = require('../exceptions/appError');

function cacheMiddleware(path) {
    return async(req, res, next) => {
        const params = { ...req.query, ...req.params };
        const cacheKey = cache.generateKey(path, params);

        try {
            const data = cache.get(cacheKey);

            if (!data) {
                console.log(`[CACHE MISS] key=${cacheKey}`);
                next();
                return;
            }

            if (data.isError) {
                console.log(`[CACHE HIT WITH ERROR] key=${cacheKey}`);

                throw new AppError({
                    message: data.message,
                    internalMessage: data.internalMessage,
                    status: data.status
                });
            }

            console.log(`[CACHE HIT] key=${cacheKey}`);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = cacheMiddleware;
