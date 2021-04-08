import {
    RESERVATIONS_TABLE_LIST_SUCCESS,
    RESERVATIONS_TABLE_LIST_LOADING,
    RESERVATIONS_TABLE_LIST_FAIL,
    RESERVATIONS_TABLE_LIST_CLOSE,
    RESERVATIONS_TABLE_LIST_CLEAR,
    DELETE_RESERVATION_SUCCESS,
    DELETE_RESERVATION_FAIL,
} from '../actiontypes/index'


const initialState = {

    reservationsList: [],
    isReservationsListRetrieved: false,
    reservationsListLoading: false,
    reservationsListError: {
        isError: false,
        errorMessage: ""
    },
    reservationDeleteFail: {
        isError: true,
        errorMessage: ""
    }

}


export default function(state = initialState, action){

    switch(action.type){

        case RESERVATIONS_TABLE_LIST_LOADING:
                return {
                    ...state,
                    reservationsListLoading: true,
                    isReservationsListRetrieved: false,
                };

        case RESERVATIONS_TABLE_LIST_FAIL:
                return {
                    ...state,
                    reservationsListError: {
                        isError: true,
                        errorMessage: action.payload.reservationsListError.errorMessage
                    },
                    isReservationsListRetrieved: false
                };

        case RESERVATIONS_TABLE_LIST_SUCCESS:
                return {
                    ...state,
                    reservationsList: action.payload.reservationsList,
                    isReservationsListRetrieved: true,
                    reservationsListLoading: false,
                }

        

        case RESERVATIONS_TABLE_LIST_CLEAR:
                return {
                    ...state,
                    reservationsList: []
                }

        case DELETE_RESERVATION_SUCCESS:
                return {
                    ...state,
                    reservationsList:   state.reservationsList.filter( (item, index) => index !== action.payload.index)
                }

        case DELETE_RESERVATION_SUCCESS:
            return {
                ...state,
                reservationDeleteFail: {
                    isError: true,
                    errorMessage: action.payload.reservationDeleteFail.errorMessage
                }
            };


                
        

        default: return state;
    }
}