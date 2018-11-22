import React, { Component } from 'react';
import { PageHeader, Button, ButtonGroup } from 'react-bootstrap';
import { getUserId } from '../../utils';
import "../Login/Login.css";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const userId = getUserId();
    return (
      <div className="Dashboard center-block text-center">
        <PageHeader>Dashboard</PageHeader>
        <ButtonGroup vertical style={{width:'30%'}}>
          <Button bsSize="large" bsStyle="info" onClick={()=> {this.props.history.replace(`/profile/${userId}`)}}>
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

export default Dashboard;
