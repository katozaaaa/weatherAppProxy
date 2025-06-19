class AppError extends Error {
    constructor({ message, internalMessage, status }) {
        super(message);
        this.internalMessage = internalMessage;
        this.status = status || 500;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
