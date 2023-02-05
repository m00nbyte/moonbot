// modules
const moment = require('moment');

// functions
const { logger } = require('./logger');

// #region amount
const stepAmount = (map, key) => {
    logger.debug('UTILS: stepAmount');

    for (let [r, a, p] of map) if (key >= r) return a;

    return map[map.length - 1][1];
};

const amountExpires = (time, period) => {
    logger.debug('UTILS: amountExpires');

    return time + period * 86400000;
};
// #endregion

// #region period
const getPeriod = (map, rate) => {
    logger.debug('UTILS: getPeriod');

    const fEntryLength = map[0].length;

    switch (fEntryLength) {
        case 2:
            logger.debug('UTILS: getPeriod | periodMap');

            for (let [r, p] of map) if (rate >= r) return p;
            break;
        case 3:
            logger.debug('UTILS: getPeriod | rapMap');

            for (let [r, a, p] of map) if (rate >= r) return p;
            break;
        default:
            break;
    }

    return 2;
};
// #endregion

// #region rate
const compoundInterest = (rate) => {
    logger.debug('UTILS: compoundInterest');

    return rate * 365;
};

const getAskBid = (book) => {
    logger.debug('UTILS: getAskBid');

    if (Object.keys(book).length === 2) {
        const { offers, requests } = book;
        const lowRate = offers.length > 0 ? offers[0][0] : 0;
        const highRate = requests.length > 0 ? requests[0][0] : 0;

        return { lowRate, highRate };
    }

    return { lowRate: 0, highRate: 0 };
};

const getDerivedRate = (l, h, r) => {
    logger.debug('UTILS: getDerivedRate');

    const b = Math.max(l, Math.min(h, r));
    return 1 + (1 - (b - l) / (h - l)) * 0.1;
};

const getRate = async (offers, overAmount) => {
    logger.debug('UTILS: getRate');

    const RATE_OFFSET = 0.00000001;

    if (offers.length) {
        let total = 0;
        let idx = 0;

        for (; idx < offers.length; idx++) {
            total += offers[idx][3] * offers[idx][2];

            if (total > overAmount) {
                break;
            }
        }

        const rate = idx === offers.length ? offers[idx - 1][0] : offers[idx][0] - RATE_OFFSET;

        return rate;
    } else {
        return 0;
    }
};

// unused ↓
const getLowRate = async (offers) => {
    logger.debug('UTILS: getLowRate');

    return offers[0][0];
};

// unused ↓
const getHighRate = async (requests) => {
    logger.debug('UTILS: getHighRate');

    return requests[0][0];
};
// #endregion

// #region format
const readableRate = (rate) => {
    logger.debug('UTILS: readableRate');

    return Number(rate.toFixed(8));
};

const readableApy = (rate) => {
    logger.debug('UTILS: readableApy');

    return Number(compoundInterest(rate).toFixed(2));
};

const readableOffer = (offer) => {
    logger.debug('UTILS: readableOffer');

    return {
        amount: Number(offer.amount.toFixed(8)),
        period: offer.period,
        rate: readableRate(offer.rate),
        apy: readableApy(offer.rate)
    };
};

// unused ↓
const readableLend = (lend) => {
    logger.debug('UTILS: readableLend');

    return {
        ...readableOffer(lend),
        exp: getDateTime(lend.time + lend.period * 86400000)
    };
};
// #endregion

// #region helper
const sleep = (ms) => {
    logger.debug('UTILS: sleep');

    return new Promise((resolve) => setTimeout(resolve, ms));
};

const asyncForEach = async (array, callback) => {
    logger.debug('UTILS: asyncForEach');

    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const averageOfList = (array) => {
    logger.debug('UTILS: averageOfList');

    return (array.length && array.reduce((a, b) => a + b) / array.length) || 0;
};

const objectsEqual = (o1, o2) => {
    logger.debug('UTILS: objectsEqual');

    return typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
        : o1 === o2;
};

const arraysEqual = (a1, a2) => {
    logger.debug('UTILS: arraysEqual');

    return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
};

// unused ↓
const getDateTime = () => {
    logger.debug('UTILS: getDateTime');

    return moment().format('MM/DD/YYYY HH:mm:ss');
};
// #endregion

module.exports = {
    stepAmount,
    compoundInterest,
    amountExpires,
    getPeriod,
    getLowRate,
    getHighRate,
    getAskBid,
    getDerivedRate,
    getRate,
    readableRate,
    readableApy,
    readableOffer,
    readableLend,
    sleep,
    getDateTime,
    asyncForEach,
    averageOfList,
    objectsEqual,
    arraysEqual
};
