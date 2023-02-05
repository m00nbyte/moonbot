// modules
const { Router } = require('express');

// functions
const { logger } = require('../libs/logger');
const { validateToken } = require('../libs/token');
const {
    signUpRoute,
    signInRoute,
    userDataRoute,
    userEditRoute,
    coinListRoute,
    coinDataRoute,
    dataStrategyRoute,
    dataOffersRoute,
    dataEarningsRoute,
    dataExportRoute
} = require('./routes');

module.exports = (cache) => {
    logger.debug('ROUTER: Export router');

    const namespaces = [
        {
            namespace: 'auth',
            endpoints: [
                { endpoint: 'signup', type: 'post', route: signUpRoute },
                { endpoint: 'signin', type: 'post', route: signInRoute }
            ]
        },
        {
            namespace: 'user',
            endpoints: [
                { endpoint: 'data', type: 'get', route: userDataRoute },
                { endpoint: 'edit', type: 'post', route: userEditRoute }
            ]
        },
        {
            namespace: 'coin',
            endpoints: [
                { endpoint: 'list', type: 'get', route: coinListRoute },
                { endpoint: ':currency', type: 'get', route: async (req, res, next) => coinDataRoute(req, res, cache) }
            ]
        },
        {
            namespace: 'data',
            endpoints: [
                { endpoint: 'strategy', type: 'post', route: dataStrategyRoute },
                { endpoint: 'offers', type: 'post', route: dataOffersRoute },
                { endpoint: 'earnings', type: 'post', route: dataEarningsRoute },
                { endpoint: 'export', type: 'post', route: dataExportRoute }
            ]
        }
    ];

    const router = Router();

    for (let n = 0; n < namespaces.length; n++) {
        const { namespace, endpoints } = namespaces[n];

        for (let e = 0; e < endpoints.length; e++) {
            const { endpoint, type, route } = endpoints[e];
            const path = `/${namespace}/${endpoint}`;
            router[type](path, validateToken, route);

            logger.debug(`ROUTER: Setup ${type.toUpperCase()} ${path}`);
        }
    }

    return router;
};
