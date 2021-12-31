// The socket object through which we are sending and receiving data:
let socket;

function connect() {
    
    // Connect to the server:
    socket = io.connect("http://localhost:3001");

    // Listen to server messages: 
    socket.on("msg-from-server", msg => {
        console.log(msg);
    });

}

function disconnect() {
    // Disconnect from the server: 
    socket.disconnect();
}

function send() {
    // Sending some message to the server: 
    socket.emit("msg-from-client", "I'm a cool client!");
}