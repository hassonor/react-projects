global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express  = require("express");
const  {readdirSync} = require("fs");
const morgan = require('morgan');
const cors = require("cors");

require("dotenv").config();
const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true}))
server.use(express.json({limit: "6mb"}));

// autoload routes.
readdirSync('./routes').map((route)=> server.use("/api",require(`./routes/${route}`)));

const port = config.PORT || 3001;

server.listen(port, () => console.log(`Listening to port ${port}...`));
