import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";

class App extends Component {
  constructor(){
    super();
    this.state = {
      chat: [],
      userMessage: "",
      userName: "",
    }
  }

  // save your typed message in a userInput state
  handleMessageChange = (event) => {
    event.preventDefault();

    this.setState({ userMessage: event.target.value })
  }

  handleNameChange = (event) => {
    event.preventDefault();

    this.setState({ userName: event.target.value })
  }

  handleNameSubmit = (event) => {
    event.preventDefault();



    // const dbref = firebase.database().ref("/userNames");

    // const nameObject = {
    //   "nameToBe": this.state.userName,
    // }

    // if (this.state.userName !== "") {
    //   dbref.push(nameObject)
    // }
  }

  // submit your message to database
  handleMessageSubmit = (event) => {
    event.preventDefault();
    
    const dbref = firebase.database().ref("/chatDefault");
    const messageObject = {
      "messageToBe": this.state.userMessage,
      "timeOfMessage": new Date().toLocaleString("en-US"),
      "nowTime": Date.now(),
    }


    
    if (this.state.userMessage !== "") {
      dbref.push(messageObject)
      this.setState({ userMessage: "" })
    }

    // const now = Date.now();
    // const cutoff = now - 2 * 60 * 60 * 1000;

    // console.log(messageObject.timeOfMessage)

    // this.state.chat.forEach(() => {
    //   if (now >= cutoff) {
    //   }
    // })
  }

  componentDidMount(){
    const dbref = firebase.database().ref("/chatDefault");
    // this.setState({ chat: dbref})
    // console.log(this.state.chat)
    // dbref.on("value", (responce) => {
      // console.log(responce.val())
      
    // })

    dbref.on("value", (snapshot) => {

      const defaultChat = [];
      const data = snapshot.val();

      for (let key in data) {
        defaultChat.push({
          key: key, 
          message: data[key].messageToBe,
          dateCreated: data[key].timeOfMessage
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
      <main>
        <form>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text"
          onChange={this.handleNameChange}
          />
          <button onClick={this.handleNameSubmit} type="submit">Chat!</button>
        </form>

        <section className="chatWindow">

          {this.state.chat.map((message) => {
            return <div key={message.key}> <span>{this.state.userName}</span> <p>{message.message} {message.dateCreated}</p> </div>
          })}

          <div className="windowBottom"></div>
        </section>

        <form>
          <label htmlFor="send">type message:</label>
          
          <input type="text" id="send" 
            onChange={this.handleMessageChange}
            value={this.state.userMessage} 
          />

          <button onClick={this.handleMessageSubmit} type="submit">Send</button>
        </form>
      </main>
    )
  }
}

export default App;
