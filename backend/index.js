// modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const NodeCache = require('node-cache');

// config
const { PORT_DEV, PORT_PROD } = require('./config');
const PORT = process.env.NODE_ENV === 'development' ? PORT_DEV : PORT_PROD;

// functions
const { logger } = require('./libs/logger');
const { cron } = require('./libs/cron');

// backend routes
const apiRoutes = require('./api');

// db
require('./db');

const app = express();
const cache = new NodeCache();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRoutes(cache));

app.listen(PORT, () => {
    logger.info(`ENVIRONMENT: ${process.env.NODE_ENV}`);
    logger.info(`SERVER: localhost:${PORT}`);

    // start cron jobs
    cron();
});
