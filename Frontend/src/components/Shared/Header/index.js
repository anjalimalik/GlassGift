import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { removeUserToken, getUserToken, getUserId } from '../../../utils';
import { LinkContainer } from 'react-router-bootstrap';


class Header extends Component {

  constructor(props) {
    super(props);

    this.onLogoutSelect = this.onLogoutSelect.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  onLogoutSelect() {
    removeUserToken();
    this.props.history.push('/login');
  }

  renderLogout() {
    const id = getUserId();
    if (getUserToken()) {
      return (
        <Nav pullRight>
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
      <Nav pullRight>
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
        <Navbar>
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
