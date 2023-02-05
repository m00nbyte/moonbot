// functions
const { logger } = require('./logger');
const { getPeriod, getRate, getDerivedRate, stepAmount } = require('./utils');
const { getFundingBook } = require('./bitfinex');

const simpleOffer = async (client, config, availableBalance, currency) => {
    logger.debug('STRATEGY: simpleOffer');

    const amounts = [];

    const { minAmount: MIN_AMOUNT, minRate: MIN_RATE, minPeriod: MIN_PERIOD } = config;

    const { offers } = await getFundingBook(client, currency);
    const rate = await getRate(offers, 0);
    const period = MIN_PERIOD < 2 ? 2 : MIN_PERIOD;

    if (availableBalance >= MIN_AMOUNT && rate >= MIN_RATE) {
        amounts.push(availableBalance);
    }

    return amounts.map((amount) => ({
        rate,
        amount,
        period,
        ccy: currency
    }));
};

const splitEqually = async (client, config, availableBalance, currency) => {
    logger.debug('STRATEGY: splitEqually');

    const amounts = [];

    const {
        minAmount: MIN_AMOUNT,
        splitAllIn: NUM_ALL_IN,
        splitUnit: SPLIT_UNIT,
        overAmount: RATE_OVER_AMOUNT,
        periodMap: PERIOD_MAP
    } = config;

    const { offers } = await getFundingBook(client, currency);
    const rate = await getRate(offers, RATE_OVER_AMOUNT);
    const period = getPeriod(PERIOD_MAP, rate);

    while (availableBalance > NUM_ALL_IN) {
        amounts.push(SPLIT_UNIT);
        availableBalance -= SPLIT_UNIT;
    }

    if (availableBalance <= NUM_ALL_IN && availableBalance >= MIN_AMOUNT) {
        amounts.push(availableBalance);
    }

    return amounts.map((amount) => ({
        rate,
        amount,
        period,
        ccy: currency
    }));
};

const splitPyramidically = async (client, config, availableBalance, currency) => {
    logger.debug('STRATEGY: splitPyramidically');

    const out = [];

    const {
        minAmount: MIN_AMOUNT,
        minRate: MIN_RATE,
        upBoundRate: UP_BOUND_RATE,
        lowBoundRate: LOW_BOUND_RATE,
        skipRemaining: SKIP_REMAINING,
        growExponential: AMOUNT_GROW_EXP,
        overAmount: RATE_OVER_AMOUNT,
        rapMap: RAP_MAP
    } = config;

    const { offers } = await getFundingBook(client, currency);
    const baseRate = await getRate(offers, RATE_OVER_AMOUNT);
    const baseAmount = stepAmount(RAP_MAP, baseRate);

    let oIndex = 0;

    while (availableBalance >= MIN_AMOUNT) {
        let amount = Math.min(availableBalance, baseAmount * Math.pow(AMOUNT_GROW_EXP, oIndex));

        if (availableBalance - amount < MIN_AMOUNT) {
            amount = availableBalance;
            oIndex += SKIP_REMAINING;
        }

        const derivedRate = getDerivedRate(LOW_BOUND_RATE, UP_BOUND_RATE, baseRate);
        const derivedBaseRate = baseRate * Math.pow(derivedRate, oIndex);
        const rate = Math.max(MIN_RATE, derivedBaseRate);

        out.push({
            amount: parseFloat(amount.toFixed(8)),
            rate: parseFloat(rate.toFixed(8)),
            period: getPeriod(RAP_MAP, rate),
            ccy: currency
        });

        availableBalance -= amount;
        oIndex++;
    }

    return out;
};

module.exports = {
    simpleOffer,
    splitEqually,
    splitPyramidically
};
