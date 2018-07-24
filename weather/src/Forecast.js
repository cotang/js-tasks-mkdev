import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import CitySearch from './CitySearch';
import moment from 'moment'



class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      requestType: 'forecast'
    };
  }
  searchLocationForecast(value){
    console.log(value)
    this.props.loadLocationForecast(this.state.url, value, this.state.requestType);
  }

  componentDidMount() {
    this.props.setUrl(this.state.url, this.state.requestType);
    console.log(this.state.url, this.state.requestType)
  }
  componentWillUnmount() {
    // this.mounted = false;
  }


  render() {
    let wD = this.props.forecastData;    
    
    if (wD) {  
  
      return (
        <section className="forecast">
          <Container>
            <div className="mb-3">
              <CitySearch searchCityData={this.searchLocationForecast.bind(this)} />
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