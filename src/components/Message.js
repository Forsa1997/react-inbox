import React from "react";
import { Component } from "react/cjs/react.production.min";


class Message extends Component {

    constructor(props) {
        super(props);
        // this.state.read = props.read;
        // this.state.selected = props.selected;
        // this.state.starred = props.starred;
        // this.state.message = props.message;
        // this.state.labels = props.labels;
        // this.state.subject = props.subject;
        this.state = { read: false, selected: false, starred: false, labels: ["dev", "personal"], message: "Hi", subject: "This is the subject" };
    }

    messageRead = () => this.state.read ? "read " : "unread "
    messageSelected = () => this.state.selected ? "selected" : "";
    messageChecked = () => this.state.selected ? "checked" : "";
    messageStarred = () => this.state.starred ? "" : "-o";
    messageBody = () => this.state.message == undefined ? "" : <div class="row message-body">
        <div class="col-xs-11 col-xs-offset-1">
            {this.state.message}
        </div>
    </div>


    render() {
        return (
            <div>
                <div className={"row message " + this.messageRead() + this.messageSelected()}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input type="checkbox" checked={this.messageChecked()} />
                            </div>
                            <div className="col-xs-2">
                                <i className={"star fa fa-star" + this.messageStarred()}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        {this.state.labels.map((label) => <span class="label label-warning">{label}</span>)}
                        <a href="#">
                            {this.state.subject}
                        </a>
                    </div>
                </div>
                {this.messageBody()}
            </div>
        )
    }
}

export default Message;