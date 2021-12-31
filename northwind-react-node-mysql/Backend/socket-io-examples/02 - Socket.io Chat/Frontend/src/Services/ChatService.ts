import { io, Socket } from "socket.io-client";

class ChatService {

    public socket: Socket;

    public connect(): void {
        this.socket = io("http://localhost:3001");
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    public send(msg: string): void {
        this.socket.emit("msg-from-client", msg);
    }

}

export default ChatService;
