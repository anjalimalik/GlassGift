import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';


class NGOEdit extends Component {
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
            <Button bsStyle="primary" onClick={() => this.props.onChangeVisibility(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

NGOEdit.propTypes = {
  visibility: PropTypes.boolean,
  onChangeVisibility: PropTypes.func,
};

export default NGOEdit;
