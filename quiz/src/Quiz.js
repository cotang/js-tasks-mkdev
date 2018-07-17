import React, { Component } from 'react';
import './Quiz.css';

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/photos/').then(res => {
    fetch('assets/data.json').then(res => {
      console.log(res)
      return res.json()
    }).then(res => {
      console.log(res)
        this.setState({ data: res});
    });
  }

  render() {
    // var test = this.state.data[0].title;

    if (this.state.data) {
      return (
        <div>
          {/*
          <p>{this.state.data[0].title}</p>
          <img src={this.state.data[0].url} />
        */}
        </div>
      )
    }
    else {
      return <div>Loading...</div>
    }
  }
}

export default Quiz;
