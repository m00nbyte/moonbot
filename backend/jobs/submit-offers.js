// functions
const { logger } = require('../libs/logger');
const { simpleOffer, splitEqually, splitPyramidically } = require('../libs/strategy');
const { readableOffer, sleep, asyncForEach } = require('../libs/utils');
const { apiClient, getAvailableBalance, cancelAllOpenOffers, submitFundingOffer } = require('../libs/bitfinex');

// models
const Strategy = require('../db/models/strategies');

require('../db');

const getFundingOffers = async (client, type, config, availableBalance, currency) => {
    logger.debug('JOBS: getFundingOffers');

    switch (type) {
        case 'simple':
            return simpleOffer(client, config, availableBalance, currency);
        case 'equal':
            return splitEqually(client, config, availableBalance, currency);
        case 'pyramid':
            return splitPyramidically(client, config, availableBalance, currency);
        default:
            return [];
    }
};

const main = async () => {
    logger.info('JOBS: submit-offers');

    const strategies = await Strategy.find({ active: { $ne: 'none' } });

    let count = 0;

    for (let i = 0; i < strategies.length; i++) {
        const userId = strategies[i].user;
        const currency = strategies[i].currency;
        const active = strategies[i].active;
        const strategy = strategies[i].types[active];

        try {
            const client = await apiClient(userId, true);

            if (client) {
                if (process.env.NODE_ENV === 'production') {
                    await cancelAllOpenOffers(client, currency);
                }

                const availableBalance = await getAvailableBalance(client, currency);
                const offers = await getFundingOffers(client, active, strategy, availableBalance, currency);

                count += offers.length;

                // submit funding offer
                if (process.env.NODE_ENV === 'development') {
                    logger.debug('JOBS: submit-offers | debug');

                    offers.forEach((offer) => logger.debug(readableOffer(offer)));
                } else {
                    logger.debug('JOBS: submit-offers | production');

                    asyncForEach(offers, async (offer) => {
                        logger.debug('JOBS: submit-offers | submit offer');

                        await submitFundingOffer(client, offer);
                        await sleep(500);
                    });
                }
            } else {
                logger.debug('JOBS: submit-offers | error');
            }
        } catch (error) {
            logger.debug('JOBS: submit-offers | error');
        }
    }

    if (strategies.length === 0 || count === 0) {
        logger.debug('JOBS: submit-offers | nothing todo');
    }

    if (require.main === module) {
        process.exit(0);
    }
};

module.exports = main;

if (require.main === module) {
    main();
}
