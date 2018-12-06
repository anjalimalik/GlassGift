import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader, Label, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import { updateNGOClear } from '../../actions/updateNGO';
import { getNGO, getNGOClear } from '../../actions/getNGO';
import { getNGONotice, getNGONoticeClear } from '../../actions/getNGONotice';
import { getNGONewsletter, getNGONewsletterClear } from '../../actions/getNGONewsletter';
import { getNGOTYTemplate, getNGOTYTemplateClear } from '../../actions/getNGOTYTemplate';
import { subscribe } from '../../actions/subscribe';
import { getLineData } from '../../actions/getLineData';
import { getPieData } from '../../actions/getPieData';
import { getNGODonations, getNGODonationsClear } from '../../actions/getNGODonations';
import { getUserId } from '../../utils';
import NGODonateModal from './NGODonateModal';
import NGOEditModal from './NGOEditModal';
import NGONewsletterModal from './NGONewsletterModal';
import NGOEditNoticeModal from './NGOEditNoticeModal';
import NGOEditTYTemplateModal from './NGOEditTYTemplateModal';
import DonationTable from './DonationTable';
import { NGO_CATEGORIES } from '../../constants';
import { Card, CardSubtitle, CardBody, CardTitle, CardText } from 'reactstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DateRangeStats from './DateRangeStats';
import { getUserToken } from '../../utils';
import './Profile.css';


class Profile extends Component {

  constructor(props) {
    super(props);

    this.onDownloadDonations = this.onDownloadDonations.bind(this);
    this.onChangeNGODonateModalVisibility = this.onChangeNGODonateModalVisibility.bind(this);
    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);
    this.onChangeNGOEditNoticeModalVisibility = this.onChangeNGOEditNoticeModalVisibility.bind(this);
    this.onChangeNGONewsletterModalVisibility = this.onChangeNGONewsletterModalVisibility.bind(this);
    this.onChangeNGOEditTYTemplateModalVisibility = this.onChangeNGOEditTYTemplateModalVisibility.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderDonations = this.renderDonations.bind(this);
    this.renderLineChart = this.renderLineChart.bind(this);
    this.renderPieChart = this.renderPieChart.bind(this)

