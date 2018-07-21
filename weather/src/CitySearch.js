import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';


class CitySearch extends React.Component {
  constructor(props){
    super(props);
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
      <section className="city-search">
        <InputGroup>
          <Input 
            type="text" 
            placeholder="Enter a town/city name" 
            value={this.state.value} 
            onChange={this.handleInput.bind(this)}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={this.handleCitySearch.bind(this)}>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </section>
    );
  }
}

export default CitySearch;