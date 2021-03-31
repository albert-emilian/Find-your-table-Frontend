import { 
    RESTAURANT_INFO_SAVE_SUCCES ,
    RESTAURANT_INFO_SAVE_VALIDATION_ERROR,
    RESTAURANT_INFO_SAVE_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_SUCCES,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_LOADING,
    RESTAURANT_LOGOUT_CLEAR
} from '../actiontypes/index'

const initialState = {
    restaurantInfoSaved: false,
    restaurantInfoValidationErrors: [],
    restaurantInfoFail: {
        isError: false,
        errorMessage: ""
    },

    isRestaurantListRetrievedByCustomerLocation: false, 
    restaurantsRetrievedByCustomerLocationLoading: false,
    restaurantsRetrievedByCustomerLocationCityList: [],
    restaurantsRetrievedByCityCustomerLocationError: {
        isError: false,
        errorMessage: ""
    },
 };

 export default function(state = initialState, action){
    switch(action.type){
        case RESTAURANT_INFO_SAVE_SUCCES:
            return {
                ...state,
                restaurantInfoSaved: true
            };
        
        case RESTAURANT_INFO_SAVE_VALIDATION_ERROR:
            return {
                ...state,
                restaurantInfoValidationErrors: action.payload.restaurantInfoValidationErrors
            };

        case RESTAURANT_INFO_SAVE_FAIL:
            return {
                ...state,
                restaurantInfoSaved: false,
                restaurantInfoFail: {
                    isError: true,
                    errorMessage: action.payload.restaurantInfoFail.errorMessage
                }
            };

        case RESTAURANTS_RETRIEVED_BY_CITY_LOADING:
            return {
                ...state,
                restaurantsRetrievedByCustomerLocationLoading: true
            }

        case RESTAURANTS_RETRIEVED_BY_CITY_SUCCES:
            return {
                ...state,
                isRestaurantListRetrievedByCustomerLocation: true, 
                restaurantsRetrievedByCustomerLocationLoading: false,
                restaurantsRetrievedByCustomerLocationCityList: action.payload.restaurantsRetrievedByCustomerLocationCityList
            };

        case RESTAURANTS_RETRIEVED_BY_CITY_FAIL:
            return {
                ...state,
                isRestaurantListRetrievedByCustomerLocation: false, 
                restaurantsRetrievedByCustomerLocationLoading: false,
                restaurantsRetrievedByCityCustomerLocationError:{
                    isError: true,
                    errorMessage: action.payload.restaurantsRetrievedByCityError.errorMessage
                }
            };

        case RESTAURANT_LOGOUT_CLEAR:
            return {
                ...state,
                restaurantsRetrievedByCustomerLocationCityList: [],
                isRestaurantListRetrievedByCustomerLocation: false
            };

         default: return state;   
    }
 }