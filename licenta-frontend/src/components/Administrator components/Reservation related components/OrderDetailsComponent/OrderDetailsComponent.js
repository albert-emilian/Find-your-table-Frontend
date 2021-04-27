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
import {Button} from 'react-bootstrap'
import './OrderDetailsComponent.css'

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
                props.orderDetails?.OrderItems?.length > 0 ? props.orderDetails.OrderItems.map(item => <OrderDetailsItemComponent item={item} key={item.InventoryItemId}/>) : <p>There are not items added to the order yet!😁</p> 
            }
        </div>
        <div>
            <label className="table-order-details">
                OrderId : <span className="table-order-details-content">{props.orderDetails.OrderId ?? 0}</span>
            </label>
            <label className="table-order-details">
                Total 💰: <span className="table-order-details-content">{props.orderDetails.OrderTotal ?? 0} lei</span>
            </label>
            <label className="table-order-details">
                Tips : <span className="table-order-details-content">{props.orderDetails.Tips ?? 0} lei</span>
            </label>
        </div>
        <Button className="button-close-table-order-details" variant="outline-dark" onClick={handleCloseButton}>Close</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    orderDetails: state.reservationState.orderDetails,
    orderDetailsLoading: state.reservationState.orderDetailsLoading
})

export default connect(mapStateToProps)(OrderDetailsComponent)

