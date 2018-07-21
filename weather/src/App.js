import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import Forecast from './Forecast';


class App extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: null,
      initialLng: null,
      weatherData: null,
    }
  }
  setInitialPosition(url, position) {
  	console.log(url, position)
    if (this.mounted) {
      this.setState({
        initialLat: position.coords.latitude,
        initialLng: position.coords.longitude
      })
      this.loadLocationData(url, this.state.initialLat, this.state.initialLng)
    }
  }
  loadLocationData(url, lat, lng){
  	console.log(url, lat, lng)
    if (this.state.weatherData) {
      // search request
      fetch(url+'?q='+lat+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
        .then(res => { return res.json() })
        .then(res => { 
          console.log('res search', res)
          this.setState({ 
            weatherData: res
          }) 
        });
    } else {
      // initial request
      fetch(url+'?lat='+lat+'&lon='+lng+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
        .then(res => { return res.json() })
        .then(res => { 
          console.log('res init', res)
          this.setState({ 
            weatherData: res
          }) 
        });
    }
  }
  getLocation(url){
  	// console.log(url)
    navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this, url));
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }




  render() {
    return (
      <div className="App">
        {/*
        <Weather 
        	weatherData={this.state.weatherData}
        	setUrl={this.getLocation.bind(this)}
        	loadLocationWeather={this.loadLocationData.bind(this)} />
          */}
        {
        <Forecast 
	        weatherData={this.state.weatherData}
          setUrl={this.getLocation.bind(this)}
	        loadLocationForecast={this.loadLocationData.bind(this)} /> 
        }
      </div>
    );
  }
}

export default App;
