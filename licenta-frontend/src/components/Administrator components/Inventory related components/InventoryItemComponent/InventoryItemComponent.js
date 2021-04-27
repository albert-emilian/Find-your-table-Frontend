import React, { useState } from 'react'
import { deleteInventoryItemsList } from '../../../../actions/inventoryActions'
import { connect } from 'react-redux';
import {
    INVENTORY_ITEM_DELETE_SUCCESS,
    INVENTORY_ITEM_DELETE_LOADING
} from '../../../../actiontypes/index'
import EditInventoryItemForm from '../EditInventoryItemForm/EditInventoryItemForm'
import {
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants'
import './InventoryItemComponent.css'
import {Button} from 'react-bootstrap'
function InventoryItemComponent(props) {

    const [renderEdit, setRenderEdit] = useState(false);
    const {Name, Description, UnitPrice, InventoryQuantity, InventoryItemId} = props.item;



    const handleDeleteButton = async () => {

        props.dispatch({type: INVENTORY_ITEM_DELETE_LOADING });

        const result = await deleteInventoryItemsList(InventoryItemId, props.loggedUser.email, props.dispatch);

        if(result){
        
        const { accesToken, refreshToken } = result;

        const itemById = (element) => element.InventoryItemId === InventoryItemId;
        const index = props.inventoryItems.findIndex(itemById)
        
        props.dispatch({type: INVENTORY_ITEM_DELETE_SUCCESS, payload: { index: index }});

        
        localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
        localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken); 
        }
    }

    const handleEditButton = ()  => {
            setRenderEdit(true);
            props.setRenderEditForm(true);
    }

    const closeEditForm = () => {
            setRenderEdit(false);
            props.setRenderEditForm(false);

    }

    return (
        <div className="inventory-container">
            <div>
                Name: {Name}
            </div>
            <div>
                Description: {Description}
            </div>
            <div>
                Price: {UnitPrice}
            </div>
            <div>
                Inventory quantity: {InventoryQuantity}
            </div>
            <div>
            {
                renderEdit ? <EditInventoryItemForm className="inventory-item-container" item = {props.item} closeEditForm = {closeEditForm}/> : null
            }
            </div>
            {
                renderEdit ? null : <Button className="btn-delete-item" variant="outline-dark" onClick={handleDeleteButton}>Delete</Button>
            }
            {
                renderEdit ? null : <Button className="btn-edit-item" variant="outline-dark" onClick={handleEditButton}>Edit</Button>
            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    loggedUser: state.login.loggedUser,
    inventoryItems: state.inventoryState.inventoryItemsList
})

export default connect(mapStateToProps)(InventoryItemComponent);


