const express = require('express');

const router = express.Router();
const weatherService = require('../services/weather/weather.js');
const cache = require('../tools/cache/cache');
const cacheMiddleware = require('../middlewares/cache');
const errorMiddleware = require('../middlewares/error');

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
            await cache.set(cacheKey, { ...error, isError: true });
            next(error);
        }
    },
    errorMiddleware('weather')
);

module.exports = router;