    this.state = {
      ngoDonateModalVis: false,
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
      ngoNewsletterModalVis: false,
      ngoEditTYTemplateModalVis: false,
      ngoId: null
    };
  }

  componentDidMount() {
    this.props.getNGO(this.props.match.params.id);
    this.setState({ngoId: this.props.match.params.id});
    console.log(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
    this.props.getNGONewsletter(this.props.match.params.id);
    this.props.getNGOTYTemplate(this.props.match.params.id);
    this.props.getNGODonations(this.props.match.params.id);
    this.props.getLineData(this.props.match.params.id);
    this.props.getPieData(this.props.match.params.id);
  }

  getMonths() {
    var mons = [];
    var month = moment();
    var i;
    for (i = 0; i < 12; i++) {
      var duration = moment.duration({'months' : 1});
      mons.push( moment(month).format("MMM") );
      month = moment(month).subtract(duration);
    }
    return mons.reverse();
  }

  onDownloadDonations() {
    const token = getUserToken();
    axios({
      url: 'http://0.0.0.0:1338/',
      method: 'GET',
      responseType: 'blob', // important
      headers: { Authorization: token }
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

  onChangeNGONewsletterModalVisibility(ngoNewsletterModalVis) {
    this.setState({ngoNewsletterModalVis});
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
  }

  onChangeNGOEditTYTemplateModalVisibility(ngoEditTYTemplateModalVis) {
    this.setState({ngoEditTYTemplateModalVis});
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
  }

  onSubscribe(id) {
    this.props.subscribe(id, this.props.match.params.id);
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
            <Button bsStyle="info" onClick={() => this.setState({ngoNewsletterModalVis: true})}>Create Newsletter</Button>          
          </ButtonGroup>
        </div>
      );
    } else {
      return (
        <div>
          <ButtonGroup>
            <Button bsStyle="info" onClick={() => this.setState({ngoDonateModalVis: true})}>Donate</Button>
            <Button bsStyle="success" onClick={() => this.onSubscribe(id) }>Subscribe</Button>
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
        <DonationTable donations={this.props.getDonations.success || []} onDownloadDonations={this.onDownloadDonations}/>
      </div>
    );
  }

  renderLineChart() {
    if (this.props.getMonthlyData.pending) {
      return (
        <FontAwesomeIcon icon="spinner" size="6x" spin />
      );
    }
    else if (this.props.getMonthlyData.error) {
      return (
        <Alert bsStyle="danger">
          <p>
            {this.props.getMonthlyData.error}
          </p>
        </Alert>
      );
    }

    return (
      <LineChart title=""
      data={{
        labels:this.getMonths(),
        datasets:[{
          label:"Total amount of money donated",
          data: this.props.getMonthlyData.success,
          backgroundColor:"#A9C3FE",
          borderColor:"#5d8efd",
          borderWidth:1,
          hoverBackgroundColor:"#5d8efd",
          hoverBorderColor:"#baa9fe"
        }]
      }}
      >
      </LineChart>
    );
  }

  renderPieChart() {
    if (this.props.getGenderData.pending) {
      return (
        <FontAwesomeIcon icon="spinner" size="6x" spin />
      );
    }
    else if (this.props.getGenderData.error) {
      return (
          <Alert bsStyle="danger">
            <p>
              {this.props.getGenderData.error}
            </p>
          </Alert>
      );
    }

    return (
      <PieChart data={{
        labels: [ 'Female', 'Male', 'Other', ],
        datasets:[{
            data:[this.props.getGenderData.success.female,
                   this.props.getGenderData.success.male, 
                   this.props.getGenderData.success.nb], 
            backgroundColor: ['#f3a8b3', '#77a0fd', '#dbf5a1'],
            hoverBackgroundColor: ['#f3a8b3', '#77a0fd', '#dbf5a1']
        }]
      }}>
      </PieChart>
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
            <CardTitle className="headingCard">PROFILE</CardTitle>
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
            <CardTitle className="headingCard">NOTICE</CardTitle>
            <hr />
            <CardText className="text-warning">{this.props.getNotice.success.notice || 'No notice listed'}</CardText>
          </CardBody>
        </Card>
        </div>

        <div className="text-center profileDiv">
          <Card className="profile">
            <CardBody>
              <CardTitle className="headingCard">STATS</CardTitle>
              <hr />
              {this.renderLineChart()}
              <br /> <hr /> <br />

              <h4>Pick a Date Range to get donations statistics for <span style={{color:'blue',}}>{this.props.get.success.username}</span></h4>
              <DateRangeStats ngoId={this.props.match.params.id}> </DateRangeStats>
              <hr /> 
              <h4>Distribution by gender of donors who donated to <span style={{color:'blue',}}>{this.props.get.success.username}</span> </h4>
              {this.renderPieChart()}
              <br />

            </CardBody>
          </Card>
        </div>

        {this.renderDonations()}

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

        <NGONewsletterModal
          newsletter={this.props.getNewsletter.success.newsletter}
          ngoId={this.props.match.params.id}
          visibility={this.state.ngoNewsletterModalVis}
          onChangeVisibility={this.onChangeNGONewsletterModalVisibility}
        />

        <NGOEditTYTemplateModal
          emailtemplate={this.props.getTYTemplate.success}
          ngoId={this.props.match.params.id}
          visibility={this.state.ngoEditTYTemplateModalVis}
          onChangeVisibility={this.onChangeNGOEditTYTemplateModalVisibility}
        />
      </div>
    );
  }
}

function mapStateToProps({ updateNGO, getNGO, getNGONotice, getNGONewsletter, getNGODonations, getLineData, getPieData, getNGOTYTemplate, }) {
  return {
    update: updateNGO,
    get: getNGO,
    getNotice: getNGONotice,
    getNewsletter: getNGONewsletter,
    getDonations: getNGODonations,
    getMonthlyData: getLineData,
    getGenderData: getPieData,
    getTYTemplate: getNGOTYTemplate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGOClear,
    getNGO,
    getNGOClear,
    getNGONotice,
    getNGONoticeClear,
    getNGONewsletter,
    getNGONewsletterClear,
    getLineData,
    getPieData,
    subscribe,
    getNGODonations,
    getNGODonationsClear,
    getNGOTYTemplate,
    getNGOTYTemplateClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
