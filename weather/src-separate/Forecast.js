import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import CitySearch from './CitySearch';
import moment from 'moment'



class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      initialLat: null,
      initialLng: null,
      weatherData: null,
      url: 'https://api.openweathermap.org/data/2.5/forecast'
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
        <section className="forecast">
          <Container>
            <div className="mb-3">
              <CitySearch searchCityData={this.loadLocationData.bind(this)} />
            </div> 

            { (wD.cod == 200) ?
              <div>
                <h2 className="text-center mb-3">Location - {wD.city.name}</h2>
                <Row>
                  { wD.list.map((time, i) => 
                    <Col xs="6" md="4" lg="3" className="mb-3 d-flex" key={i}>
                      <Card className="flex-fill">
                        <CardBody>
                          <div>Time - <strong>{moment(time.dt*1000).format('HH:mm')}</strong> {moment(time.dt*1000).format('DD.MM.YY')}</div>
                          <div className="weather-block">
                            <span>Weather - {time.weather[0].main}, {time.weather[0].description} </span>
                            <img src={'https://openweathermap.org/img/w/'+time.weather[0].icon+'.png'} alt={time.weather[0].description} />
                          </div>
                          <div>Temperature - <strong>{time.main.temp.toFixed(0)}°C</strong></div>
                        </CardBody> 
                      </Card>
                    </Col>
                  ) }
                </Row>              
              </div>         
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

export default Forecast;