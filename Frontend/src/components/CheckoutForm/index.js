import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert, CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Checkbox, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { donate, donateClear } from '../../actions/donate';
import { getUserId } from '../../actions/utils';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      message: '',
      anon: false,
    }

    this.handleDonationTypes = this.handleDonationTypes.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.submit = this.submit.bind(this);
  }

  renderAlert() {
    if (this.props.donate.error) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.donateClear}>
          <h4>There was an error donating</h4>
          <p>{this.props.donate.error}</p>
        </Alert>
      );
    }
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: getUserId() });
    if (!token) return;

    this.props.donate({
      // ngoId, anon, message, type, honorid, honorname, amount, stripeToken
      ngoId: this.props.ngoId,
      anon: this.state.anon,
      type: this.state.type,
      //honorid: null, // not needed
      honorname: this.name.honorname,
      amount: this.state.amount,
      stripeToken: token,
    })
    .then(() => { if (this.props.donate.success) this.props.onChangeVisibility(false) });
  }

  handleDonationTypes(e) {
    if (this.state.type !== '1' || this.state.type !== '2') {
        this.props.donate.error = "Invalid input for name of the person being honored or remembered through this donation. ";
        return;
    }
    this.setState({ honorname: e.target.value })
  }

  render() {
    return (
      <div className="CheckoutForm">
        {this.renderAlert()}
        <FormGroup>
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

        <select value={this.state.type} onChange={e => this.setState({ type: e.target.value })}>
          <option selected value="0">On own behalf</option>
          <option value="1">In Honor Of</option>
          <option value="2">In Memory Of</option>
        </select>

        <FormControl
          type="text"
          placeholder="Name of the person honored/remembered"
          value={this.state.honorname}
          onChange={e => this.handleDonationTypes(e)}
        />

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

        <CardElement />

        <Button onClick={() => this.props.onChangeVisibility(false)}>Close</Button>
        <Button
          bsStyle="primary"
          disabled={this.props.donate.pending}
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
    donate: donate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    donate,
    donateClear,
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));
