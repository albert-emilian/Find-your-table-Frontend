import React from 'react'
import { deleteInventoryItemsList } from '../../actions/inventoryActions'
import { connect } from 'react-redux';
import {
    INVENTORY_ITEM_DELETE_SUCCESS,
    INVENTORY_ITEM_DELETE_LOADING
} from '../../actiontypes/index'

function InventoryItemComponent(props) {

    const {Name, Description, UnitPrice, InventoryQuantity, InventoryItemId} = props.item;

    const handleDeleteButton = async () => {

        props.dispatch({type: INVENTORY_ITEM_DELETE_LOADING });

        const result = await deleteInventoryItemsList(InventoryItemId, props.loggedUser.email, props.dispatch);

        const { accesToken, refreshToken } = result;

        const itemById = (element) => element.InventoryItemId === InventoryItemId;
        const index = props.inventoryItems.findIndex(itemById)
        
        props.dispatch({type: INVENTORY_ITEM_DELETE_SUCCESS, payload: { index: index }});

        
        localStorage.setItem("ACCES_TOKEN",accesToken);
        localStorage.setItem("REFRESH_TOKEN",refreshToken);    
    }


    

    return (
        <div>
            <label>
                Name: {Name}
                Description: {Description}
                UnitPrice: {UnitPrice}
                InventoryQuantity: {InventoryQuantity}
            </label>
            <button onClick={handleDeleteButton}>Delete</button>
            <button >Edit</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loggedUser: state.login.loggedUser,
    inventoryItems: state.inventoryState.inventoryItemsList
})

export default connect(mapStateToProps)(InventoryItemComponent);


