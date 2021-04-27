import React from "react";
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

 const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        
          const { accesToken, refreshToken} = response.data;

          localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
          localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken);

          props.dispatch({type: RESERVATION_DELETE_SUCCESS});

          history.push('/customer/page');

        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error.response.data);
      }
    } else {
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
    order: state.reservationState.order,
    orderItems: state.reservationState.orderItems, 
    reservation: state.reservationState.reservation
})


export default connect(mapStateToProps)(CheckoutForm);