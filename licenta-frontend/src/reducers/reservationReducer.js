import {
    RESERVATIONS_TABLE_LIST_SUCCESS,
    RESERVATIONS_TABLE_LIST_LOADING,
    RESERVATIONS_TABLE_LIST_FAIL,
    RESERVATIONS_TABLE_LIST_CLOSE,
    RESERVATIONS_TABLE_LIST_CLEAR,
    DELETE_RESERVATION_SUCCESS,
    DELETE_RESERVATION_FAIL,
    CREATE_RESERVATION_LOADING,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_FAIL,
    EXISTING_RESERVATION,
    EXISTING_RESERVATION_FAIL,
    ADD_ORDER_ITEM
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
    },
   
    reservationCreated: false,
    reservationCreateLoading: false,
    reservationCreateError:{
        isError: false,
        errorMessage: ""
    },

    foundReservation: false,
    order: {},
    menu: [],
    orderItems: [],
    existingReservationError: {
        isError: false,
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

        case CREATE_RESERVATION_SUCCESS:
            return {
                ...state,
                order: action.payload.order,
                menu: action.payload.menu,
                reservationCreated: true,
                reservationCreateLoading: false
            };

        case CREATE_RESERVATION_FAIL:
            return {
                ...state,
                reservationCreateError:{
                    isError: false,
                    errorMessage: action.payload.reservationCreateError.errorMessage
                }
            };

        case CREATE_RESERVATION_LOADING:
            return {
                ...state,
                reservationCreateLoading: true
            };

        case EXISTING_RESERVATION:
            return {
                ...state,
                foundReservation: true,
                order: action.payload.order,
                menu: action.payload.menu
            }

        case EXISTING_RESERVATION_FAIL:
            return {
                ...state,
                existingReservationError: {
                    isError: true,
                    errorMessage: action.payload.existingReservationError.errorMessage
                }
            }

        case ADD_ORDER_ITEM:{
            return {
                ...state,
                orderItems: [...state.orderItems, action.payload.item]
            }
        }

        default: return state;
    }
}