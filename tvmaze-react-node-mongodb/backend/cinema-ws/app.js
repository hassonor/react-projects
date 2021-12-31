global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express  = require("express");
const  {readdirSync} = require("fs");
const morgan = require('morgan');
const cors = require("cors");
const HttpError = require("../subscriptions-ws/models/http-error");

require("dotenv").config();
const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true}))
server.use(express.json({limit: "6mb"}));

// autoload routes.
readdirSync('./routes').map((route)=> server.use("/api",require(`./routes/${route}`)));

server.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

server.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

const port = config.PORT || 3002;

server.listen(port, () => console.log(`Listening to port ${port}...`));
