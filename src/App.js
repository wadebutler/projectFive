import React, { Component } from 'react';
import "./styles/App.css";
import { HuePicker } from "react-color"
import firebase from "./firebase";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(){
    super();
    this.state = {
      chat: [],
      userMessage: "",
      userName: "",
      color: "#fff",
      channelNumber: 1,
      newChannel: 1,
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
    
    const dbref = firebase.database().ref(this.state.channelNumber);
    const messageObject = {
      "userNameToBe": this.state.userName,
      "messageToBe": this.state.userMessage,
      "timeOfMessage": new Date().toLocaleString("en-US"),
      "colorToBe": this.state.color,
      "dateCompare": Date.now(),
    }

    if (this.state.userMessage !== "") {
      dbref.push(messageObject)
      this.setState({ userMessage: "" })
    }
  }

  channelChange = (event) => {
    const dbrefOld = firebase.database().ref(this.state.channelNumber);
    dbrefOld.off("value");
    // console.log(event.target.value)

    this.setState({
      
      channelNumber: event.target.value,
    }, () => {
      
      this.chatMaker();
    })

  }

  chatMaker = () => {

    const dbref = firebase.database().ref(this.state.channelNumber);

    const cutoff = Date.now() - 86400000;

    dbref.once("value", () => {
      this.state.chat.forEach((message) => {
        if (message.compare < cutoff) {
            dbref.remove()
        }
      })
    })

    dbref.on("value", (snapshot) => {

      const defaultChat = [];
      const data = snapshot.val();

      for (let key in data) {
        defaultChat.push({
          key: key, 
          username: data[key].userNameToBe,
          message: data[key].messageToBe,
          dateCreated: data[key].timeOfMessage,
          color: data[key].colorToBe,
          compare: data[key].dateCompare,
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

  componentDidMount(event){
    this.chatMaker();
  }

  render(){
    return(
      <div className="master">
        <Header color={this.state.color}/>
        {/* <FontAwesomeIcon icon="faCoffee" /> */}
        <div className="main">
          <main className=" wrapper">
            <form className="usernameForm">
              <input style={{ color: this.state.color }} placeholder="username" id="username" type="text" onChange={this.handleNameChange} />
              <label style={{color: this.state.color }} htmlFor="username">Username</label>
              <HuePicker width="300px" className="colorPicker" color={this.state.color} onChange={this.handleColor} />
              <p className="channelIndicator">Chat Room: {this.state.channelNumber}</p>
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
          <section className="channelChange">
            <button onClick={this.channelChange} value="1" >Chat Room 1</button>
            <button onClick={this.channelChange} value="2" >Chat Room 2</button>
            <button onClick={this.channelChange} value="3" >Chat Room 3</button>
            <button onClick={this.channelChange} value="4" >Chat Room 4</button>
            <button onClick={this.channelChange} value="5" >Chat Room 5</button>
            <button onClick={this.channelChange} value="6" >Chat Room 6</button>
          </section>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;