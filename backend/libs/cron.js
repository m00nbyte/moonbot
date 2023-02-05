// modules
const schedule = require('node-schedule');

// functions
const { logger } = require('./logger');

// jobs
const submitOffers = require('../jobs/submit-offers');
const syncEarnings = require('../jobs/sync-earnings');

const intervals = {
    offer: '*/5 * * * *', // every 5 minutes
    earnings: [...new Array(6)].map((v, i) => `0 ${i * 4} * * *`) // every 4 hours
};

const offersSubmit = async () => {
    logger.debug('CRON: offersSubmit');

    await submitOffers();
};

const earningsSync = async () => {
    logger.debug('CRON: syncEarnings');

    await syncEarnings();
};

const cron = async () => {
    logger.info('CRON: Starting cron jobs');

    schedule.scheduleJob(intervals.offer, offersSubmit);
    intervals.earnings.forEach((rule) => schedule.scheduleJob(rule, earningsSync));
};

module.exports = { cron };
