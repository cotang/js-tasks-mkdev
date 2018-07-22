import React, { Component } from 'react';
import { Container, Card, CardBody, CardTitle } from 'reactstrap';
import './Weather.css';
import CitySearch from './CitySearch';


class Weather extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: null,
      initialLng: null,
      weatherData: null,
      url: 'https://api.openweathermap.org/data/2.5/weather'
    };
  }
  setInitialPosition(position) {
    if (this.mounted) {
      this.setState({
        initialLat: position.coords.latitude,
        initialLng: position.coords.longitude
      })
      this.loadLocationData(position.coords.latitude, position.coords.longitude)
    }
  }
  loadLocationData(lat, lng){
    var url = this.state.url;
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
        <section className="weather mb-3">
          <Container>
            <div className="mb-3">
              <CitySearch searchCityData={this.loadLocationData.bind(this)} />
            </div>

            { (wD.cod == 200) ?
              <Card>                
                <CardBody>
                  <CardTitle>Location - {wD.name}</CardTitle>
                  <div>Latitude - {wD.coord.lat}</div>
                  <div>Longitude - {wD.coord.lon}</div>                             
                  <div className="weather-block">
                    <span>Weather - {wD.weather[0].main}, {wD.weather[0].description} </span>
                    <img src={'https://openweathermap.org/img/w/'+wD.weather[0].icon+'.png'} alt={wD.weather[0].description} />
                  </div>
                  <div>Temperature - <strong>{wD.main.temp.toFixed(0)}°C</strong></div> 
                </CardBody>
              </Card>        
            :
              <div>
                <p>The city was not found, try again</p>
              </div>
            }
          </Container>
        </section>
      )
    } else {
      return (
        <section className="loading">
          <Container className="text-center mt-3">Loading...</Container>
        </section>
      )
    }
  }
}

export default Weather;
