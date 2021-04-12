import React from 'react'
import { connect } from 'react-redux'

export const OrderItemComponent = (props) => {
    return (
        <div>
             <label>
                Name: {props.item.Name} x {props.item.orderQuantity}
            </label>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(OrderItemComponent)
