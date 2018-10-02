import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Alert, Button, ControlLabel, FormControl, FormGroup, PageHeader, Tabs, Tab, Form,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { NGO_CATEGORIES, SIGNUP_TAB_DEFAULT, SIGNUP_TAB_NGO, SIGNUP_TAB_DONOR, GENDER_OPTIONS } from '../../constants';
import { signup, signupClear } from '../../actions/signup';
import './Signup.css';

const selectNGOOptions = Object.keys(NGO_CATEGORIES).map(key => {
  return {
    value: key,
    label: NGO_CATEGORIES[key],
  };
});

const selectGenderOptions = Object.keys(GENDER_OPTIONS).map(key => {
  return {
    value: key,
    label: GENDER_OPTIONS[key],
  };
});

class Signup extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onCategoriesChange = this.onCategoriesChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.renderAlert = this.renderAlert.bind(this);

    this.state = {
      tab: SIGNUP_TAB_DEFAULT,

      name: '',
      email: '',
      location: '',
      age: '',
      gender: '',
      password: '',
      confPassword: '',
      description: '',
      minLimit: '',
      maxLimit: '',
      categories: [],
      calLink: '',
    };
  }

  componentWillUnmount() {
    this.props.signupClear();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }

  onChangeTab(tab) {
    this.setState({ tab })
  }

  onCategoriesChange(categories) {
    this.setState({ categories });
  }

  onGenderChange(gender) {
    this.setState({ gender });
  }

  renderAlert() {
    if (this.props.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.signupClear}>
          <p>{this.props.error}</p>
        </Alert>
      );
    }
    return null;
  }

  // TODO add location autocomplete
  render() {
    return (
      <div className="Signup center-block">
        <PageHeader>Signup</PageHeader>

        <p><strong>Pick Donor</strong> if you want to donate to a good cause.</p>
        <p><strong>Pick NGO</strong> if you're an NGO that wants to show yourself.</p>

        {this.renderAlert()}

        <Tabs id="signup-tabs" animation={false}
          activeKey={this.state.tab} onSelect={this.onChangeTab}
        >
          <Tab eventKey={SIGNUP_TAB_DONOR} title="Donor">
            <form onSubmit={this.onSubmit}>

              <FormGroup bsSize="large">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="John Smith..."
                  value={this.state.name}
                  onChange={(e) => { this.setState({ name: e.target.value }) }}
                />
              </FormGroup>

              <FormGroup bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  placeholder="johnsmith@email.com..."
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
                <br />
                <FormControl
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confPassword}
                  onChange={(e) => { this.setState({ confPassword: e.target.value }) }}
                />
              </FormGroup>

              <FormGroup bsSize="large">
                <ControlLabel>Age</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="##"
                  value={this.state.age}
                  onChange={(e) => { this.setState({ age: e.target.value }) }}
                />

              </FormGroup>
              <FormGroup bsSize="large">
                <ControlLabel>Gender</ControlLabel>
                <Select value={this.state.gender}
                options={selectGenderOptions} onChange={this.onGenderChange}
              />
              </FormGroup>

              <FormGroup bsSize="large">
                <ControlLabel>Location</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  placeholder="(Optional)"
                  value={this.state.location}
                  onChange={(e) => { this.setState({ location: e.target.value }) }}
                />
              </FormGroup>

              <Button
                block
                bsSize="large"
                type="submit"
                bsStyle="primary"
                disabled={this.props.pending}
              >
                Create Account
                { this.props.pending ? <span className="loginButtonSpinner">
                  <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
              </Button>
            </form>
          </Tab>
          <Tab eventKey={SIGNUP_TAB_NGO} title="NGO">
            {/* Category, description */}
            <FormGroup bsSize="large">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                placeholder="John Smith..."
                value={this.state.name}
                onChange={(e) => { this.setState({ name: e.target.value }) }}
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                placeholder="johnsmith@email.com..."
                value={this.state.email}
                onChange={(e) => { this.setState({ email: e.target.value }) }}
              />
            </FormGroup>

            <FormGroup bsSize="large" >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => { this.setState({ password: e.target.value }) }}
              />
              <br />
              <FormControl
                type="password"
                placeholder="Confirm Password"
                value={this.state.confPassword}
                onChange={(e) => { this.setState({ confPassword: e.target.value }) }}
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Categories</ControlLabel>
              <Select isMulti value={this.state.categories}
                options={selectNGOOptions} onChange={this.onCategoriesChange}
              />
            </FormGroup>

            <br/>
            <h3>
                Profile Specific Information</h3>
            <hr
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
            />

            <FormGroup bsSize="large">
              <ControlLabel>Location</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                placeholder="(Optional)"
                value={this.state.location}
                onChange={(e) => { this.setState({ location: e.target.value }) }}
              />
            </FormGroup>

            <FormGroup bsSize="large">
              <ControlLabel>Description</ControlLabel>
              <FormControl 
                autoFocus
                type="text"
                componentClass="textarea" 
                placeholder="(Optional)" 
                value={this.state.description}
                onChange={(e) => { this.setState({ description: e.target.value }) }}
                />
            </FormGroup>

            <ControlLabel>Donation Limits (optional)</ControlLabel>
            <Form inline bsSize="sm">
              <ControlLabel>Min:   </ControlLabel>{' '}
              <FormControl
                autoFocus
                type="text"
                placeholder="$"
                value={this.state.minLimit}
                onChange={(e) => { this.setState({ minLimit: e.target.value }) }}
              />{' '}
              <ControlLabel>Max:   </ControlLabel>{' '}
              <FormControl
                autoFocus
                type="text"
                placeholder="$$$"
                value={this.state.maxLimit}
                onChange={(e) => { this.setState({ maxLimit: e.target.value }) }}
              />{' '}
            </Form>

            <br />
            
            <FormGroup bsSize="large">
              <ControlLabel>Calender Link</ControlLabel>
              <FormControl 
                autoFocus
                type="text"
                placeholder="(Optional)" 
                value={this.state.calLink}
                onChange={(e) => { this.setState({ calLink: e.target.value }) }}
                />
            </FormGroup>


            <Button
              block
              bsSize="large"
              type="submit"
              bsStyle="primary"
              disabled={this.props.pending}
            >
              Create Account
              { this.props.pending ? <span className="loginButtonSpinner">
                <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
            </Button>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ signup }) {
  return {
    pending: signup.pending,
    success: signup.success,
    error: signup.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signup,
    signupClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
