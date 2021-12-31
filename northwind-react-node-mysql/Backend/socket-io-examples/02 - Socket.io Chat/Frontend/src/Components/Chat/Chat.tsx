import { Component, SyntheticEvent } from "react";
import ChatService from "../../Services/ChatService";
import "./Chat.css";

interface ChatState {
    nickname: string;
    msg: string;
    messages: string[];
}

class Chat extends Component<{}, ChatState> {

    private chatService: ChatService = new ChatService();

    public constructor(props: {}) {
        super(props);
        this.state = { nickname: "", msg: "", messages: [] };
    }

    private connect = () => {
        this.chatService.connect();
        this.chatService.socket.on("msg-from-server", msg => {
            const messages = [...this.state.messages];
            messages.push(msg);
            this.setState({ messages });
        });
    }

    private disconnect = () => {
        this.chatService.disconnect();
    }

    private msgHandler = (args: SyntheticEvent) => {
        const msg = (args.target as HTMLInputElement).value;
        this.setState({ msg });
    }

    private nicknameHandler = (args: SyntheticEvent) => {
        const nickname = (args.target as HTMLInputElement).value;
        this.setState({ nickname });
    }

    private send = () => {
        this.chatService.send(this.state.nickname + ": " + this.state.msg);
        this.setState({ msg: "" });
    }

    public render(): JSX.Element {
        return (
            <div className="Chat">

                <h1>Socket.io Chat</h1>

                <button onClick={this.connect}>Connect</button>
                <button onClick={this.disconnect}>Disconnect</button>
                <br /><br />

                <label>Nickname: </label>
                <input type="text" onChange={this.nicknameHandler} value={this.state.nickname} />
                <br /><br />

                <label>Message: </label>
                <input type="text" onChange={this.msgHandler} value={this.state.msg} />
                <button onClick={this.send}>Send</button>
                <br /><br />

                <div>
                    {this.state.messages.map((msg, index) => <div key={index}>{msg}</div>)}
                </div>

            </div>
        );
    }
}

export default Chat;
