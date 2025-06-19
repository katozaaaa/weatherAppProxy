const axios = require('axios');

const AppError = require('../../errors/appError');
const {
    LOCATION_BY_LOCATION_NAME_API_URL,
    LOCATION_BY_LOCATION_NAME_API_USERNAME
} = require('../../config/config.js');

class LocationByLocationName {
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
            throw new AppError({
                message: 'Internal server error',
                internalMessage: error.message
            });
        });

        const data = response.data;

        if (data.totalResultsCount === 0) {
            throw new AppError({
                message: 'No location found',
                internalMessage: 'No location found',
                status: 404
            });
        }

        /**
         * Handling error statuses of the service
         * Documentation: https://www.geonames.org/export/webservice-exception.html
         * */
        if (data.status) {
            if (data.status.value === 15) {
                throw new AppError({
                    message: 'No location found',
                    internalMessage: data.status.message ||
                        'Error in getting location data by name',
                    status: 404
                });
            }

            throw new AppError({
                message: 'Internal server error',
                internalMessage: data.status.message ||
                    'Error in getting location data by name'
            });
        }

        const location = data.geonames[0];

        if (
            !location.lat ||
            !location.lng ||
            (!location.name && !location.countryName)
        ) {
            throw new AppError({
                message: 'Bad request',
                internalMessage: 'Some location data is missing',
                status: 400
            });
        }

        return {
            lat: location.lat,
            lon: location.lng,
            placeName: location.name,
            countryName: location.countryName
        };
    }
}

module.exports = new LocationByLocationName();
