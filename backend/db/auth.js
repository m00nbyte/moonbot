// modules
const jwt = require('jsonwebtoken');

// config
const { JWT_SECRET, emailRegex } = require('../config');

// functions
const { logger } = require('../libs/logger');
const { apiClient, getKeyPermissions, validateKeyPermissions } = require('../libs/bitfinex');

// models
const User = require('./models/user');

const createToken = ({ id, email }) => {
    logger.debug('SERVER: createToken');

    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '7d' });
    return `Bearer ${token}`;
};

const confirmPassword = async (_id, newPw) => {
    logger.debug('SERVER: confirmPassword');

    try {
        const user = await User.findOne({ _id }).exec();

        if (user) {
            const result = await user.comparePassword(newPw);
            return result;
        }

        return false;
    } catch (error) {
        return false;
    }
};

const signUp = async (name, email, password) => {
    logger.debug('SERVER: signUp');

    let validation = null;

    if (!/^\w+$/.test(name)) validation = 'invalidCharsUsername';
    else if (name.length < 3) validation = 'minCharsUsername';
    else if (name.length > 30) validation = 'maxCharsUsername';
    else if (!emailRegex.test(email)) validation = 'invalidEmail';
    else if (!password) validation = 'requiredPwCurrent';
    else if (password.length < 8) validation = 'minCharsPwCurrent';
    else if (!/[a-z]/.test(password)) validation = 'lowerCasePwCurrent';
    else if (!/[A-Z]/.test(password)) validation = 'upperCasePwCurrent';
    else if (!/[0-9]/.test(password)) validation = 'numberPwCurrent';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) validation = 'specialCharPwCurrent';

    if (validation) {
        return { status: false, message: validation };
    }

    try {
        const model = new User({ name, email, password });
        const user = await model.save();

        if (user) {
            const token = createToken({ id: user._id, email });

            return { status: true, id: user._id, token };
        }

        return { status: false, message: 'dbError' };
    } catch (error) {
        logger.debug('SERVER: signUp | unknown error');
        logger.error(error.message);

        return { status: false, message: 'unknown' };
    }
};

const signIn = async (email, password) => {
    logger.debug('SERVER: signIn');

    let validation = null;

    if (!emailRegex.test(email)) validation = 'invalidEmail';
    else if (!password) validation = 'requiredPwCurrent';
    else if (password.length < 8) validation = 'minCharsPwCurrent';
    else if (!/[a-z]/.test(password)) validation = 'lowerCasePwCurrent';
    else if (!/[A-Z]/.test(password)) validation = 'upperCasePwCurrent';
    else if (!/[0-9]/.test(password)) validation = 'numberPwCurrent';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) validation = 'specialCharPwCurrent';

    if (validation) return { status: false, message: validation };

    try {
        const user = await User.findOne({ email }).exec();

        if (user) {
            const result = await user.comparePassword(password);

            if (result) {
                const token = createToken({ id: user._id, email });

                return { status: true, id: user._id, token };
            }

            return { status: false, message: 'wrongEmailPassword' };
        }

        return { status: false, message: 'wrongEmailPassword' };
    } catch (error) {
        logger.debug('SERVER: signIn | unknown error');
        logger.error(error.message);

        return { status: false, message: 'unknown' };
    }
};

const checkApiPermissions = async (data) => {
    logger.debug('SERVER: checkApiPermissions');

    try {
        const client = await apiClient(data, false);

        if (client) {
            const data = await getKeyPermissions(client);

            if (data) {
                const result = validateKeyPermissions(data);

                if (result) {
                    return { status: true, message: 'ok' };
                }

                return { status: false, message: 'invalidApiKeyPermissions' };
            }

            return { status: false, message: 'invalidApiKeySecret' };
        }

        return { status: false, message: 'apiClientError' };
    } catch (error) {
        logger.debug('SERVER: checkApiPermissions | unknown error');
        logger.error(error.message);

        return { status: false, message: 'unknown' };
    }
};

module.exports = { confirmPassword, signUp, signIn, checkApiPermissions };
