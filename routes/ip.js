const express = require('express');
const router = express.Router();

router.get(
    '/',
    async(req, res) => {
        const ip = req.headers['x-forwarded-for'] || req.ip;

        if (ip === '::1') {
            res.json({ ip: '2.38.11.219' });
            return;
        }

        res.json({ ip });
    }
);

module.exports = router;
