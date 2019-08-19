import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../actions/Index';

interface PaymentProps {
  handleStripeToken: (token: object) => void;
}

class Payment extends Component<any, PaymentProps> {
  render() {
    return (
      <div>
        {/* <StripeCheckout 
          name="Emaily"
          description="$5 for 5 email"
          amount={500}
          token={token => console.log(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY || ''}
        /> */}
        <StripeCheckout
          name="Emaily"
          description="$5 for 5 email"
          amount={500}
          token={token => this.props.handleStripeToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY || ''}
        >
          <button className="btn">Add Credit</button>
        </StripeCheckout>
      </div>
    )
  }
}

export default connect(null, { handleStripeToken })(Payment);
