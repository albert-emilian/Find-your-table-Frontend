import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_LOADING
} from '../../../../actiontypes/index'
import {
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants'
import {loadOrderDetails} from '../../../../actions/orderActions';
import OrderDetailsItemComponent from '../OrderDetailsItemComponent/OrderDetailsItemComponent';

export const OrderDetailsComponent = (props) => {

 useEffect(async ()=> {

    props.dispatch({type: ORDER_DETAILS_LOADING});

    const result = await loadOrderDetails(props.customerId, props.dispatch);

    if(result){

        const { accesToken, refreshToken, order} = result;

        props.dispatch({type: ORDER_DETAILS_SUCCESS, payload: {
            orderDetails: order
        }});

        localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
        localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR, refreshToken);
    }


 },[])



const handleCloseButton = () => {
    props.closeOrderDetails()
}

    return (
        <div>
        <h3>Order details</h3>
        <div>
            <h4>Items</h4>
            {
                props.orderDetails.OrderItems.length > 0 ? props.orderDetails.OrderItems.map(item => <OrderDetailsItemComponent item={item} key={item.InventoryItemId}/>) : <p>There are not items added to the order yet!😁</p> 
            }
        </div>
        <div>
        <label>
                OrderId : {props.orderDetails.OrderId}
            </label>
            <label>
                Total : {props.orderDetails.OrderTotal}
            </label>
            <label>
                Tips : {props.orderDetails.Tips}
            </label>
        </div>
        <button onClick={handleCloseButton}>Close</button>
        {
            console.log(props)
        }
        </div>
    )
}

const mapStateToProps = (state) => ({
    orderDetails: state.reservationState.orderDetails,
    orderDetailsLoading: state.reservationState.orderDetailsLoading
})

export default connect(mapStateToProps)(OrderDetailsComponent)

