const express = require('express');

const router = express.Router();
const IpService = require('../services/ip/ip.js');
const errorMiddleware = require('../middlewares/error');
const AppError = require('../exceptions/appError');

router.get(
    '/',
    async(req, res, next) => {
        const ip = req.ip;

        try {
            const data = IpService.getWorkingIp(ip);
            res.json(data);
        } catch (error) {
            next(
                new AppError({
                    message: 'Internal server error',
                    internalMessage: error.message,
                    stack: error.stack
                })
            );
        }
    },
    errorMiddleware('ip')
);

module.exports = router;
