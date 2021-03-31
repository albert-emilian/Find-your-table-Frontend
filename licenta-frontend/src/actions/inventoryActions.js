import axios from 'axios';
import { 
    INVENTORY_LIST_ERROR,
    INVENTORY_ITEM_DELETE_FAIL,
} from '../actiontypes/index';

export const loadInventoryItemsList = async (dispatch, email) => {

    try {

        const result = await axios.post('http://localhost:8000/inventory/all/administrator', {
            accesToken: localStorage.getItem('ACCES_TOKEN'),
            refreshToken: localStorage.getItem('REFRESH_TOKEN'),
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

        const result = await axios.delete('http://localhost:8000/inventory/item/delete', {
        data:{
            InventoryItemId: itemId,
            accesToken: localStorage.getItem('ACCES_TOKEN'),
            refreshToken: localStorage.getItem('REFRESH_TOKEN')
        }
        });

        return result.data;

    } catch (error) {
        console.log(error.response.data.message)
        if(error.response && error.response.data)
        dispatch({type: INVENTORY_ITEM_DELETE_FAIL, payload: { itemInventoryDeleteFail: {
            isError: true,
            errorMessage: error.response.data.message
        }
    }});
    }
}
