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
      forecastData: null
    }
  }
  setInitialPosition(url, requestType, position) {
    console.log(url, position, requestType)
    if (this.mounted) {
      this.setState({
        initialLat: position.coords.latitude,
        initialLng: position.coords.longitude
      })
      this.loadLocationData(url, requestType, position.coords.latitude, position.coords.longitude)
    }
  }
  setLocation(url, request, requestType){
    this.setState({
      location: request,
    })
    this.loadLocationData(url, requestType, request)
    console.log(url, request, requestType, this.state.requestLocation)
  }

  loadLocationData(url, requestType, lat, lng){

      console.log(url, this.state.location)
      if (this.state.location) {
        // search request
        console.log('request', url, lat, lng)
        fetch(url+'?q='+lat+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
          .then(res => { return res.json() })
          .then(res => { 
            console.log('res search', res)
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
      } else {
        // initial request
        console.log('initial', url, lat, lng)
        fetch(url+'?lat='+lat+'&lon='+lng+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
          .then(res => { return res.json() })
          .then(res => { 
            console.log('res init', res)
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
  getInitialLocation(url, requestType){
    // console.log(url)
    navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this, url, requestType));
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this));    
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
