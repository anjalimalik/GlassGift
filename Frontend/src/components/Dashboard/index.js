import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';

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
        <Button bsSize="large" className="pull-left" onClick={()=> {this.props.history.replace('/profile')}}>
              Profile
          </Button>
          <br />
          <br />
          <br />
          <Button bsSize="large"  className="pull-left" onClick={()=> {this.props.history.replace('/')}}>
              Search NGOs
          </Button>

      </div>
    );
  }
}

export default Dashboard;
