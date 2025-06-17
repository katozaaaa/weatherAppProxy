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
            const { name, ip } = req.query;
            let data;
            let params;

            if (name) {
                data = await locationByLocationNameService.getLocationBy(name)
                    .then((data) => {
                        return data?.geonames[0];
                    });

                params = { name };
            } else {
                data = await locationByIPService.getLocationBy(ip);
                params = { ip };
            }

            const result = {
                lat: data.lat || data.latitude,
                lon: data.lng || data.longitude,
                placeName: data.name || data.city,
                countryName: data.countryName || data.country_name
            };

            console.log(result);

            if (
                !result.lat ||
                !result.lon ||
                (!result.placeName && !result.countryName)
            ) {
                throw new Error('Some location data is missing');
            }

            const cacheKey = cache.generateKey('location', params);
            cache.set(cacheKey, result);

            res.json(result);
        } catch (error) {
            res.status(error.response?.status || 500).json({
                error: error.message
            });
        }
    }
);

module.exports = router;
