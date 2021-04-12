import React from 'react'
import { connect } from 'react-redux'
import OrderItemComponent from '../OrderItemComponent/OrderItemComponent'

const OrderComponent = (props) => {


    
    return (
        <div>
            <div>
          <h3>Order</h3>
        {console.log(props)}
            </div>
            <div>
            <div>
                {
                    props.orderItems.length > 0 ? props.orderItems.map(item => <OrderItemComponent item={item} key={item.InventoryItemId}/>) : "Your order is empty"
                }
            </div>
                <label>
                    Order id: {props.order.OrderId}
                    Total: {props.order.OrderTotal}
                    Tips: {props.order.Tips}
                </label>                
            </div>     
        </div>
    )
}


const mapStateToProps = (state) => ({
    order: state.reservationState.order,
    orderItems: state.reservationState.orderItems
})

export default connect(mapStateToProps)(OrderComponent)
