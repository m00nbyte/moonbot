// functions
const { logger } = require('../libs/logger');
const { apiClient, getFundingEarnings } = require('../libs/bitfinex');

// models
const Strategy = require('../db/models/strategies');
const Earning = require('../db/models/earnings');

// db
require('../db');

const main = async () => {
    logger.info('JOBS: sync-earnings');

    const strategies = await Strategy.find({ active: { $ne: 'none' } });

    for (let i = 0; i < strategies.length; i++) {
        const userId = strategies[i].user;
        const currency = strategies[i].currency;

        try {
            logger.debug('JOBS: sync-earnings | update db');

            const client = await apiClient(userId, true);

            if (client) {
                const earnings = (await getFundingEarnings(client, currency)).map((e) => {
                    e.user = userId;
                    e.uid = e.id;
                    delete e.id;

                    return e;
                });

                for (let i = 0; i < earnings.length; i++) {
                    const exists = await Earning.findOne({ user: userId, uid: earnings[i].uid });

                    if (!exists) {
                        const entry = new Earning(earnings[i]);
                        await entry.save();
                    }
                }
            } else {
                logger.debug('JOBS: sync-earnings | error');
            }
        } catch (error) {
            logger.debug('JOBS: sync-earnings | error');
        }
    }

    if (require.main === module) {
        process.exit(0);
    }
};

module.exports = main;

if (require.main === module) {
    main();
}
