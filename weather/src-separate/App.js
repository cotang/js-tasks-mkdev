import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import Forecast from './Forecast';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Weather />
        <Forecast />
      </div>
    );
  }
}

export default App;
