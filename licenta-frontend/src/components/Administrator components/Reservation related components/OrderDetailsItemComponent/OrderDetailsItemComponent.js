import React from 'react'

export default function OrderDetailsItemComponent(props) {

    const {Name, InventoryQuantity, UnitPrice, Quantity} = props.item;

    return (
        <div>
            <label>
                Name : {Name}
            </label>
            <label>
                InventoryQuantity : {InventoryQuantity}
            </label>
            <label>
                Price : {UnitPrice}
            </label>
            <label>
                Quantity : {Quantity}
            </label>
        </div>
    )
}
