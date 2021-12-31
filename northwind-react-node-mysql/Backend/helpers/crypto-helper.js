const crypto = require("crypto");

// SHA: Secure Hashing Algorithm
// HMAC: Hash based Message Authentication Code

function hash(plainText) {
    if (!plainText) return null;

    const salt = config.passwordSecretSalt;
    return crypto.createHmac("sha512", salt).digest("hex");
}

module.exports = {
    hash
}