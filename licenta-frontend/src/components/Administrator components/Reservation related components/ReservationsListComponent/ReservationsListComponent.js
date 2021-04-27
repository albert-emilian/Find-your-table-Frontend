import React, { useEffect, useState }from 'react'
import { connect } from 'react-redux'
import ReservationComponent from '../ReservationComponent/ReservationComponent'
import { Button } from 'react-bootstrap'
import './ReservationsListComponent.css'

const ReservationsListComponent = (props) => {


    const handeCloseButton = () => {
        props.closeReservationsList();
    }

    return (
        <div>
            <div className="table-reservation-list-container">
            { props.render && props.isReservationsListRetrieved ? props.reservationsList.map(reservation => <ReservationComponent reservation ={reservation} key={reservation.ReservationId} />)  : null}
            </div>
            <Button className="btn-close-table-reservation-list" variant="outline-dark" onClick={handeCloseButton}>Close</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    reservationsList: state.reservationState.reservationsList,
    isReservationsListRetrieved: state.reservationState.isReservationsListRetrieved
})


export default connect(mapStateToProps)(ReservationsListComponent)
