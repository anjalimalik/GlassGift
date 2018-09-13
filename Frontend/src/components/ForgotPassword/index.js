import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './ForgotPassword.css';

class ForgotPassword extends Component {

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="ForgotPassword center-block">
        <PageHeader>Forgot Password</PageHeader>
      </div>
    );
  }
}

export default ForgotPassword;
