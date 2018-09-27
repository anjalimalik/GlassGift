import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, PageHeader } from 'react-bootstrap';
import { updateNGOClear } from '../../actions/updateNGO';
import NGOEditModal from './NGOEditModal';
import NGOEditNoticeModal from './NGOEditNoticeModal';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.onChangeNGOEditModalVisibility = this.onChangeNGOEditModalVisibility.bind(this);
    this.onChangeNGOEditNoticeModalVisibility = this.onChangeNGOEditNoticeModalVisibility.bind(this);
    this.renderNGOUpdateAlert = this.renderNGOUpdateAlert.bind(this);

    this.state = {
      ngoEditModalVis: false,
      ngoEditNoticeModalVis: false,
    };
  }

  onChangeNGOEditModalVisibility(ngoEditModalVis) {
    this.setState({ngoEditModalVis});
  }

  onChangeNGOEditNoticeModalVisibility(ngoEditNoticeModalVis) {
    this.setState({ngoEditNoticeModalVis});
  }

  renderNGOUpdateAlert() {
    if (this.props.success) {
      return (
        <Alert bsStyle="success" onDismiss={this.props.updateNGOClear}>
          <h4>Successfully updated profile!</h4>
        </Alert>
      );
    }

    if (this.props.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.updateNGOClear}>
          <h4>There was an error updating your profile</h4>
          <p>{this.props.error}</p>
        </Alert>
      );
    }
  }

  render() {
    return (
      <div className="Profile">
        {this.renderNGOUpdateAlert()}
        <PageHeader>Profile</PageHeader>
        <Button onClick={() => this.setState({ngoEditModalVis: true})}>Test Edit Modal</Button>
        <Button onClick={() => this.setState({ngoEditNoticeModalVis: true})}>Test Notice Modal</Button>
        <NGOEditModal
          visibility={this.state.ngoEditModalVis}
          onChangeVisibility={this.onChangeNGOEditModalVisibility}
        />
        <NGOEditNoticeModal
          visibility={this.state.ngoEditNoticeModalVis}
          onChangeVisibility={this.onChangeNGOEditNoticeModalVisibility}
        />
      </div>
    );
  }
}

function mapStateToProps({ updateNGO }) {
  return {
    pending: updateNGO.pending,
    success: updateNGO.success,
    error: updateNGO.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGOClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
