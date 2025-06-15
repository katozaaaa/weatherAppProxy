const express = require('express');
const cors = require('cors');
const { ALLOWED_ORIGINS } = require('./config');
const weatherRouter = require('./routes/weather');

const app = express();

// Настройка CORS
app.use(cors({
    origin: ALLOWED_ORIGINS
}));

// Парсинг JSON
app.use(express.json());

// Маршруты
app.use('/api/weather', weatherRouter);

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;