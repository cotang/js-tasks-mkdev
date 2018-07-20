import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
      	<ul>
        <li><Link to="/">App</Link></li>
        <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;