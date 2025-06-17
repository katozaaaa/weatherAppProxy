const express = require('express');

const router = express.Router();
const weatherService = require('../services/weatherService.js');
const cache = require('../cache/cache');
const cacheMiddleware = require('../middlewares/cacheMiddleware');

router.get(
    '/',
    cacheMiddleware('weather'),
    async (req, res) => {
        try {
            const { lat, lon } = req.query;

            const data = await Promise.all([
                weatherService.getCurrentWeather({ lat, lon }),
                weatherService.getForecastWeather({ lat, lon })
            ]).then(
                (data) => {
                    return {
                        current: data[0],
                        forecast: data[1]
                    };
                }
            );

            const cacheKey = cache.generateKey('weather', { lat, lon });
            cache.set(cacheKey, data);

            res.json(data);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                error: error.message
            });
        }
    }
);

module.exports = router;
