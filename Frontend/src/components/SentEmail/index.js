import React, { Component } from 'react';


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
      <div className="SentEmail center-block">
        <h1>Email sent to {this.state.email}!</h1>
        <h3>Please confirm your account by clicking the link in the email.</h3>
      </div>
    );
  }
}
