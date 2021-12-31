const jwt = require('jsonwebtoken');

// Redis Setup
const redis = require('redis');

// // You will want to update your host to the proper address in production
// const redisClient = redis.createClient({url: process.env.REDIS_URI});
let redisClient;

(async () => {
    redisClient = redis.createClient({url: process.env.REDIS_URI});

    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    redisClient.connect();

})();

const signToken = (username) => {
    const jwtPayload = {username};
    return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', {expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
    const {email, id} = user;
    const token = signToken(email);
    return setToken(token, id)
        .then(() => {
            return {success: 'true', userId: id, token, user}
        })
        .catch(console.log);
};

const handleSignin = (db, bcrypt, req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                return Promise.reject('wrong credentials');
            }
        })
        .catch(err => err)
}

const getAuthTokenId = async (req, res) => {
    const {authorization} = req.headers;
    const replay = await redisClient.get(authorization);
    if (!replay) {
        return res.status(401).send('Unauthorized');
    }
    return res.json({id: replay});
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const {authorization} = req.headers;
    return authorization ? getAuthTokenId(req, res)
        : handleSignin(db, bcrypt, req, res)
            .then(data =>
                data.id && data.email ? createSession(data) : Promise.reject(data))
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
}

module.exports = {
    signinAuthentication: signinAuthentication,
    redisClient
}
