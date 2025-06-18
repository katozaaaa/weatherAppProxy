const axios = require('axios');

const {
    LOCATION_BY_IP_API_URL
} = require('../config.js');

class LocationByIPService {
    constructor() {
        this.api = axios.create({
            baseURL: LOCATION_BY_IP_API_URL
        });
    }

    async getLocationBy(ip) {
        const response = await this.api.get(`${ip}/json`)
            .catch((error) => {
                console.error(error.message);
                throw new Error('Internal server error');
            });

        const data = response.data;

        if (!data.error) {
            return data;
        }

        console.error(data.reason);
        const error = new Error(data.reason);
        error.response = {
            status: 400
        };

        throw error;
    }
}

module.exports = new LocationByIPService();
