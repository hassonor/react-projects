const redisClient = require('./signin').redisClient;

const requireAuth = async (req, res, next) => {

    const {authorization} = req.headers;
    if (!authorization) {

        return res.status(401).send('Unauthorized');
    }
    const replay = await redisClient.get(authorization);
    if (!replay) {
        return res.status(401).send('Unauthorized');
    }
    next();
};

module.exports = {
    requireAuth
}