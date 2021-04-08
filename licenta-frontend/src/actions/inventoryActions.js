import axios from 'axios';
import { 
    INVENTORY_LIST_ERROR,
    INVENTORY_ITEM_DELETE_FAIL,
    ADD_INVENTORY_ITEM_VALIDATION_ERROR,
    ADD_INVENTORY_ITEM_ERROR,
    UPDATE_INVENTORY_ITEM_VALIDATION_ERRORS,
    UPDATE_INVENTORY_ITEM_ERROR
} from '../actiontypes/index';
import itemValidation from '../helpers/itemValidation';
import { 
    DNS,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
 } from '../helpers/constants'

export const loadInventoryItemsList = async (dispatch, email) => {

    try {

        const result = await axios.post(`${DNS}/inventory/all/administrator`, {
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN),
            Email: email
        });

        return result.data;
        
    } catch (error) {
        if(error.response && error.response.data)
        dispatch({type: INVENTORY_LIST_ERROR, payload: { inventoryItemListError: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
};


export const deleteInventoryItemsList = async (itemId, dispatch) => {
    try {

        const result = await axios.delete(`${DNS}/inventory/item/delete`, {
        data:{
            InventoryItemId: itemId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        }
        });

        return result.data;

    } catch (error) {
        
        if(error.response && error.response.data)
        dispatch({type: INVENTORY_ITEM_DELETE_FAIL, payload: { itemInventoryDeleteFail: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
}

export const addInventoryItem = async (item, email, dispatch) => {

    try {
        const {name, description, unitprice, quantity} = item;

        itemValidation(name, description, unitprice, quantity);

        const result = await axios.post(`${DNS}/inventory/item/create`, {
          inventoryItem:{
            Name: name, 
            Description: description,
            InventoryQuantity: quantity,
            UnitPrice: unitprice,
            administratorEmail: email
          },
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;
        
    } catch (error) {
        if(error.validationErrors)
        dispatch({type: ADD_INVENTORY_ITEM_VALIDATION_ERROR, payload: { addInventoryItemsValidationErrors: error.validationErrors}});
        
        if(error.response && error.response.data)
        dispatch({type: ADD_INVENTORY_ITEM_ERROR, payload: {addInventoryItemError:{
            isError: true,
            errorMessage: error.response.data.message
        } }});
    }

}


export const updateInventoryItem = async (item, inventoryItemId, dispatch) => {

    try {

        const {name, description, unitprice, quantity} = item;

        itemValidation(name, description, unitprice, quantity);

        const result = await axios.post(`${DNS}/inventory/item/update`, {
            "inventoryItem": {
                "InventoryItemId": inventoryItemId,
                "UnitPrice": unitprice,
                "Name": name,
                "Description": description,
                "InventoryQuantity": quantity
            },
            "accesToken": localStorage.getItem(ACCESS_TOKEN),
            "refreshToken":  localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;
        
    } catch (error) {
        if(error.validationErrors)
        dispatch({type: UPDATE_INVENTORY_ITEM_VALIDATION_ERRORS, payload: { updateInventoryItemsValidationErrors: error.validationErrors}});
        
        if(error.response && error.response.data)
        dispatch({type: UPDATE_INVENTORY_ITEM_ERROR, payload: { updateInventoryItemError:{
            isError: true,
            errorMessage: error.response.data.message
        } }});
    }
}
