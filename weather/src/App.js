import React, { Component } from 'react';
import './App.css';
// second key e2ec8f1841289db691202c16b20afc35
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

  getInitialLocation(url, requestType){
    if (!this.state.location) {
      console.log('new location')
      navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this, url, requestType));
    } else {
      console.log('use existing location')
      // this.loadRequestData(url, this.state.location, requestType)
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
    if ((requestType === 'weather' && !this.state.weatherData) || (requestType === 'forecast' && !this.state.forecastData)) {      
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

  setLocation(url, request, requestType){
    console.log(url, request)
    this.setState({
      location: request,
      requestType: requestType
    })
    this.loadRequestData(url, request, requestType)
  }
  loadRequestData(url, request, requestType){
    console.log('request', url, request, this.state.location)
    // if ( request !== this.state.location && requestType !== this.state.requestType) { 
    fetch(url+'?q='+request+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
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
    // }
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