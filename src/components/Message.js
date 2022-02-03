import React from "react";
import { Component } from "react/cjs/react.production.min";


class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            subject: props.subject,
            read: props.read,
            starred: props.starred,
            selected: props.selected,
            labels: props.labels,
            message: props.message
        };
        // this.state = { read: false, selected: false, starred: false, labels: ["dev", "personal"], message: "Hi", subject: "This is the subject" };
    }

    messageRead = () => this.state.read ? "read " : "unread "
    messageSelected = () => this.state.selected ? "selected" : "";
    messageChecked = () => this.state.selected ? "checked" : "";
    messageStarred = () => this.state.starred ? "" : "-o";
    messageBody = () => this.state.message === undefined ? "" : <div class="row message-body">
        <div class="col-xs-11 col-xs-offset-1">
            {this.state.message}
        </div>
    </div>
    messageLabel = () => this.state.labels === undefined ? "" : this.state.labels.map((label) => <span class="label label-warning">{label}</span>)

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
                        {this.messageLabel()}
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