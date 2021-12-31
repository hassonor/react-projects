const dal = require("../data-access-layer/dal");
const uuid = require("uuid"); // npm i uuid
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {

    // Hash password:
    user.password = cryptoHelper.hash(user.password);

    // Create uuid:
    user.uuid = uuid.v4();
    
    const sql = "INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)";
    const info = await dal.executeAsync(sql, [user.uuid, user.firstName, user.lastName, user.username, user.password]);

    // Delete password, so it won't return to the frontend:
    delete user.password;

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    // Get back all columns without password and without id:
    const sql = `SELECT uuid, firstName, lastName, username FROM users WHERE username = ? AND password = ?`;
    const users = await dal.executeAsync(sql, [credentials.username, credentials.password]);
    if (users.length === 0) return null;
    const user = users[0];

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};