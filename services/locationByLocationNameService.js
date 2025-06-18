const axios = require('axios');

const {
    LOCATION_BY_LOCATION_NAME_API_URL,
    LOCATION_BY_LOCATION_NAME_API_USERNAME
} = require('../config.js');

class LocationByLocationNameService {
    constructor() {
        this.api = axios.create({
            baseURL: LOCATION_BY_LOCATION_NAME_API_URL,
            params: {
                username: LOCATION_BY_LOCATION_NAME_API_USERNAME,
                maxRows: 1
            }
        });
    }

    async getLocationBy(name) {
        const response = await this.api.get(
            'searchJSON',
            {
                params: {
                    q: name
                }
            }
        ).catch((error) => {
            console.error(error.message);
            throw new Error('Internal server error');
        });

        const data = response.data;

        if (data.status || data.totalResultsCount === 0) {
            if (data.totalResultsCount === 0) {
                console.error('No location found');
            } else {
                console.error(
                    data.status.message ||
                    'Error in getting location data by name'
                );

                if (data.status.value !== 15) {
                    throw new Error('Internal server error');
                }
            }

            const error = new Error('No location found');
            error.response = {
                status: 404
            };

            throw error;
        }

        return data.geonames[0];
    }
}

module.exports = new LocationByLocationNameService();
