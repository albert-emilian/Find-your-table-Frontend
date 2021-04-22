import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { 
    INVENTORY_LIST_LOADING,
    INVENTORY_LIST_SUCCES
} from '../../../../actiontypes/index';
import { loadInventoryItemsList } from '../../../../actions/inventoryActions';
import InventoryItemComponent from '../InventoryItemComponent/InventoryItemComponent'
import AddInventoryForm from '../AddInventoryItemForm/AddInventoryItemForm'
import {
    REFRESH_TOKEN,
    ACCESS_TOKEN
} from '../../../../helpers/constants'
 

export const RestaurantInventoryComponent = (props) => {

    const [renderAddItem, setRenderAddItem] = useState(false);

    useEffect(async () => {
        props.dispatch({type: INVENTORY_LIST_LOADING});
    
        const result = await loadInventoryItemsList(props.dispatch, props.loggedUser.email);
        if(result){
            const { inventoryItems, accesToken, refreshToken } = result;

        if(result.inventoryItems)
            props.dispatch({type: INVENTORY_LIST_SUCCES, payload: { inventoryItemsList: inventoryItems }});

        localStorage.setItem(ACCESS_TOKEN,accesToken);
        localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
     }, []);


     const handleOpenAddItemFormButton= () => { 
        setRenderAddItem(true)
     }

     const handleCloseAddItemFormButton = () => {
        setRenderAddItem(false)
     }

     
    
    return (
        <div className="inventory-item-list-container">
            {
                props.inventoryItemListLoading ? <p>Loading...</p> : null
            }
            {
                props.inventoryItemsList.length === 0 ? <p>Inventory is empty</p> : null
            }
            {
                props.isInventoryItemsListRetrieved ? props.inventoryItemsList.map(item => <InventoryItemComponent item = {item} key = {item.InventoryItemId}/>) 
                    : <p>Could not retrieve inventory list</p>
            }
            {
                renderAddItem ? <AddInventoryForm closeForm= {handleCloseAddItemFormButton}/> : null
            }
            <button onClick={handleOpenAddItemFormButton} >Add item</button>
        </div>
    )
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
