// modules
const pino = require('pino');

const options = {
    name: 'BOT',
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
};

const logger = pino(process.env.NODE_ENV === 'development' && options);

module.exports = { logger };
