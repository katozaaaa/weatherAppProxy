const locationByIp = require('./locationByIp');
const locationByLocationName = require('./locationByLocationName');
const AppError = require('../../exceptions/appError');

class Location {
    async getLocation({ name, ip }) {
        try {
            const data = name
                ? await locationByLocationName.getLocationBy(name)
                : await locationByIp.getLocationBy(ip);

            this._validateData(data);
            return data;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError({
                message: 'Internal server error',
                internalMessage: error.message,
                stack: error.stack
            });
        }
    }

    _validateData(data) {
        if (
            !data.lat ||
            !data.lon ||
            (!data.placeName && !data.countryName)
        ) {
            throw new AppError({
                message: 'Bad request',
                internalMessage: 'Some location data is missing',
                status: 400
            });
        }
    }
}

module.exports = new Location();
