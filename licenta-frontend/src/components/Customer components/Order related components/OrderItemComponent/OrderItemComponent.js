import React from 'react'
import { connect } from 'react-redux'
import { 
    DELETE_ORDER_ITEM_SUCCESS
} from '../../../../actiontypes/index'
import { 
    REFRESH_TOKEN_CUSTOMER,
    ACCESS_TOKEN_CUSTOMER
} from '../../../../helpers/constants'
import { deleteOrderItem } from '../../../../actions/orderActions';
import {Button} from 'react-bootstrap'
import './OrderItemComponent.css'

const OrderItemComponent = (props) => {

    const { OrderItemId, OrderQuantity, inventoryItemId } = props.item;
     

    const handleRemoveItem = async () => {
         const result = await deleteOrderItem(OrderItemId, props.dispatch);

        if(result){
        
        const { accesToken, refreshToken, updatedOrder } = result;

       
        props.dispatch({type: DELETE_ORDER_ITEM_SUCCESS, payload: { 
            item: props.item,
            updatedOrder: updatedOrder
        }});

        
        localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
        localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken); 

       }
    }

    return (
        <div className="">
         {props.menu.filter(item => item.InventoryItemId === inventoryItemId).map(item => item.Name)} x {OrderQuantity}
                <Button className="order-item-btn-remove" variant="outline-dark" onClick={handleRemoveItem}>Remove</Button>
        </div> )
    
}


const mapStateToProps = (state) => ({
    orderItems: state.reservationState.orderItems,
    menu: state.reservationState.menu
})

export default connect(mapStateToProps)(OrderItemComponent)
