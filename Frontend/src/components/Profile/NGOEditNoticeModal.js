import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { updateNGO, updateNGOClear } from '../../actions/updateNGO';


class NGOEditNoticeModal extends Component {

  constructor(props) {
    super(props);

    this.onSaveChanges = this.onSaveChanges.bind(this);

    this.state = {};
  }

  onSaveChanges() {
    this.props.updateNGO(this.state).then(() => {
      this.props.onChangeVisibility(false)
    });
  }

  render() {
    return (
      <div className="ngoedit-modal">
        <Modal
          show={this.props.visibility}
          onHide={() => this.props.onChangeVisibility(false)}
          >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>Modal Body</Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.props.onChangeVisibility(false)}>Close</Button>
            <Button bsStyle="primary" onClick={this.onSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

NGOEditNoticeModal.propTypes = {
  visibility: PropTypes.bool,
  onChangeVisibility: PropTypes.func,
};

function mapStateToProps({ updateNGO }) {
  return {
    pending: updateNGO.pending,
    success: updateNGO.success,
    error: updateNGO.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGO,
    updateNGOClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NGOEditNoticeModal);
