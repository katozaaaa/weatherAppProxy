const express = require('express');

const router = express.Router();
const weatherService = require('../services/external/weather.js');
const cache = require('../services/cache/cache');
const cacheMiddleware = require('../middlewares/cache');
const errorMiddleware = require('../middlewares/error');
const AppError = require('../errors/appError');

router.get(
    '/',
    cacheMiddleware('weather'),
    async(req, res, next) => {
        const { lat, lon } = req.query;
        const cacheKey = cache.generateKey('weather', { lat, lon });

        try {
            const [
                currentWeather,
                forecastWeather
            ] = await Promise.all([
                weatherService.getWeather('weather', { lat, lon }),
                weatherService.getWeather('forecast', { lat, lon })
            ]);

            const data = {
                current: currentWeather,
                forecast: forecastWeather
            };

            await cache.set(cacheKey, data);
            return res.json(data);
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

            await cache.set(cacheKey, { ...data, isError: true });
            next(new AppError(data));
        }
    },
    errorMiddleware('weather')
);

module.exports = router;
