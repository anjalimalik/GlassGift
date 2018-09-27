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
    this.onCategoriesChange = this.onCategoriesChange.bind(this);

    this.state = {
      location: '',
      categories: this.props.categories || [],
    };
  }

  onSaveChanges() {
    this.props.updateNGO(this.state).then(() => {
      this.props.onChangeVisibility(false)
    });
  }

  onCategoriesChange(categories) {
    this.setState({ categories });
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

          <Modal.Body>
            <FormGroup bsSize="large">
              <ControlLabel>Location</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                placeholder={this.props.location}
                value={this.state.location}
                onChange={(e) => { this.setState({ location: e.target.value }) }}
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Categories</ControlLabel>
              <Select isMulti value={this.state.categories}
                options={selectNGOOptions} onChange={this.onCategoriesChange}
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
