import React, { useState } from 'react'
import { connect } from 'react-redux'
import { UPDATE_INVENTORY_ITEM_SUCCESS } from '../../../../actiontypes/index'
import { 
    DESCRIPTION,
    UNIT_PRICE,
    QUANTITY,
    NAME,
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR,
} from '../../../../helpers/constants'
import { updateInventoryItem } from '../../../../actions/inventoryActions'
import "./EditInventoryItemForm.css"
import { Button } from 'react-bootstrap'

export const EditInventoryItemForm = (props) => {

    const {Name, Description, UnitPrice, InventoryQuantity, InventoryItemId} = props.item;

    const [item,setItem] = useState({
        name: Name,
        description: Description,
        unitprice: UnitPrice,
        quantity: InventoryQuantity
    });

    const handleChange = (evt) => {
        setItem({
            ...item,
            [evt.target.name]: evt.target.value
        });
    }

    const handleCloseButton = () => {
        props.closeEditForm();
    }

    const handleSaveButton = async () => {

        const result = await updateInventoryItem(item, InventoryItemId, props.dispatch);
        
       const { accesToken, refreshToken, updatedItem  } = result;

        if(result.updatedItem){
            props.dispatch({type: UPDATE_INVENTORY_ITEM_SUCCESS, payload: { updatedItem: updatedItem}});

            localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR, accesToken);
            localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken)
        }
    }
    

    function renderError(errorsArray, inputName){
        const error = errorsArray.filter(error => (error.message && error.inputName === inputName))[0]
        if(error?.message)
          return error.message;
            return null
      }


    return (

        <div className='edit-item-form'>  
        <div className='edit-item-form-inner'> 
        <h3 className="edit-item-form-title">Complete the fields with information about the item that you want to change!😊</h3>
        <div className="edit-item-form-inputs">
         <label>
             Name
             <input className="form-control edit-item-form-input-name " type="text" name="name" defaultValue={Name} onChange={handleChange}></input>
             <p className="edit-input-error">{renderError(props.updateInventoryItemsValidationErrors,NAME)}</p>
         </label>  
         </div> 
         <div className="edit-item-form-inputs">
         <label >
             Unit price
             <input className="form-control edit-item-form-input-price " type="text" name="unitprice" defaultValue={UnitPrice} onChange={handleChange}></input>
             <p className="edit-input-error">{renderError(props.updateInventoryItemsValidationErrors,UNIT_PRICE)}</p>
         </label>  
         </div>
         <div className="edit-item-form-inputs">
         <label >
             Quantity
             <input className="form-control edit-item-form-input-quantity " type="text" name="quantity" defaultValue={InventoryQuantity} onChange={handleChange}></input>
             <p className="edit-input-error">{renderError(props.updateInventoryItemsValidationErrors,QUANTITY)}</p>
         </label>  
         </div>
         <div className="edit-item-form-inputs">
         <label >
             Description
             <p className="edit-input-error">{renderError(props.updateInventoryItemsValidationErrors,DESCRIPTION)}</p>
             <textarea className="form-control edit-item-form-input-description " type="text" name="description" defaultValue={Description} onChange={handleChange}></textarea>
         </label>  
         </div>
               <div className='close-edit-item-form'>
               <Button variant="outline-dark"  onClick={handleCloseButton}>Close</Button>  
               <Button  variant="outline-dark" onClick={handleSaveButton}>Save</Button>
               </div>
        </div>  
       </div>  
    )
}

const mapStateToProps = (state) => ({
    updateInventoryItemsValidationErrors: state.inventoryState.updateInventoryItemsValidationErrors,
})

export default connect(mapStateToProps)(EditInventoryItemForm)
