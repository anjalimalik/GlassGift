import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/login';

class Login extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    let { email, password } = this.state;
    let { loginPending, loginSuccess, loginError } = this.props;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div className="form-group-collection">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email"
              onChange={e => this.setState({email: e.target.value})}
              value={email}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password"
              onChange={e => this.setState({password: e.target.value})}
              value={password}
            />
          </div>
        </div>

        <input type="submit" value="Login" />

        { loginPending && <div>Please wait...</div> }
        { loginSuccess && <div>Success</div> }
        { loginError && <div>{loginError.message}</div> }
      </form>
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
