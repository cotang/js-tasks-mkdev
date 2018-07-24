import React, { Component } from 'react';
import { Container, Card, CardBody, CardTitle } from 'reactstrap';
import './Weather.css';
import CitySearch from './CitySearch';


class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.openweathermap.org/data/2.5/weather',
      requestType: 'weather'
    };
  }
  searchLocationWeather(value){
    console.log(value)
    this.props.loadLocationWeather(this.state.url, value, this.state.requestType);
  }

  componentDidMount() {
    this.props.setUrl(this.state.url, this.state.requestType);
    console.log(this.state.url, this.state.requestType)
  }
  componentWillUnmount() {
    // this.mounted = false;
  }


  render() {
    let wD = this.props.weatherData;

    if (wD) {      
      return (
        <section className="weather mb-3">
          <Container>
            <div className="mb-3">
              <CitySearch searchCityData={this.searchLocationWeather.bind(this)} />
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
