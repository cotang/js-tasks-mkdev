import React, { Component } from 'react';
import './App.css';

import { HashRouter, Route, Switch } from 'react-router-dom';

import About from './About';
import Menu from './Menu';
import Forecast from './Forecast';
import Weather from './Weather';


class App extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: null,
      initialLng: null,
      location: null,
      weatherData: null,
      forecastData: null,
      requestType: null
    }
  }

  // initial
  getInitialLocation(url, requestType){
    console.log(this.state.requestType, requestType)
    if (this.state.location) {
      if (this.state.requestType !== requestType) {
        this.setState({
          requestType: requestType
        })
        this.loadRequestData(url, this.state.location, requestType)
      }
    } else {
      if (!(this.state.initialLat && this.state.initialLng) || (this.state.requestType !== requestType)) {
        navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this, url, requestType));
      }      
    }
  }
  setInitialPosition(url, requestType, position) {
    console.log(url, position)
    if (this.mounted) {
      this.setState({
        initialLat: position.coords.latitude,
        initialLng: position.coords.longitude,
        requestType: requestType
      })
      this.loadLocationData(url, requestType, position.coords.latitude, position.coords.longitude)
    }
  }
  loadLocationData(url, requestType, lat, lng){
    console.log('initial', url, lat, lng, requestType, this.state.location)
    if ( (requestType === 'weather' && !this.state.weatherData) || 
    (requestType === 'forecast' && !this.state.forecastData) ) {
      fetch(url+'?lat='+lat+'&lon='+lng+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
        .then(res => { return res.json() })
        .then(res => { 
          console.log('res init', this.state)
          if (requestType === 'weather') { 
            this.setState({ 
              weatherData: res
            }) 
          } else if (requestType === 'forecast') {
            this.setState({ 
              forecastData: res
            }) 
          }
        });
    }
  }

  // request
  setLocation(url, request, requestType){
    console.log(url, request)
    this.setState({
      location: request,
      requestType: requestType
    })
    this.loadRequestData(url, request, requestType)
  }
  loadRequestData(url, request, requestType){
    console.log('request', url, request, this.state.location, this.state.requestType, requestType);
    if ( (request !== this.state.location) ||
    (request === this.state.location && requestType !== this.state.requestType) ) {  
      fetch(url+'?q='+request+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
        .then(res => { return res.json() })
        .then(res => { 
          console.log('res search', this.state)
          if (requestType === 'weather') { 
            this.setState({ 
              weatherData: res
            }) 
          } else if (requestType === 'forecast') {
            this.setState({ 
              forecastData: res
            }) 
          } 
        });
    }
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    return (
      <HashRouter>
        <div>
          <Menu />
          <Switch> 
            <Route exact path="/" 
              component={({match}) => <Weather 
                match={match} 
                weatherData={this.state.weatherData}
                setUrl={this.getInitialLocation.bind(this)}
                loadLocationWeather={this.setLocation.bind(this)}                
              />}
            />
            <Route path="/forecast" 
              component={({match}) => <Forecast 
                match={match}
                forecastData={this.state.forecastData}
                setUrl={this.getInitialLocation.bind(this)}
                loadLocationForecast={this.setLocation.bind(this)}
              />}
            />
            <Route path="/about" 
              component={({match}) => <About match={match} />}
            />   
          </Switch>   
        </div>
      </HashRouter>
    )
  }
}
export default App;