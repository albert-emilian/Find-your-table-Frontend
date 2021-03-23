import axios  from "axios";
import { 
    VALIDATION_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_VALIDATION_ERRORS,
    DISPLAY_TWO_FACTOR_FORM,
    TWO_FACTOR_VALIDATION_ERRORS,
    LOGOUT_SUCCESS,
} from "../actiontypes/index.js";

import userRegisterValidation from '../helpers/userRegisterValidation';
import userLoginValidation from '../helpers/userLoginValidation';
import twoFactorInputCodeValidation from '../helpers/twoFactorInputCodeValidation'; 

export const registerUser = async  (user,dispatch,entity) => {
   
    try {

        const {email, firstName, lastName, password, phone, confirmPassword} = user;

        userRegisterValidation(email,password,firstName,lastName,phone,confirmPassword)

        const result = await axios.post(`http://localhost:8080/${entity}/register`,{
           user:{
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            Phone: phone
           }
        });
            dispatch({type: REGISTER_SUCCESS, payload: {
                qrCode: result.data.secret,
                registerSuccess: true
            }});

    } catch (error) {
        if(error.validationErrors)
            dispatch({type: VALIDATION_ERROR, payload:{validationErrors: error.validationErrors}});
        
        if(error.response && error.response.data)
            dispatch({type: REGISTER_FAIL, payload: {registrationError:{
                errorMessage: error.response.data.message
            }}});
    }
};

export const loginUser = async (user, dispatch,entity) => {

    try {

        const {email, password} = user;

        userLoginValidation(email, password);

        const result = await axios.post(`http://localhost:8080/${entity}/verifyCredentials`,{
           user:{
            Email: email,
            Password: password
           } 
        });

       if(result.data.validated){
           if(entity === "customer"){
            dispatch({type: DISPLAY_TWO_FACTOR_FORM, payload:{
                userId: result.data.customerId
            }});
           }else{
            dispatch({type: DISPLAY_TWO_FACTOR_FORM, payload:{
                userId: result.data.administratorId
            }});
           }
       }

    } catch (error) {
        
    if(error.validationErrors)
        dispatch({type: LOGIN_VALIDATION_ERRORS, payload:{loginValidationErrors: error.validationErrors}});
    
    if(error.response && error.response.data)
        dispatch({type: LOGIN_FAIL, payload: {loginError:{
            errorMessage: error.response.data.message
        }}});
    }
}

export const twoFactorValidation = async (userId, token, entity,dispatch) => {
    
    try {
        let result = null;

        twoFactorInputCodeValidation(token);
       
        if(entity === "customer"){
            result = await axios.post(`http://localhost:8080/${entity}/login/twofactor`, {
                customerId: userId,
                token: token
            });
        }else if (entity === "administrator"){
            result = await axios.post(`http://localhost:8080/${entity}/login/twofactor`, {
                administratorId: userId,
                token: token
            });
        }

        const { accesToken } = result.data;
        const { refreshToken } = result.data;
        const  loggedUser  = { ...result.data.user };

       return {
           accesToken: accesToken,
           refreshToken: refreshToken,
           loggedUser: loggedUser
       };
        
    } catch (error) {
    if(error.errorMessage)
    dispatch({type: TWO_FACTOR_VALIDATION_ERRORS, payload: {twoFactorLoginValidationError: error.errorMessage}});
    
    if(error.response && error.response.data)
    dispatch({type: TWO_FACTOR_VALIDATION_ERRORS, payload: {twoFactorLoginValidationError: error.response.data.message}});
    }
    
}

export const signOut = async (entity,dispatch,history) => {

    dispatch({type: LOGOUT_SUCCESS});
    history.push(`/login/${entity}`);
}


