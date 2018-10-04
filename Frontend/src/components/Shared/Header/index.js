import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">GlassGift</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default Header;
