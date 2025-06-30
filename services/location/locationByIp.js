const axios = require('axios');

const AppError = require('../../exceptions/appError');
const {
    LOCATION_BY_IP_API_URL
} = require('../../config/config.js');

class LocationByIp {
    constructor() {
        this.api = axios.create({
            baseURL: LOCATION_BY_IP_API_URL
        });
    }

    async getLocationBy(ip) {
        const response = await this.api.get(`${ip}/json`);
        const data = response.data;
        this._validateData(data);

        return {
            lat: data.latitude,
            lon: data.longitude,
            placeName: data.city,
            countryName: data.country_name
        };
    }

    _validateData(data) {
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
    }
}

module.exports = new LocationByIp();
