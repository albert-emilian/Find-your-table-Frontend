import React, {useState} from 'react'
import { connect } from 'react-redux'
import {
    ADD_ORDER_ITEM
} from '../../../../actiontypes/index'

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

    const handleAddButton = () => {

        const { item } = props;
        item["orderQuantity"] = quantity.count

        props.dispatch({type: ADD_ORDER_ITEM, payload:{
            item: props.item,
        }});
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
    
})



export default connect(mapStateToProps)(MenuItemComponent)
