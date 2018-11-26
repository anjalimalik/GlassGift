import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader, Label, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGOClear } from '../../actions/updateNGO';
import { getNGO, getNGOClear } from '../../actions/getNGO';
import { getNGONotice, getNGONoticeClear } from '../../actions/getNGONotice';
import { getNGOTYTemplate, getNGOTYTemplateClear } from '../../actions/getNGOTYTemplate';
import { subscribe } from '../../actions/subscribe';
import { getUserId } from '../../utils';
import NGODonateModal from './NGODonateModal';
import NGOEditModal from './NGOEditModal';
import NGOEditNoticeModal from './NGOEditNoticeModal';
import NGOEditTYTemplateModal from './NGOEditTYTemplateModal';
import { NGO_CATEGORIES } from '../../constants';
import { Card, CardSubtitle, CardBody, CardTitle, CardText } from 'reactstrap';
import LineChart from './LineChart';
import PieChart from './PieChart';
import './Profile.css';


class Profile extends Component {

  constructor(props) {
    super(props);

    this.onChangeNGODonateModalVisibility = this.onChangeNGODonateModalVisibility.bind(this);
    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);
    this.onChangeNGOEditNoticeModalVisibility = this.onChangeNGOEditNoticeModalVisibility.bind(this);
    this.onChangeNGOEditTYTemplateModalVisibility = this.onChangeNGOEditTYTemplateModalVisibility.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.renderButtons = this.renderButtons.bind(this);

    this.state = {
      ngoDonateModalVis: false,
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
      ngoEditTYTemplateModalVis: false,
      lineData: {},
    };
  }

  componentDidMount() {
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
    this.getData(); // temp
  }

  getData() {
    this.setState({
      lineData:{
        labels: ['Col1', 'Col2', 'Col3', 'Col4', 'Col5', 'Col6'],
        datasets:[
          {
            label:'TestLegend',
            data:[
              1,
              100000,
              2000,
              7000,
              90,
              500,
            ],
            backgroundColor:[]
          }
        ]
      }
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

  render() {

    if (this.props.get.pending || this.props.getNotice.pending) {
      return (
        <div className="NGOProfile text-center">
          <FontAwesomeIcon icon="spinner" size="6x" spin/>
        </div>
      );
    }

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
            <CardTitle style={{fontSize:'16px'}}>NOTICE</CardTitle>
            <hr />
            <CardText className="text-warning">{this.props.getNotice.success.notice || 'No notice listed'}</CardText>
          </CardBody>
        </Card>
        </div>

        <div className="text-center profileDiv">
          <Card className="profile">
            <CardBody>
              <CardTitle style={{fontSize:'16px'}}>STATS</CardTitle>
              <hr />
             
                <LineChart data={this.state.lineData}>LALA</LineChart>
            </CardBody>
          </Card>
        </div>

        <NGODonateModal
          visibility={this.state.ngoDonateModalVis}
          onChangeVisibility={this.onChangeNGODonateModalVisibility}
          ngoId={this.props.match.params.id}
          minLimit={this.props.get.success.minlimit}
          maxLimit={this.props.get.success.maxlimit}
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

function mapStateToProps({ updateNGO, getNGO, getNGONotice }) {
  return {
    update: updateNGO,
    get: getNGO,
    getNotice: getNGONotice
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
