// functions
const { logger } = require('../../libs/logger');
const { signUp, signIn } = require('../../db/auth');

const signUpRoute = async (req, res) => {
    logger.debug('ROUTES: signUpRoute');

    const { name, email, password } = req.body;
    const data = await signUp(name, email, password);

    if (data.status) {
        return res.status(200).json({ status: true, id: data.id, token: data.token });
    }

    return res.status(500).json({ status: false, message: data.message });
};

const signInRoute = async (req, res) => {
    logger.debug('ROUTES: signInRoute');

    const { email, password } = req.body;
    const data = await signIn(email, password);

    if (data.status) {
        return res.status(200).json({ status: true, id: data.id, token: data.token });
    }

    return res.status(500).json({ status: false, message: data.message });
};

module.exports = { signUpRoute, signInRoute };
