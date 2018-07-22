import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, NavItem } from 'reactstrap';


class Menu extends Component {
  render() {
    return (
      <section className="main-menu">
        <Container>
          <Nav>
            <NavItem><Link className="nav-link" to="/">Weather</Link></NavItem>
            <NavItem><Link className="nav-link" to="/forecast">Forecast</Link></NavItem>
            <NavItem><Link className="nav-link" to="/about">About</Link></NavItem>
          </Nav>
        </Container>
      </section>
    );
  }
}

export default Menu;