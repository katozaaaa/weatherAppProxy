const axios = require('axios');

const { WEATHER_API_URL, WEATHER_API_KEY } = require('../config.js');

class WeatherService {
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
        const response = await this.api.get(
            `/${type}`, { params }
        ).catch((error) => {
            console.error(error.message);

            if (error.response.status !== 404) {
                throw new Error('Internal server error');
            }

            const publicError = new Error(
                'No weather data was found for this location'
            );

            publicError.response = {
                status: 404
            };

            throw publicError;
        });

        return response.data;
    }
}

module.exports = new WeatherService();
