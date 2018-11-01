import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import { getUserId } from '../../utils';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const userId = getUserId();
    return (
      <div className="Dashboard">
        <PageHeader>Dashboard</PageHeader>
        <Button bsSize="large" className="pull-left" onClick={()=> {this.props.history.replace(`/profile/${userId}`)}}>
              Profile
          </Button>
          <Button bsSize="large"  className="pull-left" onClick={()=> {this.props.history.replace('/search')}}>
              Search NGOs
          </Button>

      </div>
    );
  }
}

export default Dashboard;
