import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLIC } from '../../../helpers/constants'

import  CheckoutForm  from "../CheckoutForm/CheckoutForm";
import {CardComponent} from '../CardForm/CardForm'

const PUBLIC_KEY = STRIPE_PUBLIC

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;