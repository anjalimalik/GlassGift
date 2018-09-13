import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Checkbox, Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { login } from '../../actions/login';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    // TODO validate email and password
    this.props.login(email, password);
    this.setState({
      email: '',
      password: '',
      rememberMe: false,
    });
  }

  render() {
    return (
      <div className="Login center-block">

        <h1>Login</h1>

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
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pending: state.pending,
    loginSuccess: state.success,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
