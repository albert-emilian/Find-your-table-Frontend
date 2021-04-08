import React from 'react'
import { connect } from 'react-redux';
import { deleteReservation } from '../../actions/reservationActions'
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../helpers/constants';
import { 
    DELETE_RESERVATION_SUCCESS
} from '../../actiontypes/index'

 function ReservationComponent(props) {
    
    const { ReservationId } = props.reservation

    const handleDeleteReservation = async () => {
        const result = await deleteReservation(ReservationId, props.dispatch);

        if(result){
            const { accesToken, refreshToken } = result;

        const tableById = (element) => element.ReservationId === ReservationId;
        const index = props.reservationsList.findIndex(tableById)
        
        props.dispatch({type: DELETE_RESERVATION_SUCCESS, payload: { index: index }});

        
        localStorage.setItem(ACCESS_TOKEN,accesToken);
        localStorage.setItem(REFRESH_TOKEN,refreshToken);    
        }
    }

    const handleEditReservation = async () => {

    }
  
    return (
        <div>
           {props.reservation.ReservationHour}
            <button onClick={handleDeleteReservation}>DELETE</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    reservationsList: state.reservationState.reservationsList
})

export default connect(mapStateToProps)(ReservationComponent)
