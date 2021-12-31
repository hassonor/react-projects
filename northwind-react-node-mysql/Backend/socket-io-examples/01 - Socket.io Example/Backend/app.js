const express = require("express");
const io = require("socket.io"); // npm i socket.io
const server = express();

// Listen using express but get back a listener object: 
const listener = server.listen(3001, () => console.log("Listening..."));

// Create sockets manager object:
const socketsManager = io(listener, { cors: { origin: "*" } });

// Listen to connection event from any client: 
socketsManager.sockets.on("connection", socket => {

    console.log("One client has been connected. Total clients: " + socketsManager.engine.clientsCount);

    // Listen to disconnect event from the connected client: 
    socket.on("disconnect", () => {
        console.log("A specific client has been disconnected. Total clients: " + (socketsManager.engine.clientsCount - 1)); // We're about to disconnect.
    });

    // Listen to client message: 
    socket.on("msg-from-client", msg => {
        console.log("Client sent message: ", msg);
    });

    // Each random ms: 
    setInterval(() => {

        // Send some message to the connected client:
        socket.emit("msg-from-server", "Here is some random number: " + Math.random());

    }, getRandomMS());

});

function getRandomMS() {
    return Math.floor(Math.random() * 2000 + 1000);
}

