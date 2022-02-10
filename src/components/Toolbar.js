import React from "react";
import { Component } from "react/cjs/react.production.min";

class Toolbar extends Component {


    messagesSelected = () => {
        if (this.props.messagesSelected === "all") {
            return "fa fa-check-square-o"
        } else if (this.props.messagesSelected === "some") {
            return "fa fa-minus-square-o";
        } else {
            return "fa fa-square-o"
        }
    }
    messagesSelectedToolbar = () => {
        if (this.props.messagesSelected === "all") {
            this.props.setAllSelected(false)
        } else {
            this.props.setAllSelected(true)
        }
    }

    unreadMessageOutput = () => this.props.unreadMessages === 1 ? "unread message" : "unread messages";  

    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.props.unreadMessages}</span>
                        {this.unreadMessageOutput()}
                    </p>

                    <a className="btn btn-danger" onClick={e => {
                        e.preventDefault();
                        this.props.toggleCompose();
                    }}>
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default" onClick={this.messagesSelectedToolbar}>
                        <i className={this.messagesSelected()}></i>
                    </button>

                    <button className="btn btn-default" onClick={() => this.props.setMessagesReadStatus(true)} disabled={this.props.messagesSelected === "none"}>
                        Mark As Read
                    </button>

                    <button className="btn btn-default" onClick={() => this.props.setMessagesReadStatus(false)} disabled={this.props.messagesSelected === "none"}>
                        Mark As Unread
                    </button>

                    <select className="form-control label-select" onChange={this.props.setLabels} disabled={this.props.messagesSelected === "none"}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={this.props.removeLabels} disabled={this.props.messagesSelected === "none"}>
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.props.removeMessage} disabled={this.props.messagesSelected === "none"}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
         
            </div>
        )
    }

}



export default Toolbar;