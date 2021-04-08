import React, { useState } from 'react'
import { deleteInventoryItemsList } from '../../actions/inventoryActions'
import { connect } from 'react-redux';
import {
    INVENTORY_ITEM_DELETE_SUCCESS,
    INVENTORY_ITEM_DELETE_LOADING
} from '../../actiontypes/index'
import EditInventoryItemForm from '../EditInventoryItemForm/EditInventoryItemForm'
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../helpers/constants'

function InventoryItemComponent(props) {

    const [renderEdit, setRenderEdit] = useState(false);
    const {Name, Description, UnitPrice, InventoryQuantity, InventoryItemId} = props.item;



    const handleDeleteButton = async () => {

        props.dispatch({type: INVENTORY_ITEM_DELETE_LOADING });

        const result = await deleteInventoryItemsList(InventoryItemId, props.loggedUser.email, props.dispatch);

        const { accesToken, refreshToken } = result;

        const itemById = (element) => element.InventoryItemId === InventoryItemId;
        const index = props.inventoryItems.findIndex(itemById)
        
        props.dispatch({type: INVENTORY_ITEM_DELETE_SUCCESS, payload: { index: index }});

        
        localStorage.setItem(ACCESS_TOKEN,accesToken);
        localStorage.setItem(REFRESH_TOKEN,refreshToken);    
    }

    const handleEditButton = ()  => {
            setRenderEdit(true);
    }

    const closeEditForm = () => {
            setRenderEdit(false);
    }

    return (
        <div>
            <label>
                Name: {Name}
                Description: {Description}
                UnitPrice: {UnitPrice}
                InventoryQuantity: {InventoryQuantity}
            </label>
            <div>
            {
                renderEdit ? <EditInventoryItemForm item = {props.item} closeEditForm = {closeEditForm}/> : null
            }
            </div>
            <button onClick={handleDeleteButton}>Delete</button>
            <button onClick={handleEditButton}>Edit</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loggedUser: state.login.loggedUser,
    inventoryItems: state.inventoryState.inventoryItemsList
})

export default connect(mapStateToProps)(InventoryItemComponent);


