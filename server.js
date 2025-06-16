require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
    console.log(`Weather proxy server running on port ${PORT}`);
});
