import React, { Component } from 'react';

class City extends Component {
  constructor() {
    super();
    this.state = {
      this_lat: null,
      this_lng: null
    };
  }
  setInitialPosition(position) {
    this.setState({
      this_lat: position.coords.latitude,
      this_lng: position.coords.longitude
    })
  }
  componentDidMount() {
  	navigator.geolocation.getCurrentPosition(this.setInitialPosition.bind(this));
  }

  render() {
    return (
      <div>
      	<p>latitude - {this.state.this_lat}</p>
      	<p>longitude - {this.state.this_lng}</p>
      </div>
    );
  }
}

export default City;