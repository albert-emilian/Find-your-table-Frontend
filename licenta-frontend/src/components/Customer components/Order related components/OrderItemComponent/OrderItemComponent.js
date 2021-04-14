import React from 'react'
import { connect } from 'react-redux'
import { 
    DELETE_ORDER_ITEM_SUCCESS
} from '../../../../actiontypes/index'
import { 
    REFRESH_TOKEN,
    ACCESS_TOKEN
} from '../../../../helpers/constants'
import { deleteOrderItem } from '../../../../actions/orderActions';

const OrderItemComponent = (props) => {

    const { OrderItemId, OrderQuantity } = props.item;
     

    const handleRemoveItem = async () => {
         const result = await deleteOrderItem(OrderItemId, props.dispatch);

        if(result){
        
        const { accesToken, refreshToken, updatedOrder } = result;

        const itemById = (element) => element.OrderItemId === OrderItemId;
        const index = props.orderItems.findIndex(itemById)
        
       
        props.dispatch({type: DELETE_ORDER_ITEM_SUCCESS, payload: { 
            index: index,
            updatedOrder: updatedOrder
        }});

        
        localStorage.setItem(ACCESS_TOKEN,accesToken);
        localStorage.setItem(REFRESH_TOKEN,refreshToken); 

       }
    }

    return (
        <div>
          AAAA
            <div>
                <button onClick={handleRemoveItem}>Remove</button>
            </div>
        </div> )
    
}


const mapStateToProps = (state) => ({
    orderItems: state.reservationState.orderItems
})

export default connect(mapStateToProps)(OrderItemComponent)
