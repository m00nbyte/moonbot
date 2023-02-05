// modules
const mongoose = require('mongoose');

// config
const {
    db: { host, port, name, user, pass }
} = require('../config');

// functions
const { logger } = require('../libs/logger');

const MONGODB_URL = `mongodb://${host}:${port}/${name}`;

mongoose.connect(MONGODB_URL, {
    authSource: 'admin',
    user,
    pass,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    logger.debug('DATABASE: connected');
});
