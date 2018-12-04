import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader, Label, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { updateNGOClear } from '../../actions/updateNGO';
import { getNGO, getNGOClear } from '../../actions/getNGO';
import { getNGONotice, getNGONoticeClear } from '../../actions/getNGONotice';
import { getNGOTYTemplate, getNGOTYTemplateClear } from '../../actions/getNGOTYTemplate';
import { subscribe } from '../../actions/subscribe';
import { getNGODonations, getNGODonationsClear } from '../../actions/getNGODonations';
import { getUserId } from '../../utils';
import NGODonateModal from './NGODonateModal';
import NGOEditModal from './NGOEditModal';
import NGOEditNoticeModal from './NGOEditNoticeModal';
import NGOEditTYTemplateModal from './NGOEditTYTemplateModal';
import DonationTable from './DonationTable';
import { NGO_CATEGORIES } from '../../constants';
import { Card, CardSubtitle, CardBody, CardTitle, CardText } from 'reactstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DateRangeStats from './DateRangeStats';
import moment from 'moment';
import './Profile.css';


class Profile extends Component {

  constructor(props) {
    super(props);

    this.onDownloadDonations = this.onDownloadDonations.bind(this);
    this.onChangeNGODonateModalVisibility = this.onChangeNGODonateModalVisibility.bind(this);
    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);
    this.onChangeNGOEditNoticeModalVisibility = this.onChangeNGOEditNoticeModalVisibility.bind(this);
    this.onChangeNGOEditTYTemplateModalVisibility = this.onChangeNGOEditTYTemplateModalVisibility.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderDonations = this.renderDonations.bind(this);

