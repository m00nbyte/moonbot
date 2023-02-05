// modules
const dotenv = require('dotenv');

// options
const customConfig = require('./custom');

dotenv.config();

module.exports = {
    ...customConfig,
    db: {
        host: '127.0.0.1',
        port: 27017,
        name: 'moonbot',
        user: 'user',
        pass: 'pass'
    },
    JWT_SECRET: 'REPLACE_ME',
    PORT_DEV: 3001,
    PORT_PROD: 3000
};
