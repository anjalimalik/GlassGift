import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, Button, Checkbox, Col, ControlLabel, FormControl, FormGroup, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { login, loginClear } from '../../actions/login';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }

  componentWillUnmount() {
    this.props.loginClear();
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password, rememberMe } = this.state;
    // TODO validate email and password
    this.props.login(email, password, rememberMe);
    this.setState({
      email: '',
      password: '',
      rememberMe: false,
    });
  }

  renderAlert() {
    if (this.props.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.loginClear}>
          <p>{this.props.error}</p>
        </Alert>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="Login center-block">

        <PageHeader>Login</PageHeader>

        {this.renderAlert()}

        <form onSubmit={this.onSubmit}>

          <FormGroup bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => { this.setState({ email: e.target.value }) }}
            />
          </FormGroup>

          <FormGroup bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => { this.setState({ password: e.target.value }) }}
            />
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
              <Checkbox
                defaultChecked={this.state.rememberMe}
                onChange={(e) => { this.setState({ rememberMe: e.target.checked }) }}
              >
                Remember me
              </Checkbox>
            </Col>
            <Col sm={6}>
              <LinkContainer to="/forgotPassword">
                <Button bsStyle="link">Forgot Password</Button>
              </LinkContainer>
            </Col>
          </FormGroup>

          <Button
            block
            bsSize="large"
            type="submit"
            bsStyle="primary"
            disabled={this.props.pending}
          >
            Login
            { this.props.pending ? <span className="loginButtonSpinner">
              <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return {
    pending: login.pending,
    success: login.success,
    error: login.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
    loginClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
