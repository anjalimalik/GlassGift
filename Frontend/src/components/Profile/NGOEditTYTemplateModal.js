import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGOTYTemplate, updateNGOTYTemplateClear } from '../../actions/updateNGOTYTemplate';


class NGOEditTYTemplateModal extends Component {

  constructor(props) {
    super(props);

    this.onSaveChanges = this.onSaveChanges.bind(this);

    this.state = {
      emailtemplate: '',
    };
  }

  onSaveChanges() {
    this.props.updateNGOTYTemplate(this.state.emailtemplate, this.props.ngoId).then(() => {
      this.props.onChangeVisibility(false)
    });
  }

  render() {
    return (
      <div className="NGOEditTYTemplateModal">
        <Modal
          show={this.props.visibility}
          onHide={() => this.props.onChangeVisibility(false)}
          >
          <Modal.Header closeButton>
            <Modal.Title>Edit Thank-you Email Template</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup>
              <ControlLabel>New Email</ControlLabel>
              <FormControl
                autoFocus
                componentClass="textarea"
                rows={20}
                placeholder={this.props.emailtemplate}
                value={this.state.emailtemplate}
                onChange={e => this.setState({ emailtemplate: e.target.value }) }
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

NGOEditTYTemplateModal.propTypes = {
  visibility: PropTypes.bool,
  onChangeVisibility: PropTypes.func,
};

function mapStateToProps({ updateNGOTYTemplate }) {
  return {
    pending: updateNGOTYTemplate.pending,
    success: updateNGOTYTemplate.success,
    error: updateNGOTYTemplate.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGOTYTemplate,
    updateNGOTYTemplateClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NGOEditTYTemplateModal);
