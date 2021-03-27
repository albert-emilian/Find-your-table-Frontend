import axios from 'axios';
import {
    RESTAURANT_INFO_SAVE_SUCCES ,
    RESTAURANT_INFO_SAVE_VALIDATION_ERROR,
    RESTAURANT_INFO_SAVE_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_SUCCES,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL
 } from '../actiontypes/index'
import restaurantInfoValidation from '../helpers/restaurantInfoValidation'

 export const saveRestaurantInfo = async (accesToken, refreshToken, name, email, city, county, phone, description, theme, dispatch) => {

    try {
        restaurantInfoValidation(name, city, county, phone, description, theme)

        const result = await axios.post('http://localhost:8000/restaurant/create', {
            restaurant: {
                Email: email,
                Name: name, 
                City: city,
                County: county,
                Description: description,
                Theme: theme,
                Phone: phone
            },
            accesToken: accesToken,
            refreshToken: refreshToken
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

 