import axios from 'axios';
import { 
    RESERVATIONS_TABLE_LIST_FAIL,
    DELETE_RESERVATION_FAIL
} from '../actiontypes/index';
import { 
    DNS,
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../helpers/constants'


export const loadReservationsList = async (tableId, dispatch) => {

    try {

        const result = await axios.post(`${DNS}/reservation/table/all`, {
            tableId: tableId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
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


export const deleteReservation = async (reservationId, dispatch) => {

    try {
        const result = await axios.post(`${DNS}/reservation/administrator/delete`, {
            ReservationId: reservationId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        
        return result.data;
        
    } catch (error) {
        console.log(error.response)
        if(error.response && error.response.data)
        dispatch({type: DELETE_RESERVATION_FAIL, payload: { reservationDeleteFail: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
}