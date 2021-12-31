const express = require("express");
const chatLogic = require("./chat-logic");
const server = express();

const listener = server.listen(3001, () => console.log("Listening..."));
chatLogic.start(listener);
