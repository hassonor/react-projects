import { Component } from "react";
import "./Clock.css";

interface ClockState {
    time: string;
}

class Clock extends Component<{}, ClockState> {

    private timerID = 0;
    private dynamicStyling = { backgroundColor: this.getRandomColor() };

    public constructor(props: {}) {
        super(props);
        this.state = { time: "" };
    }

    public componentDidMount(): void {
        this.timerID = window.setInterval(() => {
            const now = new Date();
            this.setState({ time: now.toLocaleTimeString() });
        }, 1000);
    }

    public render(): JSX.Element {
        return (
            <div className="Clock Box" style={this.dynamicStyling}>
                <p>{this.state.time}</p>
            </div>
        );
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.timerID); // Stop the timer.
    }

    private getRandomColor(): string {
        const colors = ["red", "green", "blue", "yellow", "magenta", "cyan", "white", "gray"];
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }
}

export default Clock;
