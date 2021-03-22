import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_VALIDATION_ERRORS,
    LOGIN_FAIL_CLOSE,
    DISPLAY_TWO_FACTOR_FORM,
    HIDE_TWO_FACTOR_FORM
} from '../actiontypes/index'

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
    userId: ""
}

export default function(state = initialState, action){
    switch(action.type){

        case LOGIN_VALIDATION_ERRORS:
            return {
                ...state,
                loginValidationErrors: action.payload.loginValidationErrors
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
                renderTwoFactorForm: false
            }; 
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggedUser: {
                    email: action.payload.loggedUser.email,
                    firstName: action.payload.loggedUser.firstName,
                    lastName: action.payload.loggedUser.lastName,
                    role: action.payload.loggedUser.role,
                }
            };

        case LOGOUT_SUCCESS:
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