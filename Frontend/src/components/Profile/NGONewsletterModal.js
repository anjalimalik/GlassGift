import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateNGONewsletter, updateNGONewsletterClear } from '../../actions/updateNGONewsletter';
import { sendNGONewsletter, sendNGONewsletterClear } from '../../actions/sendNGONewsletter';


class NGONewsletterModal extends Component {

  constructor(props) {
    super(props);

    this.onCreateNewsletter = this.onCreateNewsletter.bind(this);
    this.onSendNewsletter = this.onSendNewsletter.bind(this);

    this.state = {
      newsletter: '',
    };
  }

  componentDidMount() {
  }

  static defaultProps = {
        ngoId: 0,
        newsletter: '',
  };

  onCreateNewsletter() {
    console.log("newsletter: " + this.state.newsletter);
    this.props.updateNGONewsletter(this.props.ngoId, this.state.newsletter).then(() => {
      this.props.onChangeVisibility(false);
    });
  }

  onSendNewsletter() {
    this.props.sendNGONewsletter(this.props.ngoId).then(() => {
        this.props.onChangeVisibility(false)
    });
  }

  render() {
    return (
      <div className="NGONewsletterModal">
        <Modal
          show={this.props.visibility}
          onHide={() => this.props.onChangeVisibility(false)}
          >
          <Modal.Header closeButton>
            <Modal.Title>Create Newsletter</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormGroup>
              <ControlLabel>New Newsletter</ControlLabel>
              <FormControl
                autoFocus
                componentClass="textarea"
                rows={20}
                placeholder={this.props.newsletter}
                value={this.state.newsletter}
                onChange={e => this.setState({ newsletter: e.target.value }) }
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            
            <Button onClick={() => this.props.onChangeVisibility(false)}>Close</Button>

            <Button
              bsStyle="warning"
              disabled={this.props.sendpending}
              onClick={this.onSendNewsletter}
            >
              Send to Subscribers
              { this.props.sendpending ? <span className="loginButtonSpinner">
                <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
            </Button>

            <Button
              bsStyle="primary"
              disabled={this.props.updatepending}
              onClick={this.onCreateNewsletter}
            >
              Create New Newsletter
              { this.props.updatepending ? <span className="loginButtonSpinner">
                <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

NGONewsletterModal.propTypes = {
  visibility: PropTypes.bool,
  onChangeVisibility: PropTypes.func,
};

function mapStateToProps({ updateNGONewsletter, sendNGONewsletter, }) {
  return {
    updatepending: updateNGONewsletter.pending,
    updatesuccess: updateNGONewsletter.success,
    updateerror: updateNGONewsletter.error,
    //sendpending: sendNGONewsletter.pending,
    //sendsuccess: sendNGONewsletter.success,
    //senderror: sendNGONewsletter.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNGONewsletter,
    updateNGONewsletterClear,
    sendNGONewsletter,
    sendNGONewsletterClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NGONewsletterModal);
