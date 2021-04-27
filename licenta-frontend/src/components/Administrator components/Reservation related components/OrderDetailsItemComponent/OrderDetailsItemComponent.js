import React from 'react'
import './OrderDetailsItemComponent.css'

export default function OrderDetailsItemComponent(props) {

    const {Name, InventoryQuantity, UnitPrice, Quantity} = props.item;

    return (
        <div>
            <label className="label-table-order-details">
                Name 🍔: <span className="label-table-order-details-content">{Name}</span>
            </label>
            <label  className="label-table-order-details">
                Inventory quantity : <span className="label-table-order-details-content">{InventoryQuantity}</span>
            </label>
            <label  className="label-table-order-details">
                Price 💰: <span className="label-table-order-details-content">{UnitPrice} lei</span> 
            </label>
            <label  className="label-table-order-details">
                Quantity : <span className="label-table-order-details-content">{Quantity}</span> 
            </label>
        </div>
    )
}
