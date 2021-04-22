import React, {useState} from 'react'
import { connect } from 'react-redux'
import {
    ADD_ORDER_ITEM
} from '../../../../actiontypes/index'
import { addItemOrder } from '../../../../actions/orderActions'
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../../../helpers/constants'

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

        console.log(orderItem)

        props.dispatch({type: ADD_ORDER_ITEM, payload:{
            item: orderItem,
            updatedOrder:updatedOrder
        }});

        localStorage.setItem(ACCESS_TOKEN,accesToken);
        localStorage.setItem(REFRESH_TOKEN,refreshToken)
        }
    }

    return (
        <div>
            <label>
                Name: {props.item.Name}
            </label>
            <label>
                InventoryQuantity: {props.item.InventoryQuantity}
            </label>
            <label>
                Price {props.item.UnitPrice}
            </label>
            <span>
            <button onClick={handleAddButton}>Add</button>
            <button onClick={handleIncrement}>+</button>
            <input type="text" readOnly value={quantity.count}/>
            <button onClick={handleDecrement}>-</button>
            </span>
         
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.reservationState.order,
    reservation: state.reservationState.reservation
})



export default connect(mapStateToProps)(MenuItemComponent)
