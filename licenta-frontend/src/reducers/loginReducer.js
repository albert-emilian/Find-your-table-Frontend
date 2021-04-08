import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_VALIDATION_ERRORS,
    LOGIN_FAIL_CLOSE,
    DISPLAY_TWO_FACTOR_FORM,
    HIDE_TWO_FACTOR_FORM,
    TWO_FACTOR_VALIDATION_ERRORS,
} from '../actiontypes/index'
import { 
    ACCESS_TOKEN,
    REFRESH_TOKEN
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
            window.localStorage.setItem(ACCESS_TOKEN, action.payload.accesToken);
            window.localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
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
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
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

        default: return state;

    }
}