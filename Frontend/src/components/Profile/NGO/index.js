import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGOClear } from '../../../actions/updateNGO';
import { getNGO, getNGOClear } from '../../../actions/getNGO';
import NGOEditModal from './NGOEditModal';
import NGOEditNoticeModal from './NGOEditNoticeModal';


class NGOProfile extends Component {

  constructor(props) {
    super(props);

    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);
    this.onChangeNGOEditNoticeModalVisibility = this.onChangeNGOEditNoticeModalVisibility.bind(this);
    this.renderAlert = this.renderAlert.bind(this);

    this.state = {
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
    };
  }

  componentDidMount() {
    this.props.getNGO();
  }

  onChangeNGOEditModalVisibility(ngoEditModalVis) {
    this.setState({ngoEditModalVis});
  }

  onChangeNGOEditNoticeModalVisibility(ngoEditNoticeModalVis) {
    this.setState({ngoEditNoticeModalVis});
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

    if (this.props.get.pending) {
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
        <Button onClick={() => this.setState({ngoEditModalVis: true})}>Test Edit Modal</Button>
        <Button onClick={() => this.setState({ngoEditNoticeModalVis: true})}>Test Notice Modal</Button>
        <NGOEditModal
          location="test location"
          categories={[{ label:"Health", value: "5" }]}
          visibility={this.state.ngoEditModalVis}
          onChangeVisibility={this.onChangeNGOEditModalVisibility}
        />
        <NGOEditNoticeModal
          notice="test"
          visibility={this.state.ngoEditNoticeModalVis}
          onChangeVisibility={this.onChangeNGOEditNoticeModalVisibility}
        />
      </div>
    );
  }
}

function mapStateToProps({ updateNGO, getNGO }) {
  return {
    update: updateNGO,
    get: getNGO,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGOClear,
    getNGO,
    getNGOClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NGOProfile);
