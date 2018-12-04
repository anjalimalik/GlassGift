import React, { Component } from 'react';
import { PageHeader, Button, ButtonGroup } from 'react-bootstrap';
import { USER_TYPE_DONOR } from '../../constants';
import { getUserId } from '../../utils';
import "../Login/Login.css";

export default class Dashboard extends Component {

  render() {
    const userId = getUserId();
    const userType = localStorage.getItem('type');
    const profileLink = userType === USER_TYPE_DONOR ? `/profile` : `/profile/${userId}`;

    return (
      <div className="Dashboard center-block text-center">
        <PageHeader>Dashboard</PageHeader>
        <ButtonGroup vertical style={{width:'30%'}}>
          <Button bsSize="large" bsStyle="info" onClick={()=> {this.props.history.replace(profileLink)}}>
              Profile
          </Button>
          <hr />
          <Button bsSize="large"  bsStyle="info" onClick={()=> {this.props.history.replace('/search')}}>
              Search NGOs
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
