global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const productsController = require("./controllers-layer/products-controller");
const server = express();

server.use(express.json());
server.use("/api/products", productsController);

server.listen(3001, () => console.log("Listening..."));