    this.state = {
      ngoDonateModalVis: false,
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
      ngoEditTYTemplateModalVis: false,
      lineData: {},
      pieData: {},
    };
  }

  componentDidMount() {
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
    this.getLineData(); // temp
    this.getPieData(); // temp
    this.props.getNGODonations(this.props.match.params.id);
  }

  getMonths() {
    var mons = [];
    var month = moment();
    var i;
    for (i = 0; i <= 12; i++) {
      var duration = moment.duration({'months' : 1});
      mons.push( moment(month).format("MMM") );
      month = moment(month).subtract(duration);
    }
    return mons;
  }

  getLineData() {
    this.setState({
      lineData:{
        labels: this.getMonths(),
        datasets:[
          {
            label:'TestLegend',
            data:[1, 1000, 2000, 7000, 90, 500, 20, 759, 3000, 140, 11,300,1],
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
          }
        ]
      }
    });
  }

  getPieData() {
    this.setState({
      pieData:{
        labels: [ 'Female', 'Male', 'Non-Binary', ],
        datasets:[
          {
            data:[40, 55, 5],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      }
    });
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
      link.setAttribute('download', 'ngo-transactions.csv');
      document.body.appendChild(link);
      link.click();
    });
  }

  onChangeNGODonateModalVisibility(ngoDonateModalVis) {
    this.setState({ngoDonateModalVis});
  }

  onChangeNGOEditModalVisibility(ngoEditModalVis) {
    this.setState({ngoEditModalVis});
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
  }

  onChangeNGOEditNoticeModalVisibility(ngoEditNoticeModalVis) {
    this.setState({ngoEditNoticeModalVis});
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
  }

  onChangeNGOEditTYTemplateModalVisibility(ngoEditTYTemplateModalVis) {
    this.setState({ngoEditTYTemplateModalVis});
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
  }

  onSubscribe() {
    this.props.subscribe(this.state);
  }

  renderAlert() {
    if (this.props.update.success) {
      return (
        <Alert bsStyle="success" onDismiss={this.props.updateNGOClear}>
          <h4>Successfully updated profile!</h4>
        </Alert>
      );
    }

    if (this.props.update.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.updateNGOClear}>
          <h4>There was an error updating your profile</h4>
          <p>{this.props.update.error}</p>
        </Alert>
      );
    }
    if (this.props.get.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.getNGOClear}>
          <h4>There was an error fetching this NGO</h4>
          <p>{this.props.get.error}</p>
        </Alert>
      );
    }
  }

  renderButtons() {

    const id = getUserId();

    if (id === this.props.match.params.id) {
      return (
        <div>
          <ButtonGroup>
            <Button bsStyle="info" onClick={() => this.setState({ngoEditModalVis: true})}>Edit Profile</Button>
            <Button bsStyle="info" onClick={() => this.setState({ngoEditNoticeModalVis: true})}>Edit Notice</Button>
            <Button bsStyle="info" onClick={() => this.setState({ngoEditTYTemplateModalVis: true})}>Edit Thank-you Email Template</Button>
          </ButtonGroup>
        </div>
      );
    } else {
      return (
        <div>
          <ButtonGroup>
            <Button bsStyle="info" onClick={() => this.setState({ngoDonateModalVis: true})}>Donate</Button>
            <Button bsStyle="success" onClick={ this.onSubscribe() }>Subscribe</Button>
          </ButtonGroup>
        </div>
      );
    }
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

    // if (this.props.get.pending || this.props.getNotice.pending) {
    //   return (
    //     <div className="NGOProfile text-center">
    //       <FontAwesomeIcon icon="spinner" size="6x" spin/>
    //     </div>
    //   );
    // }

    return (
      <div className="NGOProfile center-block text-center">
        {this.renderAlert()}
        <PageHeader className="text-center text-primary">{this.props.get.success.username}</PageHeader>

        {this.renderButtons()}

        <div className="text-center profileDiv">
        <Card className="profile">
          <CardBody>
            <CardTitle style={{fontSize:'20px'}}>PROFILE</CardTitle>
            <CardSubtitle className="mb-2 text-muted">Non-Profit Organization</CardSubtitle>
            <hr />
            <CardText className="profileText"> <Label bsStyle="default" className="label">Email</Label>{' '}
              {this.props.get.success.email} </CardText>
            <hr />
            <CardText className="profileText"> <Label bsStyle="default" className="label">Location</Label>{' '}
              {this.props.get.success.location || 'No location listed'} </CardText>
            <hr />
            <CardText className="profileText"> <Label bsStyle="default" className="label">Category</Label>{' '}
              {NGO_CATEGORIES[this.props.get.success.category]} </CardText>
            <hr />
            <CardText className="profileText"> <Label bsStyle="default" className="label">Description</Label>{' '}
              {this.props.get.success.description || 'No description listed'} </CardText>
          </CardBody>
        </Card>
        </div>

        <div className="text-center profileDiv">
        <Card className="profile">
          <CardBody>
            <CardTitle style={{fontSize:'20px'}}>NOTICE</CardTitle>
            <hr />
            <CardText className="text-warning">{this.props.getNotice.success.notice || 'No notice listed'}</CardText>
          </CardBody>
        </Card>
        </div>

        <div className="text-center profileDiv">
          <Card className="profile">
            <CardBody>
              <CardTitle style={{fontSize:'20px'}}>STATS</CardTitle>
              <hr />
             
              <LineChart data={this.state.lineData}></LineChart>
              <br /> <hr /> <br />

              <h4>Pick a Date Range to get donations statistics for <span style={{color:'blue',}}>{this.props.get.success.username}</span></h4>
              <DateRangeStats> </DateRangeStats>
              <hr /> 
              <h4>Distribution by gender of donors who donated to <span style={{color:'blue',}}>{this.props.get.success.username}</span> </h4>
              <PieChart data={this.state.pieData}></PieChart>
            </CardBody>
          </Card>
        </div>

        <div style={{ width: '50%', margin: '0 auto' }} className="text-center">
          {this.renderDonations()}
        </div>


        <NGODonateModal
          visibility={this.state.ngoDonateModalVis}
          ngoId={this.props.match.params.id}
          minLimit={this.props.get.success.minlimit}
        />

        <NGOEditModal
          location={this.props.get.success.location}
          category={this.props.get.success.category}
          description={this.props.get.success.description}
          minLimit={this.props.get.success.minlimit}
          maxLimit={this.props.get.success.maxlimit}
          calendarLink={this.props.get.success.callink}
          visibility={this.state.ngoEditModalVis}
          onChangeVisibility={this.onChangeNGOEditModalVisibility}
        />

        <NGOEditNoticeModal
          notice={this.props.getNotice.success.notice}
          visibility={this.state.ngoEditNoticeModalVis}
          onChangeVisibility={this.onChangeNGOEditNoticeModalVisibility}
        />

        <NGOEditTYTemplateModal
          //tytemplate={this.props.getTYTemplate.success.tytemplate}
          visibility={this.state.ngoEditTYTemplateModalVis}
          onChangeVisibility={this.onChangeNGOEditTYTemplateModalVisibility}
        />
      </div>
    );
  }
}

function mapStateToProps({ updateNGO, getNGO, getNGONotice, getNGODonations }) {
  return {
    update: updateNGO,
    get: getNGO,
    getNotice: getNGONotice,
    getDonations: getNGODonations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGOClear,
    getNGO,
    getNGOClear,
    getNGONotice,
    getNGONoticeClear,
    subscribe,
    getNGODonations,
    getNGODonationsClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
