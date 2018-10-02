import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

class UnknownAccess extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="UnknownAccess">
        <Alert bsStyle="danger" className="center-block text-center">
          <h2>Unknown Access to your account</h2>
          <h5>Verify this device using your email to log back in.</h5>
          <Button className="btn btn-default btn-sm" onClick={() => this.props.history.push('/')}>OK</Button>
          <p>{this.props.error}</p>
        </Alert>
      </div>
    );
  }
}

export default UnknownAccess;
