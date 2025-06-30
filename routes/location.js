const express = require('express');

const router = express.Router();
const locationService = require('../services/location/location.js');
const cache = require('../tools/cache/cache');
const cacheMiddleware = require('../middlewares/cache');
const errorMiddleware = require('../middlewares/error');

router.get(
    '/',
    cacheMiddleware('location'),
    async(req, res, next) => {
        const params = req.query;
        const cacheKey = cache.generateKey('location', params);

        try {
            const data = await locationService.getLocation(params);
            await cache.set(cacheKey, data);
            res.json(data);
        } catch (error) {
            await cache.set(cacheKey, { ...error, isError: true });
            next(error);
        }
    },
    errorMiddleware('location')
);

module.exports = router;
