import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmEmail } from '../../actions/confirmEmail';


class ConfirmEmail extends Component {

  constructor(props) {
    super(props);

    // Get token from query params
    const params = new URLSearchParams(props.location.search);

    this.state = {
      token: params.get('token'),
    };
  }

  componentDidMount() {
    this.props.confirmEmail(this.state.token);
  }

  render() {
    if (this.props.error) {
      return (
        <div className="SentEmail center-block text-center">
          <Alert bsStyle="danger" onDismiss={null}>
            <p>{this.props.error}</p>
          </Alert>
        </div>
      );
    }

    if (this.props.pending) {
      return (
        <div className="SentEmail center-block text-center">
          <FontAwesomeIcon icon="spinner" size="5x" spin/>
        </div>
      );
    }

    if (this.props.success) {
      return (
        <div className="SentEmail center-block text-center">
          <Alert bsStyle="success">
            <p>Successfully confirmed account! Please <Link to="/login">Login</Link> now!</p>
          </Alert>
        </div>
      );
    }

    return <div></div>;
  }
}

function mapStateToProps({ confirmEmail }) {
  return {
    pending: confirmEmail.pending,
    success: confirmEmail.success,
    error: confirmEmail.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmEmail,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
