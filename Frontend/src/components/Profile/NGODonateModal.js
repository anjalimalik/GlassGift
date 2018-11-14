import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm';


class NGODonateModal extends Component {

  constructor(props) {
    super(props);
    this.onDonate = this.onDonate.bind(this);
  }

  onDonate() {
  }

  render() {
    return (
      <div className="NGODonateModal">
        <Modal
          show={this.props.visibility}
          onHide={() => this.props.onChangeVisibility(false)}
          >
          <Modal.Header closeButton>
            <Modal.Title>Donate</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <StripeProvider apiKey="pk_test_tT5Wr6dgsHTfyhCGrGaJYLM1">
              <Elements>
                <CheckoutForm ngoId={this.props.ngoId} minLimit={this.props.minLimit} maxLimit={this.props.maxLimit}
                  onChangeVisibility={this.props.onChangeVisibility}
                />
              </Elements>
            </StripeProvider>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NGODonateModal;
