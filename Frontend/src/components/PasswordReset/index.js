import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import './PasswordReset.css';


class PasswordReset extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password: '',
      confPassword: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="PasswordReset center-block">
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

          <FormGroup bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              value={this.state.confPassword}
              onChange={(e) => { this.setState({ confPassword: e.target.value }) }}
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
          </Button>
        </form>
      </div>
    );
  }
}

export default PasswordReset;
