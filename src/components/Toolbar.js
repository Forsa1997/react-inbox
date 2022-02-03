import React from "react";
import { Component } from "react/cjs/react.production.min";

class Toolbar extends Component {

    constructor(props) {
        super(props)
        this.state = { messagesSelected: "all" }
        //this.messagesSelectedToolbar(true);
    }

    messagesSelected = () => {
        if (this.state.messagesSelected === "all") {
            return "fa fa-check-square-o"
        } else if (this.state.messagesSelected === "some") {
            return "fa fa-minus-square-o";
        } else {
            return "fa fa-square-o"
        }
    }
    messagesSelectedToolbar = () => {
        if (this.state.messagesSelected === "all") {
            this.props.setAllSelected(false)
        } else if (this.state.messagesSelected === "some") {
            this.props.setAllSelected(true)
        } else {
            this.props.setAllSelected(true)
        }
    }




    render() {
        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">2</span>
                        unread messages
                    </p>

                    <button className="btn btn-default" onClick={this.messagesSelectedToolbar}>
                        <i className={this.messagesSelected()}></i>
                    </button>

                    <button className="btn btn-default">
                        Mark As Read
                    </button>

                    <button className="btn btn-default">
                        Mark As Unread
                    </button>

                    <select className="form-control label-select">
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select">
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default">
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }

}



export default Toolbar;