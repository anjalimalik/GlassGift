import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, ControlLabel, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetPassword, resetPasswordClear } from '../../actions/resetPassword';
import './ResetPassword.css';


class ResetPassword extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    const params = new URLSearchParams(props.location.search);
    this.state = {
      token: params.get('token'),
      password: '',
    };
  }

  componentWillUnmount() {
    this.props.resetPasswordClear();
  }

  onSubmit(e) {
    e.preventDefault();
    const { password, token } = this.state;
    this.props.resetPassword(password, token);
  }

  renderAlert() {
    if (this.props.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.resetPasswordClear}>
          <p>{this.props.error}</p>
        </Alert>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="ResetPassword center-block">

        <PageHeader>Reset Password</PageHeader>

        {this.renderAlert()}

        <form onSubmit={this.onSubmit}>
          <FormGroup bsSize="large">
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              autoFocus
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={(e) => { this.setState({ password: e.target.value }) }}
            />
          </FormGroup>

          <Button
            block
            bsSize="large"
            type="submit"
            bsStyle="primary"
            disabled={this.props.pending}
          >
            Reset Password
            { this.props.pending ? <span className="loginButtonSpinner">
              <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ resetPassword }) {
  return {
    pending: resetPassword.pending,
    success: resetPassword.success,
    error: resetPassword.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetPassword,
    resetPasswordClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
