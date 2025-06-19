const axios = require('axios');

const AppError = require('../../errors/appError');
const {
    WEATHER_API_URL,
    WEATHER_API_KEY
} = require('../../config/config.js');

class Weather {
    constructor() {
        this.api = axios.create({
            baseURL: WEATHER_API_URL,
            params: {
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });
    }

    async getWeather(type, params) {
        try {
            const response = await this.api.get(
                `/${type}`, { params }
            );

            return response.data;
        } catch (error) {
            if (error.response.status === 404) {
                throw new AppError({
                    message: 'No weather data was found for this location',
                    internalMessage: error.message
                });
            }

            throw new AppError({
                message: 'Internal server error',
                internalMessage: error.message
            });
        }
    }
}

module.exports = new Weather();
