global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {readdirSync} = require("fs");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true}))

server.use(express.json());

// autoload routes.
readdirSync('./routes').map((route)=> server.use("/",require(`./routes/${route}`)));

const port = config.PORT || 8005;

server.listen(port, () => console.log(`Listening to port ${port}...`));


// mongoDB -> hassonor333@gmail.com
