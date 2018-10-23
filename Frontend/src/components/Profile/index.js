import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGOClear } from '../../actions/updateNGO';
import { getNGO, getNGOClear } from '../../actions/getNGO';
import { getNGONotice, getNGONoticeClear } from '../../actions/getNGONotice';
import { getUserId } from '../../actions/utils';
import NGODonateModal from './NGODonateModal';
import NGOEditModal from './NGOEditModal';
import NGOEditNoticeModal from './NGOEditNoticeModal';
import { NGO_CATEGORIES } from '../../constants';


class Profile extends Component {

  constructor(props) {
    super(props);

    this.onChangeNGODonateModalVisibility = this.onChangeNGODonateModalVisibility.bind(this);
    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);
    this.onChangeNGOEditNoticeModalVisibility = this.onChangeNGOEditNoticeModalVisibility.bind(this);
    this.renderAlert = this.renderAlert.bind(this);

    this.state = {
      ngoDonateModalVis: false,
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
    };
  }

  componentDidMount() {
    this.props.getNGO(getUserId());
    this.props.getNGONotice(getUserId());
  }

  onChangeNGODonateModalVisibility(ngoDonateModalVis) {
    this.setState({ngoDonateModalVis});
  }

  onChangeNGOEditModalVisibility(ngoEditModalVis) {
    this.setState({ngoEditModalVis});
    this.props.getNGO(getUserId());
    this.props.getNGONotice(getUserId());
  }

  onChangeNGOEditNoticeModalVisibility(ngoEditNoticeModalVis) {
    this.setState({ngoEditNoticeModalVis});
    this.props.getNGO(getUserId());
    this.props.getNGONotice(getUserId());
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

  render() {

    if (this.props.get.pending || this.props.getNotice.pending) {
      return (
        <div className="NGOProfile">
          <FontAwesomeIcon icon="spinner" size="6x" spin/>
        </div>
      );
    }

    return (
      <div className="NGOProfile">
        {this.renderAlert()}
        <PageHeader>Profile</PageHeader>

        <Button onClick={() => this.setState({ngoDonateModalVis: true})}>Donate</Button>

        <br />

        <Button onClick={() => this.setState({ngoEditModalVis: true})}>Edit Profile</Button>
        <Button onClick={() => this.setState({ngoEditNoticeModalVis: true})}>Edit Notice</Button>

        <h2>Information</h2>
        <h4>Name:</h4>
        {this.props.get.success.name}
        <h4>Email:</h4>
        {this.props.get.success.email}
        <h4>Location</h4>
        {this.props.get.success.location || 'No location listed'}
        <h4>Category</h4>
        {NGO_CATEGORIES[this.props.get.success.category]}
        <h4>Description</h4>
        {this.props.get.success.description || 'No description listed'}
        <h2>Notice</h2>
        {this.props.getNotice.success.notice}

        <NGODonateModal
          visibility={this.state.ngoDonateModalVis}
          onChangeVisibility={this.onChangeNGODonateModalVisibility}
          ngoId={this.props.match.params.id}
        />

        <NGOEditModal
          location={this.props.get.success.location}
          category={this.props.get.success.category}
          description={this.props.get.success.description}
          calendarLink={this.props.get.success.callink}
          visibility={this.state.ngoEditModalVis}
          onChangeVisibility={this.onChangeNGOEditModalVisibility}
        />
        <NGOEditNoticeModal
          notice={this.props.getNotice.success.notice}
          visibility={this.state.ngoEditNoticeModalVis}
          onChangeVisibility={this.onChangeNGOEditNoticeModalVisibility}
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
