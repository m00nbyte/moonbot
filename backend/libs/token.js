// modules
const jwt = require('jsonwebtoken');

// config
const { JWT_SECRET } = require('../config');

// functions
const { logger } = require('../libs/logger');

const publicRoutes = ['/auth/signup', '/auth/signin'];

const validateToken = (req, res, next) => {
    logger.debug('SERVER: validateToken');

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (publicRoutes.includes(req.route.path)) {
        next();
    } else {
        if (token == null) return res.sendStatus(403);

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

            req.tokenData = decoded;
            next();
        });
    }
};

module.exports = { validateToken };
