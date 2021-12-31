global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const morgan = require('morgan');
const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");
const sanitize = require("./middleware/sanitize");

const productsController = require("./controllers-layer/products-controller");
const authController = require("./controllers-layer/auth-controller");
const usersController = require("./controllers-layer/users-controller");
const fs = require("fs");


const server = express();

// Prevent DOS attack:
server.use("/api/", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 100, // max requests per IP for windowMs.
    message: "Calm down please!" // custom message to return
}));

server.use(helmet());
server.use(cors());
server.use(morgan("dev"));
server.use(fileUpload());
server.use(express.json());

// Prevent XSS attack:
server.use(sanitize);


// Expose index.html from Backend/frontend directory:
server.use(express.static(path.join(__dirname, "frontend")));

// Create images folder and products sub folder products if not exists:
if (!fs.existsSync("./images")) fs.mkdirSync("./images");
if (!fs.existsSync("./images/products")) fs.mkdirSync("./images/products");

server.use("/api/products", productsController);
server.use("/api/auth", authController);
server.use("/api/users", usersController);

// Serve index.html on any other non-existing route
server.use("*", (request, response) => {

    // If our backend doesn't serve SPA frontend:
    response.status(404).send("Route not found");

    // If our backend serve SPA frontend:
    // response.sendFile(__dirname + "/frontend/index.html");

})

server.use("*", (request, response) => response.status(404).send("Route not found."));

const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening..."));