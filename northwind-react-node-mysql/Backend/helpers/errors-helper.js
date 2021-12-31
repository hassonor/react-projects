function getError(err) {
    // On Production return general error
    if (config.isProduction) {
        return "Some error occurred, please try again later";
    }

    // On Development return the original error
    return err.message;
}

module.exports = {
    getError
};