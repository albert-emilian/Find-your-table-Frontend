import axios from 'axios';
import { 
    RESTAURANT_TABLE_LIST_FAIL,
    CREATE_RESTAURANT_TABLE_VALIDATION_ERROR,
    DELETE_RESTAURANT_TABLE_FAIL,
    CREATE_RESTAURANT_TABLE_FAIL,
    UPDATE_RESTAURANT_TABLE_FAIL
} from '../actiontypes/index';
import {
    DNS,
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../helpers/constants'
import { tableValidation } from '../helpers/tableValidation';

export const loadTableList = async (email,entity, dispatch) => {

    try {
        const result = await axios.post(`${DNS}/table/restaurant/${entity}/all`, {
            Email: email,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;
        
    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: RESTAURANT_TABLE_LIST_FAIL, payload: { tableListError: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
};

export const addTable = async (table, email, dispatch) => {

    try {

        const { tableSize, tableName } = table;

        tableValidation(tableName);

        const result =  await axios.post(`${DNS}/table/create`,{
            TableSize: tableSize,
            TableName: tableName,
            Email: email,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

    } catch (error) {
        console.log(error.response.data.message)
    if(error.validationError) 
        dispatch({type:  CREATE_RESTAURANT_TABLE_VALIDATION_ERROR, payload: {tableCreateValidationError: {
            errorMessage: error.validationError
        }}});
       
    if(error.response && error.response.data)
        dispatch({type: CREATE_RESTAURANT_TABLE_FAIL, payload: { tableCreateError:{
            errorMessage: error.response.data.message
        }}});
    }
};

export const deleteRestaurantTable = async (tableId,dispatch) => {
    try {

        const result = await axios.post(`${DNS}/table/delete`, {
            TableId: tableId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: DELETE_RESTAURANT_TABLE_FAIL, payload: {  tableDeleteError: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
};

export const updateRestaurantTable = async (table, dispatch) => {

    try {
        
        const { tableId, tableSize, tableName } = table;

        tableValidation(tableName);

        const result = await axios.post(`${DNS}/table/update`, {
            TableId: tableId,
            TableSize: tableSize,
            TableName: tableName,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

    } catch (error) {
        console.log(error.response)
        dispatch({type:  CREATE_RESTAURANT_TABLE_VALIDATION_ERROR, payload: {tableCreateValidationError: {
            errorMessage: error.validationError
        }}});

        if(error.response && error.response.data)
        dispatch({type: UPDATE_RESTAURANT_TABLE_FAIL, payload: {  tableUpdateError: {
            isError: true,
            errorMessage: error.response.data.message
            }
        }})
    };
}


