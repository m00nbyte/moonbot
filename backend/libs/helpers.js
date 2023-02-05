// modules
const moment = require('moment');

// functions
const { logger } = require('./logger');
const { amountExpires, compoundInterest, averageOfList } = require('./utils');
const { getAccountBalance, getAvailableBalance, getAllOpenOffers, getAllActiveOffers } = require('./bitfinex');

// models
const Earning = require('../db/models/earnings');

const fundingMap = (obj) => {
    return {
        id: obj.id,
        status: obj.status,
        created: obj.mtsCreate,
        updated: obj.mtsUpdate,
        type: obj.type,
        initial_amount: obj.amountOrig,
        remaining_amount: obj.amount,
        rate: obj.rate,
        period: obj.period,
        hidden: obj.hidden
    };
};

const lendingMap = (obj) => ({
    amount: obj.amount,
    period: obj.period,
    rate: compoundInterest(obj.rate / 365).toFixed(8),
    apy: compoundInterest(obj.rate).toFixed(8),
    exp: amountExpires(obj.time, obj.period)
});

const getDataByCurrency = async (client, currency) => {
    logger.debug('ROUTES: getDataByCurrency');

    try {
        const balance = await getAccountBalance(client, currency);
        const availableBalance = await getAvailableBalance(client, currency);
        const funding = (await getAllOpenOffers(client, currency)).map(fundingMap, []);
        const lending = (await getAllActiveOffers(client, currency)).map(lendingMap, []);
        return {
            currency,
            balance,
            availableBalance,
            funding,
            lending,
            timestamp: moment.now()
        };
    } catch (e) {
        return {
            currency,
            balance: 0,
            availableBalance: 0,
            funding: [],
            lending: [],
            timestamp: moment.now()
        };
    }
};

const getEarningsByCurrency = async (id, currency) => {
    logger.debug('ROUTES: getEarningsByCurrency');

    try {
        const earnings30d = await Earning.paginate(
            { user: id, currency },
            { page: 1, limit: 30, sort: { mts: -1 }, select: '-_id -user -uid -currency -__v' }
        );
        const earningsList = await Earning.paginate(
            { user: id, currency },
            { page: 1, limit: 10, sort: { mts: -1 }, select: '-_id -user -uid -currency -__v' }
        );
        const earningsFull = await Earning.find({ user: id, currency });

        const reducedAmounts = earningsFull.reduce((list, current) => list.push(current.amount) && list, []);
        const averageAmount = averageOfList(reducedAmounts);
        const totalSum = earningsFull.reduce((sum, current) => sum + current.amount, 0);

        return {
            currency,
            earnings30d: earnings30d.docs,
            earningsList: earningsList,
            earningsFull: {
                averageAmount,
                totalSum,
                totalTime: reducedAmounts.length
            },
            timestamp: moment.now()
        };
    } catch (e) {
        return {
            earnings30d: [],
            earningsList: {},
            earningsFull: {},
            timestamp: moment.now()
        };
    }
};

module.exports = {
    getDataByCurrency,
    getEarningsByCurrency
};
