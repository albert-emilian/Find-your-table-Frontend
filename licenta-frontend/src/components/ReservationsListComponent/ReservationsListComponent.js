import React, { useEffect, useState }from 'react'
import { connect } from 'react-redux'
import ReservationComponent from '../ReservationComponent/ReservationComponent'
const ReservationsListComponent = (props) => {


    const handeCloseButton = () => {
        props.closeReservationsList();
    }

    return (
        <div>
            <div>
            { props.render && props.isReservationsListRetrieved ? props.reservationsList.map(reservation => <ReservationComponent reservation ={reservation} key={reservation.ReservationId} />)  : null}
            </div>
            <button onClick={handeCloseButton}>Close</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    reservationsList: state.reservationState.reservationsList,
    isReservationsListRetrieved: state.reservationState.isReservationsListRetrieved
})


export default connect(mapStateToProps)(ReservationsListComponent)
