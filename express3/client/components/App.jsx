import React, { Component } from 'react';
import logo1 from "./logo1.jpg"
import logo3 from "./logo3.png"

class App extends Component {

  render() {
    return (
      <div>
        <h1>Hello Big Bright World</h1>
        <img src={"public/"+logo1} alt="logo1" /> 
        <img src={"public/"+logo3} alt="logo3" /> 
      </div>
    );
  }
}

export default App;