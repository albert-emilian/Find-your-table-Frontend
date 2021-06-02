import React, {useState} from 'react'
import { connect } from 'react-redux'
import {
    ADD_ORDER_ITEM
} from '../../../../actiontypes/index'
import { addItemOrder } from '../../../../actions/orderActions'
import {
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../../../../helpers/constants'
import {Button} from 'react-bootstrap'
import './MenuItemComponent.css'

const MenuItemComponent = (props) => {

    const [quantity, setQuantity] = useState({
        count: 1
    });

    const handleIncrement = () => {
        setQuantity({
            count: quantity.count + 1
         })
    }

    const handleDecrement = () => {
        if(quantity.count > 1)
            setQuantity({
                count: quantity.count - 1
            })
    }

    const handleAddButton = async () => {


        const result = await addItemOrder(props.reservation.ReservationHour,quantity.count, props.order.OrderId, props.item.InventoryItemId, props.dispatch)

        if(result){

        const {accesToken, refreshToken, orderItem, updatedOrder } = result;

        props.dispatch({type: ADD_ORDER_ITEM, payload:{
            item: orderItem,
            updatedOrder:updatedOrder
        }});

        localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
        localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken)
        }
    }

    return (
        <div>
            <span className="menu-item-info">
                Name: {props.item.Name}
            </span>
            <span className="menu-item-info">
                Quantity: {props.item.InventoryQuantity}
            </span>
            <span className="menu-item-info">
                Price {props.item.UnitPrice}
            </span>
            <div className="quantity-form">
            <Button  variant="outline-dark" className="menu-quantity-button" onClick={handleIncrement}>+</Button>
            <input id="input-count-value" className="form-control" type="text" readOnly value={quantity.count}/>
            <Button variant="outline-dark" className="menu-quantity-button" onClick={handleDecrement}>-</Button>
            </div>
            <div>
            <Button variant="outline-dark" className="menu-add-button" onClick={handleAddButton}>Add</Button>
            </div>
            
         
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.reservationState.order,
    reservation: state.reservationState.reservation
})



export default connect(mapStateToProps)(MenuItemComponent)
