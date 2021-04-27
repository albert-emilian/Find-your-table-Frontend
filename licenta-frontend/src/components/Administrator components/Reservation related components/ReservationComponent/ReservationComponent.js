import React, { useState } from 'react'
import { connect } from 'react-redux';
import { deleteReservation } from '../../../../actions/reservationActions'
import {
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants';
import { 
    DELETE_RESERVATION_SUCCESS
} from '../../../../actiontypes/index'
import OrderDetailsComponent from '../OrderDetailsComponent/OrderDetailsComponent'
import {Button} from 'react-bootstrap'
import './ReservationComponent.css'

 function ReservationComponent(props) {
    
    const { ReservationId, customerId } = props.reservation;
    const [renderOrderDetails, setRenderOrderDetails] = useState(false);

    const handleDeleteReservation = async () => {
        const result = await deleteReservation(ReservationId, props.dispatch);

        if(result){
            const { accesToken, refreshToken } = result;

        const tableById = (element) => element.ReservationId === ReservationId;
        const index = props.reservationsList.findIndex(tableById)
        
        props.dispatch({type: DELETE_RESERVATION_SUCCESS, payload: { index: index }});

        
        localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
        localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken);    
        }
    }

    const handleOrderDetails = () => {
        setRenderOrderDetails(true)
    }

    const closeOrderDetails = () => {
        setRenderOrderDetails(false)
    }
  
    return (
        <div>
           Reservation hour ⌛️: <span className="reservation-hour-info">{props.reservation.ReservationHour}</span>
          {
            renderOrderDetails ? null : <Button className="button-table-reservation" variant="outline-dark" onClick={handleDeleteReservation}>Delete</Button>
          } 
           {
            renderOrderDetails ? <OrderDetailsComponent closeOrderDetails={closeOrderDetails}  customerId={customerId}/> : <Button className="button-table-reservation" variant="outline-dark" onClick={handleOrderDetails}>Order details</Button>
           }
           
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    reservationsList: state.reservationState.reservationsList
})

export default connect(mapStateToProps)(ReservationComponent)
