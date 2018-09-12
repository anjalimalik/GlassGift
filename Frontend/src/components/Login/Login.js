import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox, Col } from 'react-bootstrap';
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
    this.props.login(email, password);
    this.setState({
      email: '',
      password: '',
      rememberMe: false,
    });
  }

  render() {
    return (
      <div id="Login" className="center-block">

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
              <Button bsStyle="link">Forgot Password</Button>
            </Col>
          </FormGroup>

          <Button
            block
            bsSize="large"
            type="submit"
            bsStyle="primary"
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
    loginPending: state.loginPending,
    loginSuccess: state.loginError,
    loginError: state.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
