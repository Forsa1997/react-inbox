import React from "react";
import { Component } from "react/cjs/react.production.min";


class Message extends Component {

    messageRead = () => this.props.message.read ? "read " : "unread "
    messageSelected = () => this.props.message.selected ? "selected" : "";
    messageStarred = () => this.props.message.starred ? "" : "-o";
    messageBody = () => this.props.message.message === undefined ? "" : <div class="row message-body">
        <div class="col-xs-11 col-xs-offset-1">
            {this.props.message.message}
        </div>
    </div>
    messageLabel = () => this.props.message.labels === undefined ? "" : this.props.message.labels.map((label) => <span class="label label-warning">{label}</span>)
    toggleChecked = () => {
        let msg = this.props.message;
        msg.selected = !this.props.message.selected;
        this.props.msgChanged(msg);
    }
    toggleStarred = () => {
        let msg = this.props.message;
        msg.starred = !this.props.message.starred;
        this.props.msgChanged(msg);
    }

    render() {
        return (
            <div>
                <div className={"row message " + this.messageRead() + this.messageSelected()}>
                    <div className="col-xs-1">
                        <div className="row">
                            <div className="col-xs-2">
                                <input type="checkbox" checked={this.props.message.selected} onChange={this.toggleChecked} />
                            </div>
                            <div className="col-xs-2">
                                <i className={"star fa fa-star" + this.messageStarred()} onClick={this.toggleStarred}></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        {this.messageLabel()}
                        <a href="#">
                            {this.props.message.subject}
                        </a>
                    </div>
                </div>
                {this.messageBody()}
            </div>
        )
    }
}

export default Message;