import React, { Component } from 'react';
import "./styles/App.css";
import { HuePicker } from "react-color"
import firebase from "./firebase";

class App extends Component {
  constructor(){
    super();
    this.state = {
      chat: [],
      userMessage: "",
      userName: "",
      color: "#fff",
    }
  } 

  handleNameChange = (event) => {
    event.preventDefault();

    this.setState({ userName: event.target.value })
  }

  handleColor = (color) => {
    // event.preventDefault();

    this.setState({color: color.hex})
  }

  // save your typed message in a userInput state
  handleMessageChange = (event) => {
    event.preventDefault();

    this.setState({ userMessage: event.target.value })
  }

  // submit your message to database
  handleMessageSubmit = (event) => {
    event.preventDefault();
    
    const dbref = firebase.database().ref("/1");
    const messageObject = {
      "userNameToBe": this.state.userName,
      "messageToBe": this.state.userMessage,
      "timeOfMessage": new Date().toLocaleString("en-US"),
      "colorToBe": this.state.color,
      // "nowTime": Date.now(),
    }


    
    if (this.state.userMessage !== "") {
      dbref.push(messageObject)
      this.setState({ userMessage: "" })
    }
  }

  componentDidMount(){
    const dbref = firebase.database().ref("/1");

    dbref.on("value", (snapshot) => {

      const defaultChat = [];
      const data = snapshot.val();

      for (let key in data) {
        defaultChat.push({
          key: key, 
          username: data[key].userNameToBe,
          message: data[key].messageToBe,
          dateCreated: data[key].timeOfMessage,
          color: data[key].colorToBe
        });
      }

      this.setState({
        chat: defaultChat,
      }) 

      let element = document.querySelector('.windowBottom');
      setTimeout(function () {
        element.scrollIntoView();
      }, 100);

    })
  }

  render(){
    return(
      <div className="master">
        <header>
          <h1 style={{ color: this.state.color }} >Quick Chat</h1>
        </header>
        <main className=" wrapper">
          <form className="usernameForm">
            <input placeholder="username" id="username" type="text" onChange={this.handleNameChange} />
            <label  htmlFor="username">Username</label>
            <HuePicker className="colorPicker" color={this.state.color} onChange={this.handleColor} />
          </form>
          <div className="main">
            {/* <section className="channelChange">
              <button>channel 1</button>
              <button>channel 2</button>
              <button>channel 3</button>
              <button>channel 4</button>
              <button>channel 5</button>
            </section> */}

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
          </div>

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
        <footer>
          <h2>wade butler 2019 ©</h2> 
        </footer>
      </div>
    )
  }
}

export default App;