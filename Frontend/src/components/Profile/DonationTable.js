import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
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
      return (
        <tr key={i}>
          <td>{donation.id}</td>
          <td>{donation.donorId}</td>
          <td>{donation.ngoId}</td>
          <td>${donation.amount}</td>
          <td>{donation.message}</td>
          <td>{donation.anonymous === true ? <FontAwesomeIcon icon="check" size="1x"/> : null}</td>
          <td>{typeStr}</td>
          <td>{donation.type === 1 ? donation.honoredUserId : null}</td>
          <td>{donation.type === 2 ? donation.honoredUserName : null}</td>
          <td><TimeAgo date={donation.created}/></td>
        </tr>
      )
    });

    return (
      <div className="DonationTable text-center profileDiv">
        <Card>
          <CardTitle>Donations</CardTitle>
          <CardBody>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Donor Id</th>
                  <th>NGO Id</th>
                  <th>Amount</th>
                  <th>Message</th>
                  <th>Anonymous</th>
                  <th>Type</th>
                  <th>Honored User Id</th>
                  <th>Honored User Name</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {donationRows}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}