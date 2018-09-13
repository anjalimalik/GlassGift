import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, PageHeader, Well } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forgotPassword, forgotPasswordClear } from '../../actions/forgotPassword';
import './ForgotPassword.css';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    this.props.forgotPassword();
  }

  componentWillUnmount() {
    this.props.forgotPasswordClear();
  }

  renderContent() {
    if (this.props.error) {
      return (
        <Alert bsStyle="danger">
          <p>
            {this.props.error}Click <a onClick={() => this.props.forgotPassword()}>here</a> to try again
          </p>
        </Alert>
      )
    }

    if (!this.props.success || this.props.pending) {
      return (
        <div className="forgotPasswordSpinner">
          <FontAwesomeIcon icon="spinner" size="6x" spin/>
        </div>
      );
    }

    return (
      <Well>Password reset has been sent to your email!</Well>
    );
  }

  render() {
    return (
      <div className="ForgotPassword center-block">
        <PageHeader>Forgot Password</PageHeader>
        { this.renderContent() }
      </div>
    );
  }
}

function mapStateToProps({ forgotPassword }) {
  return {
    pending: forgotPassword.pending,
    success: forgotPassword.success,
    error: forgotPassword.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    forgotPassword,
    forgotPasswordClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
