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
    ADD_ORDER_ITEM,
    ADD_ORDER_ITEM_FAIL,
    DELETE_ORDER_ITEM_FAIL,
    DELETE_ORDER_ITEM_SUCCESS,
    CUSTOMER_DELETE_RESERVATION_FAIL,
    RESERVATION_DELETE_HOUR_ERROR,
    RESERVATION_DELETE_SUCCESS
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
    reservation: {},
    order: {},
    menu: [],
    orderItems: [],
    existingReservationError: {
        isError: false,
        errorMessage: ""
    },
    orderItemAddFail: {
        isError: false,
        errorMessage: ""
    },
    orderItemDeleteFail: {
        isError: false,
        errorMessage: ""
    },
    deleteReservationHourError: {
        isError: false,
        errorMessagee: ""
    },
    customerDeleteReservationFail: {
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
                reservation: action.payload.reservation,
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
                reservation: action.payload.reservation,
                order: action.payload.order,
                menu: action.payload.menu,
                orderItems: action.payload.orderItems
            }

        case EXISTING_RESERVATION_FAIL:
            return {
                ...state,
                existingReservationError: {
                    isError: true,
                    errorMessage: action.payload.existingReservationError.errorMessage
                }
            }

        case ADD_ORDER_ITEM:
            return {
                ...state,
                orderItems: [...state.orderItems, action.payload.item],
                order: action.payload.updatedOrder
            }
        

        case ADD_ORDER_ITEM_FAIL:
            return {
                ...state,
                orderItemAddFail: {
                    isError: true,
                    errorMessage: action.payload.orderItemAddFail.errorMessage
                }
            }
        

        case DELETE_ORDER_ITEM_SUCCESS:
            return {
                ...state,
                order: action.payload.updatedOrder,
                orderItems:   state.orderItems.filter( (item, index) => index !== action.payload.index)
            }

        case DELETE_ORDER_ITEM_FAIL:
            return {
                ...state,
                orderItemDeleteFail: {
                    isError: true,
                    errorMessage: action.payload.orderItemDeleteFail.errorMessage
                }
            }

        case RESERVATION_DELETE_HOUR_ERROR:
            return {
                ...state,
                deleteReservationHourError: {
                    isError: true,
                    errorMessage: action.payload.deleteReservationHourError.errorMessage
                }
            }

        case RESERVATION_DELETE_SUCCESS: 
            return{
                ...state,
                reservation: {},
                order: {},
                menu: [],
                orderItems: [],
                reservationCreated: false,
                reservationCreateLoading: false,
            }

        case CUSTOMER_DELETE_RESERVATION_FAIL:
            return {
                ...state,
                customerDeleteReservationFail: {
                    isError: true,
                    errorMessage: action.payload.customerDeleteReservationFail.errorMessage
                }
            }
        

        default: return state;
    }
}