require('dotenv').config();

module.exports = {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    WEATHER_API_URL: process.env.WEATHER_API_URL,
    PORT: process.env.PORT || 3000,
};