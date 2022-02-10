import React from "react";
import { Component } from "react/cjs/react.production.min";
import Message from "./Message";
import Toolbar from './Toolbar';
import ComposeBox from "./ComposeBox";


class MessageList extends Component {

    state = {
        composeVisible: false,
        messages: []
    }

    BaseURL = `http://localhost:8082`

    componentDidMount = async () => {
        const responseMessages = await fetch(`${this.BaseURL}/api/messages`);
        const messagesJson = await responseMessages.json();
        this.setState({
            ...this.state,
            messages: messagesJson,
        })
    }

    // compontentDidMount = async () => {
    //     await fetch(`${this.BaseURL}/api/messages`)
    //     .then(response => response.json())
    //     .then(data => this.setState({ messages: data }))

    //     console.log(this.state.messages);
    // }

    setAllSelected = (allSelected) => {
        let messageList = this.state.messages
        for (let i = 0; i < this.state.messages.length; i++) {
            messageList[i].selected = allSelected;
        }
        this.setState({ messages: messageList })
    }

    msgChanged = async (msg, newMsg, command) => {
        let successful = false;
        if (command !== "select") {
            successful = await this.apiCall([msg], command);
        }
        if (successful || command === "select") {
            let messageList = this.state.messages
            for (let i = 0; i < this.state.messages.length; i++) {
                if (messageList[i].id === msg.id) {
                    messageList[i] = newMsg;
                }
            }
            this.setState({ ...this.state, messages: messageList })
        }
    }

    apiCall = async (msg, command, status) => {
        let idList = []
        msg.forEach(msg => idList.push(msg.id));
        const response = await fetch(`${this.BaseURL}/api/messages`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    messageIds: idList,
                    command: command,
                    read: status,
                    label: status,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
        if (response.status === 200) {
            return true;
        }
        return false;
    }

    apiPostCall = async (subject, body) => {

        const response = await fetch(`${this.BaseURL}/api/messages`,
            {
                method: "POST",
                body: JSON.stringify({
                    subject: subject,
                    body: body,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
        return response.json();
    }

    getSelectedMessages = () => {
        let messageList = []
        for (let i = 0; i < this.state.messages.length; i++) {
            if (this.state.messages[i].selected) {
                messageList = [...messageList, this.state.messages[i]]
            }
        }
        return messageList;
    }

    countSelected = () => {
        var counter = 0;
        this.state.messages.forEach(
            message => {
                if (message.selected === true) {
                    counter++;
                }
            }
        )
        if (counter === 0) {
            return "none"
        } else if (counter < this.state.messages.length) {
            return "some"
        } else {
            return "all"
        }
    }

    setMessagesReadStatus = (status) => {
        let selectedMessagesList = this.getSelectedMessages();
        let allMessagesList = this.state.messages;
        if (this.apiCall(selectedMessagesList, "read", status)) {
            for (let i = 0; i < allMessagesList.length; i++) {
                if (allMessagesList[i].selected) {
                    allMessagesList[i].read = status;
                }
            }
            this.setState({ messages: allMessagesList })
        }
    }

    setLabels = (e) => {
        if (e.target.value !== "Apply label") {
            let selectedMessagesList = this.getSelectedMessages();
            let allMessagesList = this.state.messages;
            if (this.apiCall(selectedMessagesList, "addLabel", e.target.value)) {
                allMessagesList.forEach(message => {
                    if ((message.selected && !message.labels.includes(e.target.value))) {
                        message.labels.push(e.target.value);
                    }
                })
                this.setState({ messages: allMessagesList })
            }
        }
    }


    removeLabels = (e) => {
        if (e.target.value !== "Remove label") {
            let selectedMessagesList = this.getSelectedMessages();
            let allMessagesList = this.state.messages;
            if (this.apiCall(selectedMessagesList, "removeLabel", e.target.value)) {
                allMessagesList.forEach(message => {
                    if ((message.selected && message.labels.includes(e.target.value))) {
                        message.labels.splice(message.labels.indexOf(e.target.value), 1);
                    }
                })
                this.setState({ messages: allMessagesList })
            }
        }
    }

    removeMessage = () => {
        let selectedMessagesList = this.getSelectedMessages();
        let allMessagesList = [];
        if (this.apiCall(selectedMessagesList, "delete")) {
            this.state.messages.forEach(message => {
                if (!message.selected) {
                    allMessagesList.push(message)
                }
            })
            this.setState({ messages: allMessagesList })
        }
    }

    addMessage = (subject, body) => {
        let response = this.apiPostCall(subject, body);
        response.then(msg => this.setState({ ...this.state, messages: [...this.state.messages, msg] }));
    }


    unreadMessages = () => {
        let count = 0;
        this.state.messages.forEach(message => {
            if (!message.read) {
                count++;
            }
        })
        return count;
    }

    toggleCompose = () => {
        this.setState({ ...this.state, composeVisible: !this.state.composeVisible });
    }


    render() {
        return (
            <div>
                <Toolbar
                    toggleCompose={this.toggleCompose}
                    setAllSelected={this.setAllSelected}
                    messagesSelected={this.countSelected()}
                    setMessagesReadStatus={this.setMessagesReadStatus}
                    setLabels={this.setLabels}
                    removeLabels={this.removeLabels}
                    removeMessage={this.removeMessage}
                    unreadMessages={this.unreadMessages()} />
                {this.state.composeVisible ? <ComposeBox toggleCompose={this.toggleCompose} addMessage={this.addMessage} /> : null}
                <div>
                    {this.state.messages.map((message) => <Message
                        key={message.id}
                        message={message}
                        msgChanged={this.msgChanged}
                    />)}
                </div>
            </div>
        )
    }
}

export default MessageList;