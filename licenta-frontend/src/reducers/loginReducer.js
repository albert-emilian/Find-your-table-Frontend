import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_VALIDATION_ERRORS,
    LOGIN_FAIL_CLOSE,
    DISPLAY_TWO_FACTOR_FORM,
    HIDE_TWO_FACTOR_FORM,
    TWO_FACTOR_VALIDATION_ERRORS,
    RECUPERATION_FAIL
} from '../actiontypes/index'
import { 
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR,
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../helpers/constants'


const initialState = {

    loggedIn: false,

    loggedUser:{
        email: "",
        firstName: "",
        lastName: "",
        role: "",
    },

    loginError:{
        isError: false,
        errorMessage: ""
    },

    loginValidationErrors: [],
    renderTwoFactorForm: false,
    userId: "",
    twoFactorLoginValidationError: "",

    recuperationFail:{
        isError: false,
        errorMessage: ""
    } 

}

export default function(state = initialState, action){
    switch(action.type){

        case TWO_FACTOR_VALIDATION_ERRORS:
            return {
                ...state,
                twoFactorLoginValidationError: action.payload.twoFactorLoginValidationError
            }

        case LOGIN_VALIDATION_ERRORS:
            return {
                ...state,
                loginValidationError: action.payload.loginValidationError
            };
        

        case LOGIN_FAIL_CLOSE:
            return {
                ...state,
                loginError:{
                    isError: false,
                    errorMessage: ""
                }
            };
        


        case LOGIN_FAIL:
            return {
                ...state,
                loginError: {
                    isError: true,
                    errorMessage: action.payload.loginError.errorMessage
                }
            };

        case DISPLAY_TWO_FACTOR_FORM:
            return {
                ...state,
                renderTwoFactorForm: true,
                userId: action.payload.userId
            }

        case HIDE_TWO_FACTOR_FORM:
            return {
                ...state,
                renderTwoFactorForm: false,
                userId: ""
            }; 
        
        case LOGIN_SUCCESS: 
            if(action.payload.loggedUser.role === 'administrator'){
                window.localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR, action.payload.accesToken);
                window.localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR, action.payload.refreshToken);
            }else {
                window.localStorage.setItem(ACCESS_TOKEN_CUSTOMER, action.payload.accesToken);
                window.localStorage.setItem(REFRESH_TOKEN_CUSTOMER, action.payload.refreshToken);
            }
          
            return {
                ...state,
                renderTwoFactorForm: false,
                loggedIn: true,
                loggedUser: {
                    email: action.payload.loggedUser.email,
                    firstName: action.payload.loggedUser.firstName,
                    lastName: action.payload.loggedUser.lastName,
                    role: action.payload.loggedUser.role,
                }

            };

        case LOGOUT_SUCCESS:
            if(state.loggedUser.role === "administrator"){
                localStorage.removeItem(ACCESS_TOKEN_ADMINISTRATOR);
                localStorage.removeItem(REFRESH_TOKEN_ADMINISTRATOR);
            }else{
                localStorage.removeItem(ACCESS_TOKEN_ADMINISTRATOR);
                localStorage.removeItem(REFRESH_TOKEN_ADMINISTRATOR);
            }
          
            return {
                ...state,
                loggedIn: false,
                loggedUser: {
                    email: "",
                    firstName: "",
                    lastName: "",
                    role: ""
                }
            };

        case RECUPERATION_FAIL:
            return {
                ...state,
                recuperationFail:{
                    isError: true,
                    errorMessage: action.payload.recuperationFail.errorMessage
                } 
            }

        default: return state;

    }
}