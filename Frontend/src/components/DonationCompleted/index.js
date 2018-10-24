import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './donationCompleted.css';


export default class DonationCompleted extends Component {

  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      donationID: params.get('donationID'),
      email: params.get('email'),
    };
  }

  render() {
    return (
      <div className="DonationCompleted text-center">
        <h1 className="text-uppercase text-primary">Thank you!</h1>
        <h4>Your donation was completed successfully. You will shortly recieve a confirmaton email from us.</h4>

        <br />
        <br />
        <h4>Click <a onClick={() => this.props.history.push('/')}>here to Print</a> a copy of your reciept or <a onClick={() => this.props.history.push('/')}>here to Email</a> it to {this.state.email}.</h4>
      
        <hr />
        <h3 className="text-warning">Share your contributions!</h3>
        <hr />
      </div>
    );
  }
}
