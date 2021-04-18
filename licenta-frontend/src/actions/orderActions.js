import axios from 'axios';
import { 
    ADD_ORDER_ITEM_FAIL,
    CUSTOMER_DELETE_RESERVATION_FAIL,
    ORDER_DETAILS_FAIL
} from '../actiontypes/index';
import itemValidation from '../helpers/itemValidation';
import { 
    DNS,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
 } from '../helpers/constants'


export const addItemOrder = async (orderQuantity, orderId, inventoryItemId, dispatch) => {
    try {

        const result = await axios.post(`${DNS}/order/item/add`, {
          
            orderItem :{
                OrderQuantity: orderQuantity,
                orderId: orderId,
                inventoryItemId: inventoryItemId
            },
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

        
    } catch (error) {
        console.log(error.response.data)
        if(error.response && error.response.data)
        dispatch({type: ADD_ORDER_ITEM_FAIL, payload: { orderItemAddFail: {
            errorMessage: error.response.data.message
        }
    }});
    }
}


export const deleteOrderItem = async (orderItemId, dispatch) => {
    try {
        
        const result = await axios.post(`${DNS}/order/item/delete`, {
            OrderItemId: orderItemId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;

    } catch (error) {
        console.log(error.response.data)
        dispatch({type: CUSTOMER_DELETE_RESERVATION_FAIL, payload: { orderItemDeleteFail: {
            errorMessage: error.response.data.message
        }
    }});
    }
}

export const loadOrderDetails = async (customerId, dispatch) => {
    try {

        const result = await axios.post(`${DNS}/order/customer`, {
            customerId: customerId,
            accesToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        });

        return result.data;
        
    } catch (error) {
        console.log(error.response.data.message)
        dispatch({type: ORDER_DETAILS_FAIL, payload: { orderDetailsError: {
            errorMessage: error.response.data.message
        }
    }});
    }
}