const io = require("socket.io");

let socketsManager;

function start(listener) {

    // Connect once to socket.io library:
    socketsManager = io(listener, { cors: { origin: "http://localhost:3000" } });
    // socketsManager = io(listener, { cors: { origin: "*" } });

    // Listen to any client connection: 
    socketsManager.sockets.on("connection", socket => {

        // socket is a connection line to only one client.
        // socketsManager.sockets is all connected sockets.

        console.log("One client has been connected.");

        socket.on("disconnect", () => {
            console.log("One client disconnect.");
        });

        socket.on("msg-from-client", msg => {
            console.log("Client sent message: ", msg);
            socketsManager.sockets.emit("msg-from-server", msg);
        });

    });
}

module.exports = {
    start
};
