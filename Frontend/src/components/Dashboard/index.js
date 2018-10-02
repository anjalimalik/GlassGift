import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /*   componentDidMount() {} */

  render() {
    return (
      <div className="Dashboard">
        <PageHeader>Dashboard</PageHeader>
        <h1>Welcome</h1>

        <h6>Account Settings</h6>
        <h6>Activity</h6>
      </div>
    );
  }
}

export default Dashboard;
