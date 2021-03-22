import { 
    REGISTER_FAIL_CLOSE,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VALIDATION_ERROR,
    REGISTER_LOADING,
    SCANNED_QR
} from '../actiontypes/index.js';

const initialState = {
    registerLoading: false,
    qrCode: "",
    registerSuccess: false,
    validationErrors: [],
    registrationError: {
        isError: false,
        errorMessage: ""
    }
};

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_LOADING:
            return{
                ...state,
                registerLoading: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerLoading: false,
                qrCode: action.payload.qrCode,
                registerSuccess: true
            };
        case SCANNED_QR:
            return{
                ...state,
                registerSuccess:false
            }

        case VALIDATION_ERROR:
            return {
                ...state,
               validationErrors: action.payload.validationErrors
            };

        case REGISTER_FAIL:
            return{
                ...state,
                registrationError: {
                    isError: true,
                    errorMessage: action.payload.registrationError.errorMessage
                }
            };
        
        case REGISTER_FAIL_CLOSE:
            return{
                ...state,
                registrationError: {
                    isError: false,
                    errorMessage: ""
                }
            }
        default: return state;
    }
}