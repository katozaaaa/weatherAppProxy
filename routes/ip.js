const express = require('express');

const router = express.Router();
const errorMiddleware = require('../middlewares/error');
const AppError = require('../errors/appError');

router.get(
    '/',
    async(req, res, next) => {
        try {
            const ip = req.headers['x-forwarded-for'] || req.ip;

            if (ip === '::1' || ip === '127.0.0.1') {
                // Backup IP for the localhost
                res.json({ ip: '2.38.11.219' });
                return;
            }

            res.json({ ip });
        } catch (error) {
            if (error instanceof AppError) {
                next(error);
                return;
            }

            next(
                new AppError({
                    message: 'Internal server error',
                    internalMessage: error.message,
                    status: 500
                })
            );
        }
    },
    errorMiddleware('ip')
);

module.exports = router;
