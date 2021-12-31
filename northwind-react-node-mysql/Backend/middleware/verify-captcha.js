const cryptoHelper = require("../helpers/crypto-helper");

function verifyCaptcha(request, response, next) {
    const originalText = request.cookies.text;
    let userText = request.body.userText;
    userText = cryptoHelper.hash(userText);
    if (originalText !== userText) {
        return response.status(400).send("CAPTCHA not valid.");
    }
    next();
}

module.exports = verifyCaptcha;