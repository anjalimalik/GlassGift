import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import DonationTable from './DonationTable';
import { getDonorDonations, getDonorDonationsClear } from '../../actions/getDonorDonations';
import './Profile.css';


class DonorProfile extends Component {

  constructor(props) {
    super(props);

    this.onDownloadDonations = this.onDownloadDonations.bind(this);
    this.renderDonations = this.renderDonations.bind(this);
  }

  componentDidMount() {
    this.props.getDonorDonations();
  }

  onDownloadDonations() {
    axios({
      url: 'http://0.0.0.0:1338/',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'donor-transactions.csv');
      document.body.appendChild(link);
      link.click();
    });
  }

  renderDonations() {
    if (this.props.getDonations.pending) {
      return (
        <FontAwesomeIcon icon="spinner" size="6x" spin />
      );
    }

    if (this.props.getDonations.error) {
      return (
        <Alert bsStyle="danger">
          <p>
            {this.props.getDonations.error}
          </p>
        </Alert>
      );
    }

    return (
      <div>
        <DonationTable donations={this.props.getDonations.success || []}/>
        <div style={{ float: 'right' }}><Button bsStyle="link" onClick={this.onDownloadDonations}><FontAwesomeIcon icon="download" size="1x"/> Download donations</Button></div>
      </div>
    );
  }

  render() {
    // TODO show donations
    // TODO export donations
    return (
      <div className="DonorProfile center-block text-center">
        <PageHeader className="text-center text-primary">Profile</PageHeader>

        <div style={{ width: '50%', margin: '0 auto' }} className="text-center">
          {this.renderDonations()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ getDonorDonations }) {
  return {
    getDonations: getDonorDonations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getDonorDonations,
    getDonorDonationsClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorProfile);
