import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";

class App extends Component {
  constructor(){
    super();
    this.state = {
      chat: [],
      userInput: "",
    }
  }

  // save your typed message in a userInput state
  handleChange = (event) => {
    event.preventDefault();

    this.setState({ userInput: event.target.value })
  }

  // submit your message to database
  handleSubmit = (event) => {
    event.preventDefault();
    
    const dbref = firebase.database().ref("/chatDefault");
    const messageObject = {
      "messageToBe": this.state.userInput,
      "timeOfMessage": new Date().toLocaleString("en-US"),
    }
    
    if (this.state.userInput !== "") {
      dbref.push(messageObject)
      this.setState({ userInput: "" })

      
    }
  }

  componentDidMount(){
    const dbref = firebase.database().ref("/chatDefault");

    dbref.on("value", (response) => {

      const defaultChat = [];
      const data = response.val();

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

        <section className="chatWindow">

          {this.state.chat.map((message) => {
            return <div key={message.key}> <p>{message.message} {message.dateCreated}</p> </div>
          })}

          <div className="windowBottom"></div>
        </section>

        <form action="submit">
          
          <label htmlFor="send">type message:</label>

          <input type="text" name="send" id="send" 
            onChange={this.handleChange}
            value={this.state.userInput} 
          />

          <button name="send" onClick={this.handleSubmit} type="submit">Send</button>

        </form>
      </main>
    )
  }
}

export default App;
