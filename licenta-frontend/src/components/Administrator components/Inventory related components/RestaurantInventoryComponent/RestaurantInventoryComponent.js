import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom';
import { connect } from 'react-redux'
import { 
    INVENTORY_LIST_LOADING,
    INVENTORY_LIST_SUCCES
} from '../../../../actiontypes/index';
import { loadInventoryItemsList } from '../../../../actions/inventoryActions';
import InventoryItemComponent from '../InventoryItemComponent/InventoryItemComponent'
import AddInventoryForm from '../AddInventoryItemForm/AddInventoryItemForm'
import {
    REFRESH_TOKEN_ADMINISTRATOR,
    ACCESS_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants'
import {Button} from "react-bootstrap"
import "./RestaurantInventoryComponent.css"
 

export const RestaurantInventoryComponent = (props) => {

    const [renderAddItem, setRenderAddItem] = useState(false);
    const [renderEditForm, setRenderEditForm] = useState(false);
    useEffect(async () => {
        props.dispatch({type: INVENTORY_LIST_LOADING});
    
        const result = await loadInventoryItemsList(props.dispatch, props.loggedUser.email);
        if(result){
            const { inventoryItems, accesToken, refreshToken } = result;

        if(result.inventoryItems)
            props.dispatch({type: INVENTORY_LIST_SUCCES, payload: { inventoryItemsList: inventoryItems }});

        localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
        localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken);
        }
     }, []);


     const handleOpenAddItemFormButton= () => { 
        setRenderAddItem(true)
     }

     const handleCloseAddItemFormButton = () => {
        setRenderAddItem(false)
     }

     
    
      return ReactDom.createPortal (
        <div className="inventory-item-list-container">
            {
                props.inventoryItemListLoading ? <p>Loading...</p> : null
            }
            {
                props.inventoryItemsList.length === 0 ? <p>Inventory is empty</p> : null
            }
            {
                props.isInventoryItemsListRetrieved ? props.inventoryItemsList.map(item => <InventoryItemComponent setRenderEditForm={setRenderEditForm}  item = {item} key = {item.InventoryItemId}/>) 
                    : <p>Could not retrieve inventory list</p>
            }
            {
                renderAddItem ? <AddInventoryForm closeForm= {handleCloseAddItemFormButton}/> : null
            }
            {
                renderAddItem || renderEditForm ? null : <Button className="btn-add-ivtitem" variant="outline-dark" onClick={handleOpenAddItemFormButton} >Add item</Button>
            }
        </div>,
         document.getElementById("add-inventory-item-form")
    );
}

const mapStateToProps = (state) => ({
    inventoryItemsList: state.inventoryState.inventoryItemsList,
    inventoryItemListLoading: state.inventoryState.inventoryItemListLoading,
    inventoryItemListError: state.inventoryState.inventoryItemListError,
    isInventoryItemsListRetrieved: state.inventoryState.isInventoryItemsListRetrieved,
    renderItemForm: state.inventoryState.renderItemForm,
    inventoryItemCreated: state.inventoryState.inventoryItemCreated,
    inventoryItemCreateValidationErrors: state.inventoryState.inventoryItemCreateValidationErrors,
    inventoryItemCreateError: state.inventoryState.inventoryItemCreateError,
    loggedUser: state.login.loggedUser
})


export default connect(mapStateToProps)(RestaurantInventoryComponent)
