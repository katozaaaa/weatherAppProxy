const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService.js');
const cache = require('../cache/cache');
const cacheMiddleware = require('../middlewares/cacheMiddleware');

const getHandler = (method, getter)=> {
    return async (req, res) => {
        try {
            const { lat, lon } = req.query;
            const data = await getter({ lat, lon });

            const cacheKey = cache.generateKey(method, { lat, lon });
            cache.set(cacheKey, data);

            res.json(data);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                error: error.message
            });
        }
    }
}

router.get(
    '/current',
    cacheMiddleware('current'),
    getHandler('current', weatherService.getCurrentWeather.bind(weatherService)),
);

router.get(
    '/forecast',
    cacheMiddleware('forecast'),
    getHandler('forecast', weatherService.getForecastWeather.bind(weatherService)),
);

module.exports = router;