// modules
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { RESTv2 } = require('bfx-api-node-rest');
const { FundingOffer } = require('bfx-api-node-models');

// functions
const { logger } = require('./logger');
const { arraysEqual } = require('./utils');

// models
const User = require('../db/models/user');

// #region api
const apiClient = async (data, db) => {
    logger.debug('BITFINEX: apiClient');

    let api = {
        key: null,
        secret: null
    };

    if (db) {
        logger.debug('BITFINEX: apiClient | get from db');

        const user = await User.findOne({ _id: data }).exec();

        if (user) {
            if (user.api.key !== '' && user.api.secret !== '') {
                logger.debug('BITFINEX: apiClient | db success');
                api = user.api;
            } else {
                logger.debug('BITFINEX: apiClient | error no key/secret');
            }
        } else {
            logger.debug('BITFINEX: apiClient | error no user');
        }
    } else {
        logger.debug('BITFINEX: apiClient | get from props');
        api = data;
    }

    if (api.key && api.secret) {
        logger.debug('BITFINEX: apiClient | new RESTv2');

        try {
            return new RESTv2({
                apiKey: api.key,
                apiSecret: api.secret,
                transform: true
            });
        } catch (error) {
            return false;
        }
    }

    return false;
};

const getKeyPermissions = async (client) => {
    logger.debug('BITFINEX: getKeyPermissions');

    try {
        const response = await client.keyPermissions();
        const permissions = response.map((item) => ({ type: item.key, read: item.read, write: item.write }));

        return permissions;
    } catch (error) {
        return false;
    }
};

const validateKeyPermissions = (data) => {
    logger.debug('BITFINEX: validateKeyPermissions');

    const keys = ['key', 'read', 'write'];
    const template = [
        { key: 'account', read: true, write: false },
        { key: 'orders', read: true, write: false },
        { key: 'funding', read: true, write: true },
        { key: 'settings', read: false, write: false },
        { key: 'wallets', read: true, write: false },
        { key: 'withdraw', read: false, write: false }
    ];

    const permissions = data.map((item) => Object.assign({}, ...keys.map((prop) => ({ [prop]: item[prop] }))), []);

    return arraysEqual(template, permissions);
};
// #endregion

// #region private
const getAllBalances = async (client) => {
    logger.debug('BITFINEX: getAllBalances');

    const wallets = await client.wallets();

    if (wallets) {
        return wallets;
    }

    return [];
};

const getAccountBalance = async (client, currency) => {
    logger.debug('BITFINEX: getAccountBalance');

    const wallets = await client.wallets();
    const wallet = wallets.find((w) => w.type === 'funding' && w.currency === currency);

    if (wallet) {
        return wallet.balance;
    }

    return 0;
};

const getAvailableBalance = async (client, currency) => {
    logger.debug('BITFINEX: getAvailableBalance');

    const balance = await client.calcAvailableBalance(`f${currency}`, 0, 0, 'FUNDING');
    return Math.abs(balance[0]); // not sure why the value can be negative, i think the documentation said something like, active in lending = negative value
};

const getAllActiveOffers = async (client, currency) => {
    logger.debug('BITFINEX: getAllActiveOffers');

    return await client.fundingCredits(`f${currency}`).map((c) => ({
        amount: c.amount,
        rate: c.rate,
        period: c.period,
        time: c.mtsOpening
    }));
};

const getAllOpenOffers = async (client, currency) => {
    logger.debug('BITFINEX: getAllOpenOffers');

    return await client.fundingOffers(`f${currency}`);
};

const cancelOpenOffer = async (client, offerId) => {
    logger.debug('BITFINEX: cancelOpenOffer');

    return await client.cancelOpenOffer(offerId);
};

const cancelAllOpenOffers = async (client, currency) => {
    logger.debug('BITFINEX: cancelAllOpenOffers');

    return await client.cancelAllOpenOffers({ currency });
};

const submitFundingOffer = async (client, { rate, amount, period, ccy }) => {
    logger.debug('BITFINEX: submitFundingOffer');

    return await client.submitFundingOffer(
        new FundingOffer({
            type: 'LIMIT',
            symbol: `f${ccy}`,
            rate,
            amount,
            period
        })
    );
};

const getFundingBook = async (client, currency) => {
    logger.debug('BITFINEX: getFundingBook');

    const book = await client.orderBook(`f${currency}`);

    return {
        offers: book.filter((item) => item[3] > 0),
        requests: book.filter((item) => item[3] < 0)
    };
};

const getFundingEarnings = async (client, currency) => {
    logger.debug('BITFINEX: getFundingEarnings');

    const ONE_DAY_IN_MS = 86400000;
    const now = Date.now();
    const options = { category: 28 };

    if (currency) {
        options.ccy = currency;
    }

    const res = await client.ledgers(options, now - ONE_DAY_IN_MS * 30, now, 500);

    const earnings = res
        .map((r) => ({
            id: r.id,
            currency: r.currency,
            amount: r.amount,
            balance: r.balance,
            mts: r.mts
        }))
        .reverse();

    return earnings;
};

// unused ↓
const getAllFundingCoins = async (client) => {
    logger.debug('BITFINEX: getAllFundingCoins');

    const tickers = await client.tickers(['ALL']);

    const coinsList = tickers
        .filter((item) => item.symbol.slice(0, 1) === 'f')
        .map((item) => item.symbol.slice(1), [])
        .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

    return coinsList;
};
// #endregion

// #region public
const getMinimumAmount = async (coin) => {
    logger.debug('BITFINEX: getMinimumAmount');

    const url = `https://api-pub.bitfinex.com/v2/calc/fx`;
    const data = {
        ccy1: 'USD',
        ccy2: coin
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        const minAmount = json.length === 1 ? 150 * json[0] : 150;

        return minAmount;
    } catch (error) {
        return -1;
    }
};

const getFundingStats = async (coin) => {
    logger.debug('BITFINEX: getFundingStats');

    const url = `https://api-pub.bitfinex.com/v2/funding/stats/f${coin}/hist?limit=100`;

    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        return false;
    }
};
// #endregion

module.exports = {
    apiClient,
    getKeyPermissions,
    validateKeyPermissions,
    getAllFundingCoins,
    getAllBalances,
    getAccountBalance,
    getAvailableBalance,
    getAllActiveOffers,
    getAllOpenOffers,
    cancelOpenOffer,
    cancelAllOpenOffers,
    submitFundingOffer,
    getFundingBook,
    getFundingEarnings,
    getMinimumAmount,
    getFundingStats
};
