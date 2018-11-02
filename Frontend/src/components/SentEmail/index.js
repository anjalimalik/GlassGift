import React, { Component } from 'react';
import "../Login/Login.css";


export default class SentEmail extends Component {

  constructor(props) {
    super(props);

    // Get token from query params
    const params = new URLSearchParams(props.location.search);

    this.state = {
      email: params.get('email'),
    };
  }

  render() {
    return (
      <div className="SentEmail center-block text-center">
        <h1>Email sent to <text className="text-red">{this.state.email}</text>!</h1>
        <small className="text-muted">
        <h3>Please confirm your account by clicking the link in the email.</h3>
        </small>
      </div>
    );
  }
}
