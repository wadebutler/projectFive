import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";

class App extends Component {
  constructor(){
    super();
    this.state = {
      // userName: "",
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
    
    const dbref = firebase.database().ref();
    const messageToBe = this.state.userInput

    if (messageToBe !== "") {
      dbref.push(messageToBe)
      this.setState({ userInput: "" })
    }
  }

  componentDidMount(){
    const dbref = firebase.database().ref();

    dbref.on("value", (response) => {
      // console.log(response.val())

      const defaultChat = [];

      const data = response.val();

      for (let key in data) {
        defaultChat.push({
          key: key, 
          message: data[key],
          dateCreated: new Date().toLocaleString("en-US") 
        });
      }

      this.setState({
        chat: defaultChat,
      })
    })
  }

  render(){
    return(
      <main>

        <section className="chatWindow">

          {this.state.chat.map((message) => {
            return <p>{message.message} {message.dateCreated}</p>
          })}
        </section>

        <form action="submit">
          
          <label htmlFor="send">type message</label>

          {/* <textarea name="send" id="send" cols="30" rows="10" 
          onChange={this.handleChange}
          value={this.state.userInput} 
          ></textarea> */}

          <input type="text" name="send" id="send" 
            onChange={this.handleChange}
            value={this.state.userInput} 
          />

          <button name="send" onClick={this.handleSubmit} type="submit">Send:</button>

        </form>
      </main>
    )
  }
}

export default App;
