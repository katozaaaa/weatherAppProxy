const express = require('express');

const router = express.Router();
const locationByIPService = require('../services/external/locationByIP.js');
const locationByLocationNameService = require('../services/external/locationByLocationName.js');
const cache = require('../services/cache/cache');
const cacheMiddleware = require('../middlewares/cache');
const errorMiddleware = require('../middlewares/error');
const AppError = require('../errors/appError');

router.get(
    '/',
    cacheMiddleware('location'),
    async(req, res, next) => {
        const { name, ip } = req.query;
        let params;

        try {
            let data;

            if (name) {
                params = { name };
                data = await locationByLocationNameService.getLocationBy(name);
            } else {
                params = { ip };
                data = await locationByIPService.getLocationBy(ip);
            }

            const cacheKey = cache.generateKey('location', params);
            await cache.set(cacheKey, data);

            res.json(data);
        } catch (error) {
            let data;

            if (error instanceof AppError) {
                data = {
                    message: error.message,
                    internalMessage: error.internalMessage,
                    status: error.status
                };
            } else {
                data = {
                    message: 'Internal server error',
                    internalMessage: error.message,
                    status: 500
                };
            }

            const cacheKey = cache.generateKey('location', params);
            await cache.set(cacheKey, { ...data, isError: true });

            next(new AppError(data));
        }
    },
    errorMiddleware('location')
);

module.exports = router;
