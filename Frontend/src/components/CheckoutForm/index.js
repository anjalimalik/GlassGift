import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Checkbox, FormControl, FormGroup, InputGroup, ControlLabel, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { donate, donateClear, donateError } from '../../actions/donate';
import { getUserId, getUserToken } from '../../utils';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '0',
      message: '',
      anon: false,
      type: 0,
      previous: false,
      saved: 0,
      recurring: 0,
    }

    this.handleDonationTypes = this.handleDonationTypes.bind(this);
    this.submit = this.submit.bind(this);
    this.renderCardInput = this.renderCardInput.bind(this);
  }

  componentDidMount() {
    const token = getUserToken();
    axios.get('http://localhost:3000/donation/prev', { headers: { Authorization: token }})
    .then(response => this.setState({ previous: true }))
    .catch(error => this.setState({ previous: false }));
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: getUserId() });
    if (!token) return;

    this.props.donate({
      ngoId: this.props.ngoId,
      anon: this.state.anon,
      type: this.state.type,
      honorname: this.state.honorname,
      message: this.state.message,
      amount: parseInt(this.state.amount, 10) * 100,
      stripeToken: token,
    })
    .then(() => { if (this.props.success) this.props.history.push('/donationcompleted', this.props.success) });
  }

  handleDonationTypes(e) {
    if (this.state.type !== '1' || this.state.type !== '2') {
        donateError("Invalid input for name of the person being honored or remembered through this donation.");
        return;
    }
    this.setState({ honorname: e.target.value })
  }

  renderCardInput() {
    if (!this.state.previous) {
      return (
          <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
            <CardElement />
          </div>
      );
    }

    let input = !this.state.saved ? <CardElement /> : null;

    return (
      <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
        <div style={{paddingBottom: '10px'}}>
          <ButtonToolbar>
            <ToggleButtonGroup type="radio" name="searchType" defaultValue={0}
            onChange={saved => this.setState({ saved })}
            >
              <ToggleButton value={0}>New CC</ToggleButton>
              <ToggleButton value={1}>Use Previous</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>
        {input}
      </div>
    );
  }

  render() {

    const minMaxColor = this.props.error ? 'red' : 'black';

    return (
      <div className="CheckoutForm">
        <FormGroup>
          <ControlLabel style={{color: minMaxColor}}>
            Min: {this.props.minLimit} Max: {this.props.maxLimit}
          </ControlLabel>
          <InputGroup>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl
              type="number"
              value={this.state.amount}
              onChange={e => this.setState({ amount: e.target.value })}
            />
            <InputGroup.Addon>.00</InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <FormControl componentClass="select"
            placeholder={this.state.type} onChange={e => this.setState({ type: parseInt(e.target.value, 10) })}
          >
            <option value={0}>On own behalf</option>
            <option value={1}>In Honor Of</option>
            <option value={2}>In Memory Of</option>
          </FormControl>
        </FormGroup>

        {(() => {
          if (this.state.type !== 0) {
            return (
              <FormControl
                type="text"
                placeholder="Name of the person honored/remembered"
                value={this.state.honorname}
                onChange={e => this.handleDonationTypes(e)}
              />
            )
          }
        })()}

        <FormControl
          type="text"
          placeholder="Message"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />

        <Checkbox
          defaultChecked={this.state.anon}
          onChange={e => { this.setState({ anon: e.target.checked }) }}
        >
          Anonymous
        </Checkbox>

        {this.renderCardInput()}

        <FormGroup>
          <FormControl componentClass="select"
            placeholder={this.state.recurring} onChange={e => this.setState({ recurring: parseInt(e.target.value, 10) })}
          >
            <option value={0}>Don't recur</option>
            <option value={1}>Every day</option>
            <option value={2}>Every week</option>
            <option value={3}>Every month</option>
            <option value={4}>Every year</option>
          </FormControl>
        </FormGroup>

        <Button onClick={() => this.props.onChangeVisibility(false)}>Close</Button>
        <Button
          bsStyle="primary"
          disabled={this.props.pending}
          onClick={this.submit}
        >
          Donate
          { this.props.pending ? <span className="loginButtonSpinner">
            <FontAwesomeIcon icon="spinner" size="1x" spin/></span> : null }
        </Button>
      </div>
    );
  }
}

function mapStateToProps({ donate }) {
  return {
    pending: donate.pending,
    success: donate.success,
    error: donate.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    donate,
    donateClear,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(withRouter(CheckoutForm)));
