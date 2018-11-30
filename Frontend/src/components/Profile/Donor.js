import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardTitle, CardBody, PageHeader, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Profile.css';


class DonorProfile extends Component {

  constructor(props) {
    super(props);

    this.renderDonations = this.renderDonations.bind(this);
  }

  renderDonations() {
    // TODO if no donations

    const donationRows = [
      (<tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>)
    ];

    return (
      <Card>
        <CardTitle>Donations</CardTitle>
        <CardBody>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {donationRows}          
            </tbody>
          </Table>
        </CardBody>
      </Card>
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

          <div style={{ float: 'right' }}><Button bsStyle="link"><FontAwesomeIcon icon="download" size="1x"/> Download donations</Button></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorProfile);
