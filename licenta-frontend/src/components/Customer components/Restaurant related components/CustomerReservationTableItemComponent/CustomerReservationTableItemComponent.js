import React from 'react'

export default function CustomerReservationTableItemComponent(props) {
    return (
        <div>
            <label>
                Reservation hour: {props.reservation.ReservationHour}
            </label>
            <label>
                Number of persons: {props.reservation.NumberOfPersons}
            </label>
        </div>
    )
}
