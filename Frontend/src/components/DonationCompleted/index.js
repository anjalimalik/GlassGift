import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './donationCompleted.css';
import {
  FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon, EmailIcon,
} from 'react-share';
import ReactToPrint from 'react-to-print';
import { donationEmail } from '../../actions/donationEmail';

class ReceiptToPrint extends React.Component {
  render() {
    return (
      <div>
        <h3>Donation Receipt</h3>
        <p>Amount: ${this.props.amount}</p>
        <p>NGO Name: {this.props.ngoName}</p>
        <p>Date: {this.props.date.toLocaleString()}</p>
      </div>
    );
  }
}

class DonationCompleted extends Component {

  constructor(props) {
    super(props);

    const p = props.location.state;

    this.state = {
      donationID: p.metadata.donation_id,
      email: p.donorEmail,
      ngoId: p.ngoId,
      ngoName: p.ngoName,
      amount: p.amount / 100,
      created: new Date(p.created * 1000)
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

        <h4>Click <ReactToPrint trigger={() => <a>here to Print</a>} content={() => this.componentRef}/> a copy of your reciept or <a onClick={() => this.props.donationEmail({ id: this.state.donationID })}>here to Email</a> it to {this.state.email}.</h4>

        <div style={{display:'none'}}>
          <ReceiptToPrint ref={el => (this.componentRef = el)}
            amount={this.state.amount}
            ngoName={this.state.ngoName}
            date={this.state.created}
          />
        </div>

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

function mapStateToProps({ donationEmail }) {
  return {
    pending: donationEmail.pending,
    success: donationEmail.success,
    error: donationEmail.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    donationEmail,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationCompleted);
