import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">GlassGift</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/signup">
              <NavItem>Signup</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
