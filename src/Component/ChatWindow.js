import React, { Component } from 'react';

class ChatWindow extends Component {
    render() {
        return (
            <main className=" wrapper">
                <form className="usernameForm">
                    <input placeholder="username" id="username" type="text" onChange={this.handleNameChange} />
                    <label htmlFor="username">Username</label>
                    <HuePicker className="colorPicker" color={this.state.color} onChange={this.handleColor} />
                </form>

                <section className="chatWindow">
                    {this.state.chat.map((message) => {
                        return <div className="messageMaster" key={message.key}>
                            <p
                                style={{ color: message.color }}
                                className="username">{message.username}:
                        </p>
                            <p className="message">{message.message}</p>
                            <p className="date">{message.dateCreated}</p>
                        </div>
                    })}
                    <div className="windowBottom"></div>
                </section>

                <form className="messageForm">
                    <label className="visuallyHidden" htmlFor="send">type message:</label>
                    <input type="text" id="send"
                        placeholder="message"
                        onChange={this.handleMessageChange}
                        value={this.state.userMessage}
                    />
                    <button onClick={this.handleMessageSubmit} type="submit">Send</button>
                </form>
            </main>
        )
    }
}

export default ChatWindow;