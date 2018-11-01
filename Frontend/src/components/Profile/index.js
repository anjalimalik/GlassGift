import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGOClear } from '../../actions/updateNGO';
import { getNGO, getNGOClear } from '../../actions/getNGO';
import { getNGONotice, getNGONoticeClear } from '../../actions/getNGONotice';
import { getUserId } from '../../utils';
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
    this.renderButtons = this.renderButtons.bind(this);

    this.state = {
      ngoDonateModalVis: false,
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
    };
  }

  componentDidMount() {
    this.props.getNGO(this.props.match.params.id);
    this.props.getNGONotice(this.props.match.params.id);
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
          <Button onClick={() => this.setState({ngoEditModalVis: true})}>Edit Profile</Button>
          <Button onClick={() => this.setState({ngoEditNoticeModalVis: true})}>Edit Notice</Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={() => this.setState({ngoDonateModalVis: true})}>Donate</Button>
        </div>
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
        <PageHeader>{this.props.get.success.username}</PageHeader>

        {this.renderButtons()}

        <h2>Information</h2>
        <h4>Email: {this.props.get.success.email}</h4>

        <h4>Location: {this.props.get.success.location || 'No location listed'}</h4>

        <h4>Category: {NGO_CATEGORIES[this.props.get.success.category]}</h4>

        <h4>Description: {this.props.get.success.description || 'No description listed'}</h4>

        <h2>Notice: {this.props.getNotice.success.notice || 'No notice listed'}</h2>


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
