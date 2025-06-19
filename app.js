const express = require('express');
const cors = require('cors');

const { ALLOWED_ORIGINS } = require('./config/config');
const IPRouter = require('./routes/ip');
const weatherRouter = require('./routes/weather');
const locationRouter = require('./routes/location');

const app = express();

app.use(cors({
    origin: ALLOWED_ORIGINS
}));

app.use(express.json());

app.use('/api/ip', IPRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/location', locationRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
