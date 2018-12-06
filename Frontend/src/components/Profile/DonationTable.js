import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeAgo from 'react-timeago';
import './Profile.css';

export default class DonationTable extends Component {

  render() {
    const donationRows = this.props.donations.map((donation, i) => {
      let typeStr;
      switch (donation.type) {
        default:
        case 0:
          typeStr = 'On own behalf';
          break;
        case 1:
          typeStr = 'In honor of';
          break;
        case 2:
          typeStr = 'In memory of';
          break;
      }
      const amnt = Number.parseInt(donation.amount, 10) / 100;
      return (
        <tr key={i}>
          <td>{donation.id}</td>
          <td>{donation.anonymous === false ? donation.donorid : 'N/A'}</td>
          <td>${`${amnt}.00`}</td>
          <td>{donation.anonymous === true ? <FontAwesomeIcon icon="check" size="1x"/> : null}</td>
          <td>{typeStr}</td>
          <td><TimeAgo date={donation.created}/></td>
        </tr>
      )
    });

    return (
      <div className="DonationTable text-center profileDiv">
        <Card className="profile">
          <CardTitle style={{fontSize:'20px'}}>DONATIONS</CardTitle>
          <CardBody style={{marginBottom: '50px'}}>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Donor Id</th>
                  <th>Amount</th>
                  <th>Anonymous</th>
                  <th>Type</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {donationRows}
              </tbody>
            </Table>
            <div style={{ float: 'right' }}><Button bsStyle="link" onClick={this.props.onDownloadDonations}><FontAwesomeIcon icon="download" size="1x"/> Download donations</Button></div>
          </CardBody>
        </Card>
      </div>
    )
  }
}