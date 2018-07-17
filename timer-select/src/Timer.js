import React, { Component } from 'react';
import './Timer.css';


class InputGroup extends React.Component {
  constructor(){
    super();
    this.state = {
      minHi: '',
      minLo: '',
      secHi: '',
      secLo: ''
    }
  }
  handleChangeSelect(param, event) {
    this.setState({
      [param]: event.target.value
    })
  }  
  handleAddTimer() {    
    let ms = (Number(this.state.minHi+this.state.minLo) * 60 + Number(this.state.secHi+this.state.secLo)) * 1000;
    this.props.onAddTimer(ms);
  }


  render() {
    return (
      <div className="input-group">
        <div className="input-block">
          <small>Minutes</small>
          <select onChange={this.handleChangeSelect.bind(this, 'minHi')}>
            {Array(6).fill(null).map((el, i) => <option key={i} value={i}>{i}</option> )} 
          </select>
          <select onChange={this.handleChangeSelect.bind(this, 'minLo')}>
            {Array(10).fill(null).map((el, i) => <option key={i} value={i}>{i}</option> )} 
          </select>
        </div>

        <div className="input-block">
          <small>Seconds</small>
          <select onChange={this.handleChangeSelect.bind(this, 'secHi')}>
            {Array(6).fill(null).map((el, i) => <option key={i} value={i}>{i}</option> )} 
          </select>
          <select onChange={this.handleChangeSelect.bind(this, 'secLo')}>
            {Array(10).fill(null).map((el, i) => <option key={i} value={i}>{i}</option> )} 
          </select>
        </div>

        <button className="btn" onClick={this.handleAddTimer.bind(this)}>Set counter</button>
      </div>
    );
  }
}


class Timer extends Component {
  constructor(){
    super();
    this.state = {
      value: 1500000,
      isCounting: false
    }
  }

  setCounter(newTime) {
    this.setState({      
      value: newTime,
    })
  }

  counting(){
    var newValue = this.state.value;
    newValue = newValue - 1000;
    this.setState({
      value: newValue
    })
  }

  startCounting(){
    if (!this.state.isCounting) {
      this.timer = setInterval(this.counting.bind(this), 1000);
      this.setState({
        isCounting: true
      })
    }
  }
  stopCounting(){
    clearInterval(this.timer);
    this.setState({
      isCounting: false
    })
  }
  resetCounting(){
    clearInterval(this.timer);
    this.setState({
      value: 1500000,
      isCounting: false
    })
  }

  convertTime(milliseconds) {
    var sec = milliseconds/1000;  
    var minAmount = Math.floor(sec/60);
    var secAmount = Math.floor(sec%60);
    if (secAmount < 10) secAmount = '0' + secAmount; 
    return minAmount + ':' + secAmount;
  }



  render() {
    let shownTime = this.convertTime(this.state.value);

    return (
      <div className="timer">
        <h1 className="timer__title">Timer</h1>

        <div className="timer__counter">{shownTime}</div>

        <div className="timer__buttons">
          <button className="btn" onClick={this.startCounting.bind(this)}>Start</button>
          <button className="btn" onClick={this.stopCounting.bind(this)}>Stop</button>
          <button className="btn" onClick={this.resetCounting.bind(this)}>Reset</button>
        </div>

        <InputGroup onAddTimer={this.setCounter.bind(this)} />

      </div>
    );
  }
}

export default Timer;





