import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { removeUserToken, getUserToken } from '../../../actions/utils';

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
    if (getUserToken()) {
      return (
        <Nav pullRight>
          <NavItem onSelect={this.onLogoutSelect}>Logout</NavItem>
        </Nav>
      );
    }
    return null;
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
