import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGO, updateNGOClear } from '../../actions/updateNGO';


class NGOEditNoticeModal extends Component {

  constructor(props) {
    super(props);

    this.onSaveChanges = this.onSaveChanges.bind(this);

    this.state = {
      notice: '',
    };
  }

  onSaveChanges() {
    this.props.updateNGO(this.state).then(() => {
      this.props.onChangeVisibility(false)
    });
  }

  render() {
    return (
      <div className="NGOEditNoticeModal">
        <Modal
          show={this.props.visibility}
          onHide={() => this.props.onChangeVisibility(false)}
          >
          <Modal.Header closeButton>
            <Modal.Title>Edit Notice</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup>
              <ControlLabel>New Notice</ControlLabel>
              <FormControl
                autoFocus
                placeholder={this.props.notice}
                value={this.state.notice}
                onChange={e => this.setState({ notice: e.target.value }) }
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.props.onChangeVisibility(false)}>Close</Button>
            <Button
              bsStyle="primary"
              disabled={this.props.pending}
              onClick={this.onSaveChanges}
            >
              Save Changes
              { this.props.pending ? <span className="loginButtonSpinner">
                <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
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
