import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { 
    INVENTORY_LIST_LOADING,
    INVENTORY_LIST_SUCCES,
    INVENTORY_LIST_ERROR,
    RENDER_ITEM_FORM,
    CLOSE_ITEM_FORM,
    CREATE_ITEM_VALIDATION_ERRORS,
    CREATE_ITEM_ERROR,
    CREATE_ITEM_SUCCES
} from '../../actiontypes/index';
import { loadInventoryItemsList } from '../../actions/inventoryActions';
import InventoryItemComponent from '../InventoryItemComponent/InventoryItemComponent'

 

export const RestaurantInventoryComponent = (props) => {

    useEffect(async () => {
        props.dispatch({type: INVENTORY_LIST_LOADING});
    
        const result = await loadInventoryItemsList(props.dispatch, props.loggedUser.email);
        
        const { inventoryItems, accesToken, refreshToken } = result;

        if(result.inventoryItems)
            props.dispatch({type: INVENTORY_LIST_SUCCES, payload: { inventoryItemsList: inventoryItems }});

       localStorage.setItem("ACCES_TOKEN",accesToken);
       localStorage.setItem("REFRESH_TOKEN",refreshToken);

     }, []);


     
    
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
            <button onClick={handleAddItemButton} >Add item</button>
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
