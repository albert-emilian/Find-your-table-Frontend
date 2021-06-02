import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "axios";
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import {
    DNS,
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../../../helpers/constants'
import {
  RESERVATION_DELETE_SUCCESS
} from '../../../actiontypes/index'
import {Button} from 'react-bootstrap';
import './CheckoutForm.css'
import LoadingComponent from '../../LoadingComponent/LoadingComponent'


 const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `${DNS}/stripe/charge`,
          {
            amount: props.order.OrderTotal + props.order.Tips,
            id: id,
            reservationId: props.reservation.ReservationId,
            orderId: props.order.OrderId,
            accesToken: localStorage.getItem(ACCESS_TOKEN_CUSTOMER),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_CUSTOMER)
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          
          setLoading(false);
          setSuccessMessage(true);

          setTimeout(() => {
            const { accesToken, refreshToken} = response.data;

            localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
            localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken);

            props.dispatch({type: RESERVATION_DELETE_SUCCESS});

            history.push('/customer/page');
          }, 1500);

          

        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error.response.data);
      }
    } else {
      console.log(error.response.data);
    }
  };
//<CardElement style="background-color: white;"/>
//
  return (
    <div>
     <h2 className="payment-title">We hope you had a great time!</h2>
     <h3 className="payment-title">Thank you for using our services!🙏🏽</h3>
    <div className="form-container">
    <form className="payment-form" style={{ maxWidth: 400 }}>
      <CardElement/>
      <Button id="payment-button" onClick={handleSubmit} variant="outline-dark">Pay</Button>
    </form>
    { successMessage ? <h3 className="payment-response-message">Payment was made successfuly!✅</h3> : null }
    {
      loading ? <LoadingComponent className="payment-response-message"/> : null
    }
    </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    order: state.reservationState.order,
    orderItems: state.reservationState.orderItems, 
    reservation: state.reservationState.reservation
})


export default connect(mapStateToProps)(CheckoutForm);