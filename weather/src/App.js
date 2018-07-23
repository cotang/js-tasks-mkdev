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
      this.loadLocationData(url, position.coords.latitude, position.coords.longitude)
    }
  }
  loadLocationData(url, lat, lng){
    console.log('initial', url, lat, lng)
    if (!this.state.weatherData) {      
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
  loadRequestData(url, request){
    console.log('request', url, request)
    fetch(url+'?q='+request+'&units=metric&APPID=36178c9fb4a5eb33442e9a88ec583af5')
      .then(res => { return res.json() })
      .then(res => { 
        console.log('res search', res)
        this.setState({ 
          weatherData: res
        }) 
      });
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
      <HashRouter>
        <div>
          <Menu />
          <Switch> 
            <Route exact path="/" 
              component={({match}) => <Weather 
                match={match} 
                weatherData={this.state.weatherData}
                setUrl={this.getLocation.bind(this)}
                loadLocationWeather={this.loadRequestData.bind(this)}                
              />}
            /> 
            <Route path="/forecast" 
              component={({match}) => <Forecast 
                match={match}
                weatherData={this.state.weatherData}
                setUrl={this.getLocation.bind(this)}
                loadLocationForecast={this.loadRequestData.bind(this)}
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
