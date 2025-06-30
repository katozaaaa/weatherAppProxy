class AppError extends Error {
    constructor({ message, internalMessage, status, stack }) {
        super(message);
        this.internalMessage = internalMessage;
        this.status = status || 500;
        this.stack = stack;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
