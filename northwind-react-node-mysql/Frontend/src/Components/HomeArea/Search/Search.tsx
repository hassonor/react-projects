import { Component, SyntheticEvent } from "react";
import css from "./Search.module.css";

interface SearchState {
    textToSearch: string;
    backColor: string;
}

class Search extends Component<{}, SearchState> {

    public constructor(props: {}) {
        super(props);
        this.state = { textToSearch: "", backColor: "cyan" };
    }

    private textChanged = (args: SyntheticEvent) => {
        const value = (args.target as HTMLInputElement).value;
        this.setState({ textToSearch: value });
        this.dynamicSpanBackColor = { backgroundColor: value };
    }

    private clear = () => {
        this.setState({ textToSearch: "" });
        if (this.state.backColor === "cyan") {
            this.setState({ backColor: "pink" });
        }
        else {
            this.setState({ backColor: "cyan" });
        }
        this.dynamicStyling = { backgroundColor: this.state.backColor };
    }

    private dynamicStyling = { backgroundColor: "" };
    private dynamicSpanBackColor = { backgroundColor: "" };

    public render(): JSX.Element {
        return (
            <div className={css.Search + " Box"} style={this.dynamicStyling}>

                <input className={css.TextBox} type="text" onChange={this.textChanged} value={this.state.textToSearch} />

                <span className={css.SpanText} style={this.dynamicSpanBackColor}>
                    Searching for: {this.state.textToSearch}
                </span>

                <button className={css.Button} onClick={this.clear}>
                    Clear
                </button>

            </div>
        );
    }
}

export default Search;
