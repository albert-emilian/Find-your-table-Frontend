import axios from 'axios';
import { 
    RESERVATIONS_TABLE_LIST_FAIL,
    DELETE_RESERVATION_FAIL,
    EXISTING_RESERVATION_FAIL,
    RESERVATIONS_TABLE_CUSTOMER_LIST_FAIL
} from '../actiontypes/index';
import { 
    DNS,
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR,
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../helpers/constants'


export const loadReservationsList = async (tableId, dispatch) => {

    try {

        const result = await axios.post(`${DNS}/reservation/table/all`, {
            tableId: tableId,
            accesToken: localStorage.getItem(ACCESS_TOKEN_ADMINISTRATOR),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_ADMINISTRATOR)
        });

        return result.data;
        
    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: RESERVATIONS_TABLE_LIST_FAIL, payload: { reservationsListError: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
}



export const loadReservationsListCustomer = async (tableId, dispatch) => {

    try {

        const result = await axios.post(`${DNS}/reservation/customer/table/all`, {
            tableId: tableId,
            accesToken: localStorage.getItem(ACCESS_TOKEN_CUSTOMER),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_CUSTOMER)
        });

        return result.data;
        
    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: RESERVATIONS_TABLE_CUSTOMER_LIST_FAIL, payload: { reservationsListTableCustomerError: {
            errorMessage: error.response.data.message
        }
    }});
    }
}


export const deleteReservation = async (reservationId, dispatch) => {

    try {
        const result = await axios.post(`${DNS}/reservation/administrator/delete`, {
            ReservationId: reservationId,
            accesToken: localStorage.getItem(ACCESS_TOKEN_ADMINISTRATOR),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_ADMINISTRATOR)
        });

        
        return result.data;
        
    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: DELETE_RESERVATION_FAIL, payload: { reservationDeleteFail: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
}

export const createReservation = async (reservation, dispatch, email, TableId) => {

    try {
        const {reservationHour, numberOfPersons} =  reservation;

        const result = await axios.post(`${DNS}/reservation/order/create`, {
            reservation: {
                NumberOfPersons: numberOfPersons,
                ReservationHour: reservationHour,
                customerEmail: email,
                tableId: TableId
            },
            accesToken: localStorage.getItem(ACCESS_TOKEN_CUSTOMER),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_CUSTOMER)
        });
        
        return result.data;
        
    } catch (error) {
        console.log(error.response.data)
        if(error.response && error.response.data)
        dispatch({type: DELETE_RESERVATION_FAIL, payload: { reservationDeleteFail: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
}

export const verifiyExistingActiveReservation = async (email, dispatch) => {

    try {

        const result = await axios.post(`${DNS}/reservation/existing`,{
            email: email,
            accesToken: localStorage.getItem(ACCESS_TOKEN_CUSTOMER),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_CUSTOMER)
        });

        return result.data;
        
    } catch (error) {
        console.log(error.response.data)
        if(error.response && error.response.data)
        dispatch({type: EXISTING_RESERVATION_FAIL, payload: { existingReservationError: {
            errorMessage: error.response.data.message
        }
    }});
    }
}

export const cancelReservation = async  (reservationId, orderId, dispatch) => {
    try {

        const result = await axios.post(`${DNS}/reservation/customer/delete`, {
            reservationId: reservationId,
            orderId: orderId,
            accesToken: localStorage.getItem(ACCESS_TOKEN_CUSTOMER),
            refreshToken: localStorage.getItem(REFRESH_TOKEN_CUSTOMER)
        });

        return result.data;

        
    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: DELETE_RESERVATION_FAIL, payload: { customerDeleteReservationFail: {
            errorMessage: error.response.data.message
        }
    }});
    }
    
}