// modules
const moment = require('moment');

// functions
const { logger } = require('../../libs/logger');
const { apiClient, getAllOpenOffers, cancelOpenOffer, cancelAllOpenOffers, getMinimumAmount } = require('../../libs/bitfinex');

// models
const Strategy = require('../../db/models/strategies');
const Earning = require('../../db/models/earnings');

const validateSimpleStrategy = (data, realMinAmount) => {
    let check = null;

    if (data.minAmount < realMinAmount) check = 'lowMinAmount';
    else if (data.minRate < 0.00000001) check = 'lowMinRate';
    else if (data.minPeriod < 2) check = 'lowMinPeriod';

    return check;
};

const validateEqualStrategy = (data, realMinAmount) => {
    let check = null;

    if (data.minAmount < realMinAmount) check = 'lowMinAmount';
    else if (data.splitAllIn < 0) check = 'lowSplitAllIn';
    else if (data.splitUnit < 0.00000001) check = 'lowSplitUnit';
    else if (data.overAmount < 0) check = 'lowOverAmount';
    else if (data.periodMap.length > 10) check = 'maxOfferMap';
    else if (data.periodMap.length > 0) {
        for (let row = 0; row < data.periodMap.length; row++) {
            for (let col = 0; col < data.periodMap.length; col++) {
                switch (col) {
                    case 0:
                        check = (data.periodMap[row][col] < 0.00000001 && 'lowOfferMapRate') || null;
                        break;
                    case 1:
                        check = (data.periodMap[row][col] < 2 && 'lowOfferMapPeriod') || null;
                        break;
                    default:
                        break;
                }

                if (check) break;
            }

            if (check) break;
        }
    }
};

const validatePyramidStrategy = (data, realMinAmount) => {
    let check = null;

    if (data.minAmount < realMinAmount) check = 'lowMinAmount';
    else if (data.minRate < 0.00000001) check = 'lowMinRate';
    else if (data.lowBoundRate < 0.00000001) check = 'lowLowBoundRate';
    else if (data.upBoundRate < 0.00000001) check = 'lowUpBoundRate';
    else if (data.growExponential < 0) check = 'lowGrowExponential';
    else if (data.overAmount < 0) check = 'Over amount too low';
    else if (data.skipRemaining < 0) check = 'lowSkipRemaining';
    else if (data.rapMap.length > 10) check = 'maxOfferMap';
    else if (data.rapMap.length > 0) {
        for (let row = 0; row < data.rapMap.length; row++) {
            for (let col = 0; col < data.rapMap.length; col++) {
                switch (col) {
                    case 0:
                    case 1:
                        check = (data.rapMap[row][col] < 0.00000001 && ['lowOfferMapRate', 'lowOfferMapAmount'][col]) || null;
                        break;
                    case 2:
                        check = (data.rapMap[row][col] < 2 && 'lowOfferMapPeriod') || null;
                        break;
                    default:
                        break;
                }

                if (check) break;
            }

            if (check) break;
        }
    }

    return check;
};

const dataStrategyRoute = async (req, res) => {
    logger.debug('ROUTES: dataStrategyRoute');

    if (req.body.type === 'state') {
        const { id, prop } = req.body;

        const data = await Strategy.updateOne({ _id: id }, { $set: prop });

        if (data.modifiedCount) {
            return res.status(200).json({ status: true, message: 'savedChanges' });
        }

        return res.status(200).json({ status: false, message: 'noChanges' });
    }

    const { id, coin, type, ...rest } = req.body;

    const realMinAmount = await getMinimumAmount(coin);

    let validation = null;

    switch (type) {
        case 'simple':
            validation = validateSimpleStrategy(rest, realMinAmount);
            break;
        case 'equal':
            validation = validateEqualStrategy(rest, realMinAmount);
            break;
        case 'pyramid':
            validation = validatePyramidStrategy(rest, realMinAmount);
            break;
        default:
            break;
    }

    if (validation) {
        return res.status(200).json({ status: false, message: validation });
    }

    const data = await Strategy.updateOne(
        { _id: id },
        {
            $set: {
                [`types.${type}`]: {
                    ...rest
                }
            }
        }
    );

    if (data.modifiedCount) {
        return res.status(200).json({ status: true, message: 'savedChanges' });
    }

    return res.status(200).json({ status: false, message: 'noChanges' });
};

const dataOffersRoute = async (req, res) => {
    logger.debug('ROUTES: dataOffersRoute');

    const userId = req.tokenData.id;
    const { currency, id } = req.body;
    let json = { status: false, message: 'unknown' };

    try {
        const client = await apiClient(userId, true);

        if (client) {
            if (id === -1) {
                const result = await cancelAllOpenOffers(client, currency);
                const funding = (await getAllOpenOffers(client, currency)).map(
                    (f) => ({
                        id: f.id,
                        status: f.status,
                        created: f.mtsCreate,
                        updated: f.mtsUpdate,
                        type: f.type,
                        initial_amount: f.amountOrig,
                        remaining_amount: f.amount,
                        rate: f.rate,
                        period: f.period,
                        hidden: f.hidden
                    }),
                    []
                );

                if (result.status === 'SUCCESS') {
                    // localize
                    json = { status: true, message: 'successCancelAllOffers', offers: funding };
                } else {
                    // localize
                    json = { status: false, message: 'errorCancelAllOffers', offers: funding };
                }
            } else {
                const result = await cancelOpenOffer(client, id);

                if (result.status === 'SUCCESS') {
                    const funding = (await getAllOpenOffers(client, currency)).map(
                        (f) => ({
                            id: f.id,
                            status: f.status,
                            created: f.mtsCreate,
                            updated: f.mtsUpdate,
                            type: f.type,
                            initial_amount: f.amountOrig,
                            remaining_amount: f.amount,
                            rate: f.rate,
                            period: f.period,
                            hidden: f.hidden
                        }),
                        []
                    );

                    json = { status: true, message: 'successCancelOneOffer', offers: funding || [] };
                } else {
                    json = { status: false, message: 'errorCancelOneOffer' };
                }

                return res.status(json.status ? 200 : 500).json(json);
            }
        }

        return res.status(200).json({ status: false, message: 'apiClientError' });
    } catch (error) {
        logger.debug('ROUTES: dataOffersRoute | unknown error');
        logger.error(error.message);

        return res.status(200).json({ status: false, message: 'unknown' });
    }
};

const dataEarningsRoute = async (req, res) => {
    logger.debug('ROUTES: dataEarningsRoute');

    const userId = req.tokenData.id;
    const { currency, page, limit } = req.body;

    const results = await Earning.paginate(
        { user: userId, currency },
        { page, limit, sort: { mts: -1 }, select: '-_id -user' }
    );

    if (results) {
        return res.status(200).json(results);
    }

    return res.status(500).json({ status: false, message: 'dbError' });
};

const dataExportRoute = async (req, res) => {
    logger.debug('ROUTES: dataExportRoute');

    const userId = req.tokenData.id;
    const { currency } = req.body;

    const rawResults = await Earning.find({ user: userId, currency }).select('-_id -user -__v');

    const formattedResults = rawResults.map((item) => {
        let tmp = { ...item._doc };
        tmp.date = moment(tmp.mts).format('DD/MM/YYYY');
        delete tmp.mts;

        return tmp;
    }, []);

    if (rawResults) {
        return res.status(200).json(formattedResults);
    }

    return res.status(500).json({ status: false, message: 'dbError' });
};

module.exports = { dataStrategyRoute, dataOffersRoute, dataEarningsRoute, dataExportRoute };
