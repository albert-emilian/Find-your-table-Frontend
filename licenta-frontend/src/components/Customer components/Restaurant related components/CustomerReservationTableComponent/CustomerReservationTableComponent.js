import React, {useEffect, useState} from 'react';
import { 
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../../../../helpers/constants';
import {loadReservationsListCustomer} from '../../../../actions/reservationActions';
import {connect} from "react-redux"
import CustomerReservationTableItemComponent from '../CustomerReservationTableItemComponent/CustomerReservationTableItemComponent'



function CustomerReservationTableComponent(props) {

    const [reservationList,setReservationList] = useState({});
    const [reservationListLoading,setReservationListLoading] = useState(false);

    useEffect(async ()=> {

        setReservationListLoading(true);

        const result = await loadReservationsListCustomer(props.tableId, props.dispatch)

        if(result){
            const {reservationsList, accesToken, refreshToken} = result;

            setReservationList(reservationsList);
            setReservationListLoading(false);

            localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
            localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken)
        }
    },[])


    return (
        <div>
            <h4>Current reservations:</h4>
            <div>
               {!reservationListLoading && reservationList.length > 0 ? reservationList.map(reservation =>
                <CustomerReservationTableItemComponent key={reservation.ReservationId} reservation={reservation}/>) : "There are no reservation at this table for the moment"}
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    reservationsListTableCustomerError: state.reservationState.reservationsListTableCustomerError
});

export default connect(mapStateToProps)(CustomerReservationTableComponent)
