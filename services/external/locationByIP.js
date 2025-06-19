const axios = require('axios');

const AppError = require('../../errors/appError');
const {
    LOCATION_BY_IP_API_URL
} = require('../../config/config.js');

class LocationByIP {
    constructor() {
        this.api = axios.create({
            baseURL: LOCATION_BY_IP_API_URL
        });
    }

    async getLocationBy(ip) {
        const response = await this.api.get(`${ip}/json`)
            .catch((error) => {
                throw new AppError({
                    message: 'Internal server error',
                    internalMessage: error.message
                });
            });

        const data = response.data;

        /**
         * Handling error statuses of the service
         * Documentation: https://ipapi.co/api/#errors
         * */
        if (data.error) {
            throw new AppError({
                message: data.reason,
                internalMessage: data.reason,
                status: 400
            });
        }

        if (
            !data.latitude ||
            !data.longitude ||
            (!data.city && !data.country_name)
        ) {
            throw new AppError({
                message: 'Bad request',
                internalMessage: 'Some location data is missing',
                status: 400
            });
        }

        return {
            lat: data.latitude,
            lon: data.longitude,
            placeName: data.city,
            countryName: data.country_name
        };
    }
}

module.exports = new LocationByIP();
