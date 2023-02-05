// config
const { emailRegex } = require('../../config');

// functions
const { logger } = require('../../libs/logger');
const { confirmPassword, checkApiPermissions } = require('../../db/auth');

// models
const User = require('../../db/models/user');

const userDataRoute = async (req, res, cache) => {
    logger.debug('ROUTES: userDataRoute');

    const userId = req.tokenData.id;

    try {
        const userData = await User.findOne({ _id: userId }).select('-_id -password -__v');

        if (userData) {
            return res.status(200).json({
                status: true,
                data: userData
            });
        }

        return res.status(200).json({ status: false, message: 'notAvailableUser' });
    } catch (error) {
        logger.debug('ROUTES: userDataRoute | unknown error');
        logger.error(error.message);

        return res.status(200).json({ status: false, message: 'unknown' });
    }
};

const userEditRoute = async (req, res) => {
    logger.debug('ROUTES: userEditRoute');

    const { name, email, api, pwCurrent, pwNew } = req.body;

    const options = {
        name,
        email
    };

    options.name = name.toLowerCase().replace(/\s/g, '_');

    let validation = null;

    if (!pwCurrent) validation = 'requiredPwCurrent';
    else {
        const comparePw = await confirmPassword(req.tokenData.id, pwCurrent);

        if (!comparePw) validation = 'invalidPwCurrent';
        else {
            if (!/^\w+$/.test(name)) validation = 'invalidCharsUsername';
            else if (name.length < 3) validation = 'minCharsUsername';
            else if (name.length > 30) validation = 'maxCharsUsername';
            else if (!emailRegex.test(email)) validation = 'invalidEmail';
            else if (pwCurrent && pwNew) {
                if (pwCurrent.length < 8) validation = 'minCharsPwCurrent';
                else if (!/[a-z]/.test(pwCurrent)) validation = 'lowerCasePwCurrent';
                else if (!/[A-Z]/.test(pwCurrent)) validation = 'upperCasePwCurrent';
                else if (!/[0-9]/.test(pwCurrent)) validation = 'numberPwCurrent';
                else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwCurrent)) validation = 'specialCharPwCurrent';
                else if (pwNew.length < 8) validation = 'minCharsNewPassword';
                else if (!/[a-z]/.test(pwNew)) validation = 'lowerCaseNewPassword';
                else if (!/[A-Z]/.test(pwNew)) validation = 'upperCaseNewPassword';
                else if (!/[0-9]/.test(pwNew)) validation = 'numberNewPassword';
                else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwNew)) validation = 'specialCharNewPassword';
                else if (pwCurrent === pwNew) validation = 'samePassword';
                else {
                    options.password = pwNew;
                }
            }

            if (api.key && api.secret && !api.secret.endsWith('.')) {
                const apiCheck = await checkApiPermissions(api);

                if (apiCheck.status) {
                    options.api = api;
                } else {
                    validation = apiCheck.message;
                }
            }
        }
    }

    if (validation) {
        return res.status(200).json({ status: false, message: validation });
    }

    const data = await User.updateOne({ _id: req.tokenData.id }, { $set: options });

    if (data.modifiedCount) {
        return res.status(200).json({ status: true, message: 'savedChanges' });
    }

    return res.status(200).json({ status: false, message: 'noChanges' });
};

module.exports = { userDataRoute, userEditRoute };
