import React, { Component } from 'react';
//import { Button } from 'react-bootstrap';
import './donationCompleted.css';
import {
  FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon, EmailIcon,
} from 'react-share';
import ReactToPrint from "react-to-print";

class ReceiptToPrint extends React.Component {
  render() {
    return (
      <div>
         <h3>Donation Receipt </h3>
         <p>Amount: </p>
         <p>Ngo Name: </p>
         <p>Date/Time: </p>
      </div>
    );
  }
}

export default class DonationCompleted extends Component {

  constructor(props) {
    super(props);

    this.state = {
      detail: this.props.location.state.detail,
    };
  }

  render() {
    const shareUrl = 'http://github.com/anjalimalik/Glassgift';
    const post = 'I donated on GlassGift!'; // get more details using donation id?

    return (
      <div className="DonationCompleted text-center">
        <h1 className="text-uppercase text-primary">Thank you!</h1>
        <h4>Your donation was completed successfully. You will shortly recieve a confirmaton email from us.</h4>

        <br />
        <br />

        <h4>Click  
          <ReactToPrint trigger={() => <a href="#"> here to Print</a>}
          content={() => this.componentRef}
          /> a copy of your reciept or <a onClick={() => this.props.history.push('/')}>here to Email</a> it to {this.state.email}.</h4>
          
        <div style={{display:'none'}}><ReceiptToPrint ref={el => (this.componentRef = el)} /> </div>

        <hr />
        <h3 className="text-warning">Share your contributions!</h3>
        <div className="container">
          <div className="network">
            <FacebookShareButton
              url={shareUrl}
              quote={post}
              className="network_share-button">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>

            <LinkedinShareButton
              url={shareUrl}
              quote={post}
              className="network_share-button">
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>

            <TwitterShareButton
              url={shareUrl}
              quote={post}
              className="network_share-button">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>

            <EmailShareButton
              url={shareUrl}
              quote={post}
              className="network_share-button">
              <EmailIcon
                size={32}
                round />
            </EmailShareButton>

          </div>
        </div>

        <hr />
      </div>
    );
  }
}
