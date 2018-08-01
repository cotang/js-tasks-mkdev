import React, { Component } from 'react';
import './ToDo.css';
import { InputGroup, Input, InputGroupAddon, ButtonGroup, Button, ListGroup, ListGroupItem } from 'reactstrap';

class InputSection extends React.Component {
  constructor(){
    super();
    this.state = {
      value: '', 
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitToList = this.handleSubmitToList.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  handleSubmitToList(event) {
    this.props.onAddToList(this.state.value);
    this.setState({
      value: '',
    })
  }

  render() {
    return (

      <InputGroup className="mb-3">
        <Input 
          type="text" 
          placeholder="Write down new action"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <InputGroupAddon addonType="append">
          <Button onClick={this.handleSubmitToList} color="primary">Add action</Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}


class FilterSection extends React.Component {
  constructor(){
    super();
    this.state = {
      filters: [
        {'title': 'All actions', 'filter': '', checked: true},
        {'title': 'Active actions', 'filter': 'active', checked: false},
        {'title': 'Completed actions', 'filter': 'completed', checked: false},
      ],
    }
  }

  handleFilter(str, index){
    this.props.onChangeFilter(str);

    var newFilters = this.state.filters.slice();
    newFilters.forEach(function(item) {
      item.checked = false;
    });
    newFilters[index].checked = true;
    this.setState({
      filters: newFilters
    })
  }

  render() {
    return (
      <div className="mb-3 filters">
        <ButtonGroup>
          {this.state.filters.map((item, index) =>
            <Button color={item.checked ? "secondary" : "default"} onClick={this.handleFilter.bind(this, item.filter, index)} key={index}>
              {item.title}
            </Button>
          )}
        </ButtonGroup>
      </div>
    );
  }
}


class ToDo extends Component {
  constructor(){
    super();
    this.state = {
      list: [],
      filter: ''
    }
  }

  addAction(value) {
    if (value === ''){
      return;
    }
    fetch('/api/todos', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 'title': value })
    })
      .then(response => { return response.json() })
      .then(response => {
        this.setState({ list: response}) 
      });
  }

  completeAction(item){
    var id = item.key
    fetch('/api/todos/:'+id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 'id': id })
    })
      .then(response => { return response.json() })
      .then(response => {
        this.setState({ list: response}) 
      });
  }
  deleteAction(item){
    var id = item.key
    fetch('/api/todos/:'+id, {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ 'id': id })
    })
      .then(response => { return response.json() })
      .then(response => {
        this.setState({ list: response}) 
      });
  }

  changeFilter(str){
    this.setState({
      filter: str
    })
  }

  componentDidMount() {
    fetch('/api/todos')
      .then(response => { return response.json() })
      .then(response => {
        this.setState({ list: response}) 
      });
  }

  render() {

      let list = this.state.list;
      if (this.state.filter === 'completed') {
        list = list.filter(function(item) { return item.completed; });
      } else if (this.state.filter === 'active') {
        list = list.filter(function(item) { return !item.completed; });
      }

      return (
        <div className="to-do">
          <h1 className="to-do__title mb-3">To-do list</h1>
          
          <InputSection onAddToList={this.addAction.bind(this)} />

          <ListGroup className="to-do__list mb-3" id="to-do__list">
            {list.map((item, index) =>
              <ListGroupItem className={item.completed ? "to-do__item to-do__item--completed" : "to-do__item"} key={index}>
                <p className="to-do__text" >{item.title}</p>
                <ButtonGroup>
                  <Button onClick={this.completeAction.bind(this, item)}>
                    <span className="color green">&#10004;</span>{item.completed ? 'Uncomplete' : 'Complete'} action
                    </Button>
                  <Button onClick={this.deleteAction.bind(this, item)}>
                    <span className="color red">&#10008;</span>Delete action
                  </Button>
                </ButtonGroup>
              </ListGroupItem>
            )}
          </ListGroup>

          <FilterSection onChangeFilter={this.changeFilter.bind(this)} />

        </div>
      )



  }
}

export default ToDo;
