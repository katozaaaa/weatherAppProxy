const axios = require('axios');

const {
    LOCATION_BY_LOCATION_NAME_API_URL,
    LOCATION_BY_LOCATION_NAME_API_USERNAME
} = require('../config.js');

class LocationByLocationNameService {
    constructor () {
        this.api = axios.create({
            baseURL: LOCATION_BY_LOCATION_NAME_API_URL,
            params: {
                username: LOCATION_BY_LOCATION_NAME_API_USERNAME,
                maxRows: 1
            }
        });
    }

    async getLocationBy (name) {
        try {
            const response = await this.api.get(
                'searchJSON',
                {
                    params: {
                        q: name
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Location API error:', error.message);
            throw error;
        }
    }
}

module.exports = new LocationByLocationNameService();
