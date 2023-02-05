// functions
const { logger } = require('../../libs/logger');
const { getAskBid } = require('../../libs/utils');
const { getDataByCurrency, getEarningsByCurrency } = require('../../libs/helpers');
const { apiClient, getAllBalances, getMinimumAmount, getFundingStats, getFundingBook } = require('../../libs/bitfinex');

// models
const User = require('../../db/models/user');
const Strategy = require('../../db/models/strategies');

// empty strategy
const strategyTemplate = {
    active: 'none',
    select: 'simple',
    types: {
        simple: {
            minAmount: 1,
            minRate: 0.0001,
            minPeriod: 2
        },
        equal: {
            minAmount: 1,
            splitAllIn: 0,
            splitUnit: 0,
            overAmount: 0,
            periodMap: [[1, 2]]
        },
        pyramid: {
            minAmount: 1,
            minRate: 0.0001,
            lowBoundRate: 0.0001,
            upBoundRate: 0.00002,
            growExponential: 1,
            overAmount: 0,
            skipRemaining: 0,
            rapMap: [[1, 0.0001, 2]]
        }
    }
};

const coinListRoute = async (req, res) => {
    logger.debug('ROUTES: coinListRoute');

    const userId = req.tokenData.id;

    try {
        const client = await apiClient(userId, true);

        if (client) {
            const fundingCoinsList = await getAllBalances(client);
            return res.status(200).json({ status: true, data: fundingCoinsList.map((item) => item.currency, []) });
        }

        return res.status(200).json({ status: false, message: 'apiClientError' });
    } catch (error) {
        logger.debug('ROUTES: coinListRoute | unknown error');
        logger.error(error.message);

        return res.status(200).json({ status: false, message: 'unknown' });
    }
};

const coinDataRoute = async (req, res, cache) => {
    logger.debug('ROUTES: coinDataRoute');

    const userId = req.tokenData.id;
    const { currency } = req.params;

    const [coinCacheKey] = ['coin'].map((item) => [item, userId, currency].join('-'), []);

    let coinData = process.env.NODE_ENV !== 'development' && cache.get(coinCacheKey);

    try {
        const client = await apiClient(userId, true);

        if (client) {
            const availableCoinsList = await getAllBalances(client);
            const fundingCoinsList = availableCoinsList.map((item) => item.currency, []);
            const fundingStatsList = await getFundingStats(currency);
            const fundingBook = await getFundingBook(client, currency);
            const realMinAmount = await getMinimumAmount(currency);
            const { lowRate, highRate } = getAskBid(fundingBook);
            const userData = await User.findOne({ _id: userId }).select('-_id -password -__v');
            const earnData = await getEarningsByCurrency(userId, currency);
            let strategyData = await Strategy.findOne({ user: userId, currency }).select('-user -__v');

            if (userData.api.secret) userData.api.secret = `${userData.api.secret.substring(0, 20)}...`;

            if (fundingCoinsList.includes(currency)) {
                if (!coinData) {
                    logger.debug(`ROUTES: coinDataRoute | cache miss ${coinCacheKey}`);

                    coinData = await getDataByCurrency(client, currency);
                    cache.set(coinCacheKey, coinData, 30);
                } else {
                    logger.debug(`ROUTES: coinDataRoute | cache hit ${coinCacheKey}`);
                }

                if (!strategyData) {
                    logger.debug('ROUTES: coinDataRoute | no strategy');

                    for (let key in strategyTemplate.types) {
                        strategyTemplate.types[key].minAmount = realMinAmount;
                    }

                    const tmpStrategy = new Strategy({ ...strategyTemplate, user: req.tokenData.id, currency });
                    const defaultStrategy = await tmpStrategy.save();

                    if (defaultStrategy) {
                        logger.debug('ROUTES: coinDataRoute | default strategy');

                        strategyData = Object.keys(defaultStrategy)
                            .filter((key) => key !== '_id')
                            .reduce(
                                (obj, curr) => ({
                                    ...obj,
                                    [curr]: defaultStrategy[curr]
                                }),
                                {}
                            );
                    }
                }

                return res.status(200).json({
                    status: true,
                    rStats: {
                        ask: lowRate * 100,
                        bid: highRate * 100,
                        min: realMinAmount,
                        history: fundingStatsList
                    },
                    fList: fundingCoinsList,
                    cData: coinData,
                    sData: strategyData,
                    eData: earnData,
                    uData: userData
                });
            }

            return res.status(200).json({ status: false, message: 'notAvailableCoin' });
        }

        return res.status(200).json({ status: false, message: 'apiClientError' });
    } catch (error) {
        logger.debug('ROUTES: coinDataRoute | unknown error');
        logger.error(error.message);
        logger.error(error);

        return res.status(200).json({ status: false, message: 'unknown' });
    }
};

module.exports = { coinListRoute, coinDataRoute };
