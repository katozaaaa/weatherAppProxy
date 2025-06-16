const axios = require('axios');
const { WEATHER_API_URL, WEATHER_API_KEY } = require('../config.js');

class WeatherService {
    constructor () {
        this.api = axios.create({
            baseURL: WEATHER_API_URL,
            params: {
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });
    }

    async getCurrentWeather (params) {
        try {
            const response = await this.api.get(
                '/weather', { params }
            );

            return response.data;
        } catch (error) {
            console.error('Weather API error:', error.message);
            throw error;
        }
    }

    async getForecastWeather(params) {
        try {
            const response = await this.api.get(
                '/forecast', { params }
            );

            return response.data;
        } catch (error) {
            console.error('Weather API error:', error.message);
            throw error;
        }
    }
}

module.exports = new WeatherService();
