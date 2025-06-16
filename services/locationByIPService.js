const axios = require('axios');

const {
    LOCATION_BY_IP_API_URL,
} = require('../config.js');

class LocationByIPService {
    constructor () {
        this.api = axios.create({
            baseURL: LOCATION_BY_IP_API_URL,
        });
    }

    async getLocationBy(ip) {
        try {
            const response = await this.api.get(`${ip}/json`);
            return response.data;
        } catch (error) {
            console.error('Location API error:', error.message);
            throw error;
        }
    }
}

module.exports = new LocationByIPService();
