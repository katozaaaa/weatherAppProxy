function errorMiddleware(route) {
    return async(error, req, res, next) => {
        if (error) {
            console.error(`[ERROR] in ${route} route: ${error.internalMessage}`);

            res.status(error.status || 500).json({
                error: error.message
            });
        }
    };
}

module.exports = errorMiddleware;
