import { 
    CUSTOMER_LOCATION_SUCCES,
    CUSTOMER_LOCATION_FAIL,
    CUSTOMER_LOCATION_LOADING
} from '../actiontypes/index'

const initialState = {
    customerLocation: {
        city: "",
        county: ""
    },

    customerLocationError:{
        isError: false,
        errorMessage: ""
    },

    customerLocationLoading: false,

}

export default function(state = initialState, action){
    switch(action.type){
        case CUSTOMER_LOCATION_SUCCES:
            return {
                ...state,
                customerLocationLoading: false,
                customerLocation: {
                    city: action.payload.customerLocation.city,
                    county: action.payload.customerLocation.county
                }
            };
        
        case CUSTOMER_LOCATION_LOADING:
            return {
                ...state,
                customerLocationLoading: true
            }

        case CUSTOMER_LOCATION_FAIL:
            return {
                customerLocationLoading: false,
                customerLocationError: {
                    isError: true,
                    errorMessage: action.payload.customerLocationError.errorMessage
                }
            };

        default: return state;
    }
}