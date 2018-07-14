import React, { Component } from 'react';
import './Timer.css';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class InputGroup extends React.Component {
  constructor(){
    super();
    this.state = {
      min: '',
      sec: '',
      validating: false,
      minValid: false,
      secValid: false
    }
  }
  handleChangeMin(event) {
    let min = isNumeric(event.target.value) ? parseInt(event.target.value, 10) : '';
    this.setState({
      min: min
    });
  }
  handleChangeSec(event) {
    let sec = isNumeric(event.target.value) ? parseInt(event.target.value, 10) : '';
    this.setState({
      sec: sec
    });
  }
  validateInputs(){
    let minValid = this.state.min < 60 && this.state.min >= 0 ? true : false;
    let secValid = this.state.sec < 60 && this.state.sec >= 0 ? true : false;
    this.setState({
      validating: true,
      minValid: minValid,
      secValid: secValid
    });
  }
  handleAddTimer() {
    this.validateInputs();
    if (this.state.minValid && this.state.secValid){
      let ms = (this.state.min * 60 + this.state.sec) * 1000;
      this.props.onAddTimer(ms);
      this.resetInputs();
    }
  }
  resetInputs() {
    this.setState({
      min: '',
      sec: '',
      validating: false,
      minValid: false,
      secValid: false
    })
  }


  render() {
    return (
      <div className="input-group">
        <input 
          className={this.state.validating && !this.state.minValid ? "error" : ""}
          type="text" 
          placeholder="Min" 
          value={this.state.min} 
          onChange={this.handleChangeMin.bind(this)} />
        <input 
          className={this.state.validating && !this.state.secValid ? "error" : ""}
          type="text" 
          placeholder="Sec" 
          value={this.state.sec} 
          onChange={this.handleChangeSec.bind(this)} />
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





