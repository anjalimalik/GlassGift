import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { removeUserToken, removeUserId, removeUserType, getUserToken, getUserId } from '../../../utils';
import { LinkContainer } from 'react-router-bootstrap';
import './Header.css';


class Header extends Component {

  constructor(props) {
    super(props);

    this.onLogoutSelect = this.onLogoutSelect.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  onLogoutSelect() {
    removeUserToken();
    removeUserId();
    removeUserType();
    this.props.history.push('/login');
  }

  renderLogout() {
    // TODO redirect to donor profile if user type 0
    const id = getUserId();
    if (getUserToken()) {
      return (
        <Nav pullRight className="header">
          <LinkContainer to="/dashboard">
            <NavItem>Dashboard</NavItem>
          </LinkContainer>
          <LinkContainer to={`/profile/${id}`}>
            <NavItem>Profile</NavItem>
          </LinkContainer>
          <NavItem onSelect={this.onLogoutSelect}>Logout</NavItem>
        </Nav>
      );
    }
    return (
      <Nav pullRight className="header">
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
        <LinkContainer to={`/signup`}>
          <NavItem>Signup</NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  render() {
    return (
      <div className="Header">
        <Navbar className="header">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">GlassGift</Link>
            </Navbar.Brand>
          </Navbar.Header>
          {this.renderLogout()}
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
