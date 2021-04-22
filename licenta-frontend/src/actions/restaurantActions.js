import axios from 'axios';
import {
    RESTAURANT_INFO_SAVE_SUCCES ,
    RESTAURANT_INFO_SAVE_VALIDATION_ERROR,
    RESTAURANT_INFO_SAVE_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL,
    CHECK_EXISTING_RESTAURANT_FAIL,
    CHECK_EXISTING_RESTAURANT_SUCCESS,
    OCCUPATION_INTERVAL_FAIL
 } from '../actiontypes/index'
import restaurantInfoValidation from '../helpers/restaurantInfoValidation'
import { 
    DNS,
    ACCESS_TOKEN,
    REFRESH_TOKEN
 } from '../helpers/constants'

 export const saveRestaurantInfo = async (name, email, city, street, number, county, phone, description, theme, dispatch, startingHour, finishingHour) => {

    try {
        restaurantInfoValidation(name, city, street, county, phone, description, theme)

      

        const result = await axios.post(`${DNS}/restaurant/create`, {
            restaurant: {
                Email: email,
                Name: name, 
                City: city,
                County: county,
                Street: street,
                LocNumber: number,
                Description: description,
                Theme: theme,
                Phone: phone,
                StartingHour: startingHour,
                FinishingHour: finishingHour
            },
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

        

        

    } catch (error) {
    if(error.validationErrors)
        dispatch({type: RESTAURANT_INFO_SAVE_VALIDATION_ERROR, payload:{restaurantInfoValidationErrors: error.validationErrors}});
        
    if(error.response && error.response.data)
        dispatch({type: RESTAURANT_INFO_SAVE_FAIL, payload: { restaurantInfoFail:{
            errorMessage: error.response.data.message
        }}});
    }
 }

 export const getRestaurantsByCustomerLocation = async  (city, county, dispatch) =>{

    try {
       
        const result = await axios.post(`${DNS}/restaurant/location/all`, {
            City: city,
            County: county,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

       return result;

    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: RESTAURANTS_RETRIEVED_BY_CITY_FAIL, payload: {
            restaurantsRetrievedByCityCustomerLocationError:{
                errorMessage: error.response.data.message
            }
        } });
    }
 }


export const isRestaurantReady = async (administratorId, dispatch) => {
    try {

        const result = await axios.post(`${DNS}/restaurant/check`, {

            administratorId: administratorId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;
        
    } catch (error) {
        console.log(error.response.data)
        if(error.response && error.response.data)
        dispatch({type: CHECK_EXISTING_RESTAURANT_FAIL, payload: {
            checkRestaurantFail:{
                errorMessage: error.response.data.message
            }
        }});
    }
}


export const updateRestaurantInfo = async (name, email, city, street, number, county, phone, description, theme, dispatch, startingHour, finishingHour) => {

    try {
        restaurantInfoValidation(name, city, street, county, phone, description, theme)

        const result = await axios.post(`${DNS}/restaurant/update`, {
            restaurant: {
                Email: email,
                Name: name, 
                City: city,
                County: county,
                Street: street,
                LocNumber: number,
                Description: description,
                Theme: theme,
                Phone: phone,
                StartingHour: startingHour,
                FinishingHour: finishingHour
            },
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;
        

    } catch (error) {
    if(error.validationErrors)
        dispatch({type: RESTAURANT_INFO_SAVE_VALIDATION_ERROR, payload:{restaurantInfoValidationErrors: error.validationErrors}});
        
    if(error.response && error.response.data)
        dispatch({type: RESTAURANT_INFO_SAVE_FAIL, payload: { restaurantInfoFail:{
            errorMessage: error.response.data.message
        }}});
    }
 }

 export const loadOccupationInterval =  async (restaurantId, dispatch) => {
    try {

        const result = await axios.post(`${DNS}/restaurant/occupation`,{
            restaurantId: restaurantId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

        
    } catch (error) {
        console.log(error.response.data)
    if(error.response && error.response.data)
        dispatch({type: OCCUPATION_INTERVAL_FAIL, payload: {  occupationPerIntervalsError: {
            errorMessage: error.response.data.message
        }}});
    }
 }


 