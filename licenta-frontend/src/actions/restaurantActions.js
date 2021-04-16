import axios from 'axios';
import {
    RESTAURANT_INFO_SAVE_SUCCES ,
    RESTAURANT_INFO_SAVE_VALIDATION_ERROR,
    RESTAURANT_INFO_SAVE_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL,
 } from '../actiontypes/index'
import restaurantInfoValidation from '../helpers/restaurantInfoValidation'
import { 
    DNS,
    ACCESS_TOKEN,
    REFRESH_TOKEN
 } from '../helpers/constants'

 export const saveRestaurantInfo = async (name, email, city, street, number, county, phone, description, theme, dispatch) => {

    try {
        restaurantInfoValidation(name, city, street, county, phone, description, theme)

        console.log("ACTIONS", street)

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
                Phone: phone
            },
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        dispatch({type: RESTAURANT_INFO_SAVE_SUCCES});

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


 