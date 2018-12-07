import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NGO_CATEGORIES } from '../../constants';
import { updateNGO, updateNGOClear } from '../../actions/updateNGO';


const selectNGOOptions = Object.keys(NGO_CATEGORIES).map(key => {
  return {
    value: key,
    label: NGO_CATEGORIES[key],
  };
});

class NGOEditModal extends Component {

  constructor(props) {
    super(props);

    this.onSaveChanges = this.onSaveChanges.bind(this);

    this.state = {
      location: this.props.location || '',
      category: { value: `${this.props.category}`, label: NGO_CATEGORIES[this.props.category] },
      description: this.props.description || '',
      minLimit: this.props.minLimit || '',
      maxLimit: this.props.maxLimit || '',
      calLink: this.props.calendarLink || '',
    };
  }

  onSaveChanges() {
    this.props.updateNGO(this.state).then(() => {
      this.props.onChangeVisibility(false)
    });
  }

  render() {
    return (
      <div className="NGOEditModal">
        <Modal
          show={this.props.visibility}
          onHide={() => this.props.onChangeVisibility(false)}
          >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup bsSize="large">
              <ControlLabel>Location</ControlLabel>
              <FormControl
                type="text"
                placeholder={this.props.location}
                value={this.state.location}
                onChange={e => this.setState({ location: e.target.value })}
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Categories</ControlLabel>
              <Select value={this.state.category}
                options={selectNGOOptions} onChange={category => this.setState({ category })}
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                componentClass="textarea"
                placeholder="(Optional)"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value }) }
                />
            </FormGroup>

            <ControlLabel>Donation Limits (optional)</ControlLabel>
            <FormGroup bsSize="large">
              <ControlLabel>Min:</ControlLabel>
              <FormControl
                type="text"
                placeholder="$"
                value={this.state.minLimit}
                onChange={e => this.setState({ minLimit: e.target.value }) }
              />
              <ControlLabel>Max:</ControlLabel>
              <FormControl
                type="text"
                placeholder="$$$"
                value={this.state.maxLimit}
                onChange={e => this.setState({ maxLimit: e.target.value }) }
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Calender Link</ControlLabel>
              <FormControl
                type="text"
                placeholder="(Optional)"
                value={this.state.calLink}
                onChange={e => this.setState({ calLink: e.target.value }) }
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

NGOEditModal.propTypes = {
  location: PropTypes.string,
  categories: PropTypes.array,
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

export default connect(mapStateToProps, mapDispatchToProps)(NGOEditModal);
