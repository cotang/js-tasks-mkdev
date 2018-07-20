import React, { Component } from 'react';
import './City.css';

function convertDegrees(k){
  return (k - 273).toFixed(0)
}

class CitySearch extends React.Component {
  constructor(){
    super();
    this.state = {
      value: '',
    }
  }
  handleInput(event) {
    this.setState({
      value: event.target.value
    })
  }
  handleCitySearch() {
    if (this.state.value){
      this.props.searchCityData(this.state.value);
      this.resetInput();
    }
  }
  resetInput() {
    this.setState({
      value: ''
    })
  }

  render() {
    return (
      <div className="city-search">
        <input 
          type="text" 
          placeholder="Enter a town/city name" 
          value={this.state.value} 
          onChange={this.handleInput.bind(this)} />
        <button className="btn" onClick={this.handleCitySearch.bind(this)}>Search</button>
      </div>
    );
  }
}





class City extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: null,
      initialLng: null,
      weatherData: null
    };
  }
  setInitialPosition(position) {
    if (this.mounted) {
      this.setState({
        initialLat: position.coords.latitude,
        initialLng: position.coords.longitude
      })
      this.loadLocationData(this.state.initialLat, this.state.initialLng)
    }
  }
  loadLocationData(lat, lng){
    if (this.state.weatherData) {
      // search request
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+lat+'&APPID=36178c9fb4a5eb33442e9a88ec583af5')
        .then(res => { return res.json() })
        .then(res => { 
          console.log('res search', res)
          this.setState({ 
            weatherData: res
          }) 
        });
    } else {
      // initial request
      fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&APPID=36178c9fb4a5eb33442e9a88ec583af5')
        .then(res => { return res.json() })
        .then(res => { 
          console.log('res init', res)
          this.setState({ 
            weatherData: res
          }) 
        });
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this));
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    let wD = this.state.weatherData;
    if (wD) {      
      return (
        <div>
          {/* <CitySearch handleCitySearch={this.loadLocationData.bind(this)} /> */}

          <p>latitude - {wD.coord.lat}</p>
          <p>longitude - {wD.coord.lon}</p>
          <p>place - {wD.name}</p>
          
          <p className="d-flex">weather - {wD.weather[0].main}, {wD.weather[0].description}
            <img src={'https://openweathermap.org/img/w/'+wD.weather[0].icon+'.png'} alt={wD.weather[0].description} />
          </p>
          <p>temperature - {convertDegrees(wD.main.temp)}°C</p>          

        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default City;