import React from 'react'
import { connect } from 'react-redux'
import OrderItemComponent from '../OrderItemComponent/OrderItemComponent'
import { useHistory } from "react-router-dom";
import {
    RESERVATION_DELETE_HOUR_ERROR,
    RESERVATION_DELETE_SUCCESS
} from '../../../../actiontypes/index';
import {
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../../../../helpers/constants'
import { cancelReservation } from '../../../../actions/reservationActions';

const OrderComponent = (props) => {

    const history = useHistory();

    const handlePay = () => {

        history.push("/customer/page/restaurant/reservation/pay")
    }

    const handleCancelReservation = async () => {

    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const reservationHour = props.reservation.ReservationHour;

//    if(time > reservationHour) {props.dispatch({type: RESERVATION_DELETE_HOUR_ERROR, payload: { deleteReservationHourError: {
//     errorMessage: "You cannot delete the reservation after the reservation hour. Talk to the administration to solutionate this problem!"
//     }}});
//    return;
//     }

    const result = await cancelReservation(props.reservation.ReservationId, props.order.OrderId, props.dispatch);

    if(result){

        const {accesToken, refreshToken} = result;
       
        props.dispatch({type: RESERVATION_DELETE_SUCCESS});

        localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
        localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken);

        history.push('/customer/page');
    }
}

    return (
        <div>
            <div>
          <h3>Order</h3>
            </div>
            <div>
            <div>
                <button onClick={handleCancelReservation}>Cancel reservation</button>
                {
                 props.deleteReservationHourError.isError ? <p>{props.deleteReservationHourError.errorMessage}</p>: null
                }
            </div>
            <div>
                {
                   props?.orderItems.length > 0 ? props.orderItems.map(item => <OrderItemComponent item={item} key={item.InventoryItemId}/>) : "Your order is empty"
                }
            </div>
                <label>
                    Order id: {props.order.OrderId}
                    Total: {props.order.OrderTotal}
                    Tips: {props.order.Tips}
                </label> 
                <div>
                <button onClick={handlePay}>Pay</button>
                </div>               
                
            </div>     
        </div>
    )
}


const mapStateToProps = (state) => ({
    order: state.reservationState.order,
    orderItems: state.reservationState.orderItems,
    reservation: state.reservationState.reservation,
    deleteReservationHourError: state.reservationState.deleteReservationHourError
})

export default connect(mapStateToProps)(OrderComponent)
