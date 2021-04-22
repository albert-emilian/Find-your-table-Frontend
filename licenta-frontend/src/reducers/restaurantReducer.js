import { 
    RESTAURANT_INFO_SAVE_SUCCES ,
    RESTAURANT_INFO_SAVE_VALIDATION_ERROR,
    RESTAURANT_INFO_SAVE_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_SUCCES,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_LOADING,
    RESTAURANT_LOGOUT_CLEAR,
    CHECK_EXISTING_RESTAURANT_SUCCESS,
    CHECK_EXISTING_RESTAURANT_FAIL,
    OCCUPATION_INTERVAL_SUCCESS,
    OCCUPATION_INTERVAL_LOADING,
    OCCUPATION_INTERVAL_FAIL
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

    restaurantInfo: {},
    isRestaurantReady: false,
    checkRestaurantFail: {
        isError: false,
        errorMessage: ""
    },

    occupationPerIntervals: {},
    occupationPerIntervalsLoading: false,
    occupationPerIntervalsError: {
        isError: false,
        errorMessage: ""
    }


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
                    errorMessage: action.payload.restaurantsRetrievedByCityCustomerLocationError.errorMessage
                }
            };

        case RESTAURANT_LOGOUT_CLEAR:
            return {
                ...state,
                restaurantsRetrievedByCustomerLocationCityList: [],
                isRestaurantListRetrievedByCustomerLocation: false
            };

        case CHECK_EXISTING_RESTAURANT_SUCCESS:
            return {
                ...state,
                isRestaurantReady: action.payload.isRestaurantReady,
                restaurantInfo: action.payload.restaurantInfo
            };

        case CHECK_EXISTING_RESTAURANT_FAIL:
            return {
                ...state,
                checkRestaurantFail: {
                    isError: true,
                    errorMessage: action.payload.checkRestaurantFail.errorMessage
                }
            }

        case OCCUPATION_INTERVAL_SUCCESS:
            return {
                ...state,
                occupationPerIntervals: action.payload.occupationPerIntervals,
                occupationPerIntervalsLoading: false
            }
        
        case OCCUPATION_INTERVAL_LOADING: 
            return {
                ...state,
                occupationPerIntervalsLoading: true
            }
        
        case OCCUPATION_INTERVAL_FAIL: 
            return {
                ...state,
                occupationPerIntervalsLoading: false,
                occupationPerIntervalsError: {
                    isError: true,
                    errorMessage: action.payload.occupationPerIntervalsError.errorMessage
                }
            }

         default: return state;   
    }
 }