const express = require('express');
const router = express.Router();
const locationByIPService = require('../services/locationByIPService.js');
const locationByLocationNameService = require('../services/locationByLocationNameService.js');
const cache = require('../cache/cache');
const cacheMiddleware = require('../middlewares/cacheMiddleware');

router.get(
    '/',
    cacheMiddleware('location'),
    async (req, res) => {
        try {
            const { name } = req.query;
            let data;

            if (name) {
                data = await locationByLocationNameService.getLocationBy(name)
                    .then(
                        (data) => {
                            const location = data.geonames[0];

                            if (
                                location.lat && location.lng &&
                                (location.name || location.countryName)
                            ) {
                                return {
                                    lat: location.lat,
                                    lon: location.lng,
                                    name: location.name,
                                    countryName: location.countryName,
                                }
                            } else {
                                throw new Error('Location data is missing');
                            }
                        },
                        (error) => {
                            throw error;
                        }
                    );

                const cacheKey = cache.generateKey('location', { name });
                cache.set(cacheKey, data);
            } else {
                const ip = '178.66.158.237' || req.headers['x-forwarded-for'] || req.ip;

                data = await locationByIPService.getLocationBy(ip)
                    .then(
                        (data) => {
                            if (
                                data['latitude'] && data['longitude'] &&
                                (data['city'] || data['country_name'])
                            ) {
                                return {
                                    lat: data['latitude'],
                                    lon: data['longitude'] ,
                                    name: data['city'],
                                    countryName: data['country_name'],
                                }
                            } else {
                                throw new Error('Location data is missing');
                            }
                        },
                        (error) => {
                            throw error;
                        }
                    );
            }

            res.json(data);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                error: error.message
            });
        }
    }
);

module.exports = router;
