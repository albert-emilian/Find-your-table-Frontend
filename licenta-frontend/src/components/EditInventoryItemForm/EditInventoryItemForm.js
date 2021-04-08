import React, { useState } from 'react'
import { connect } from 'react-redux'
import { UPDATE_INVENTORY_ITEM_SUCCESS } from '../../actiontypes/index'
import { 
    DESCRIPTION,
    UNIT_PRICE,
    QUANTITY,
    NAME,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from '../../helpers/constants'
import { updateInventoryItem } from '../../actions/inventoryActions'
import "./EditInventoryItemForm.css"

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

            localStorage.setItem(ACCESS_TOKEN, accesToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken)
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
        <div>
         <label>
             Name
             <input type="text" name="name" defaultValue={Name} onChange={handleChange}></input>
         </label>  
         <div className="input-error">{renderError(props.updateInventoryItemsValidationErrors,NAME) }</div>
         </div> 
         <div>
         <label >
             Description
             <textarea type="text" name="description" defaultValue={Description} onChange={handleChange}></textarea>
         </label>  
         <div className="input-error">{renderError(props.updateInventoryItemsValidationErrors,DESCRIPTION) }</div>
         </div>
         <div>
         <label >
             Unit price
             <input type="text" name="unitprice" defaultValue={UnitPrice} onChange={handleChange}></input>
         </label>  
         <div className="input-error">{renderError(props.updateInventoryItemsValidationErrors,UNIT_PRICE) }</div>
         </div>
         <div>
         <label >
             Quantity
             <input type="text" name="quantity" defaultValue={InventoryQuantity} onChange={handleChange}></input>
         </label>  
         <div className="input-error">{renderError(props.updateInventoryItemsValidationErrors,QUANTITY) }</div>
         </div>
               <div className='close-edit-item-form'>
               <button  onClick={handleCloseButton}>Close</button>  
               <button onClick={handleSaveButton}>Save</button>
               </div>
        </div>  
       </div>  
    )
}

const mapStateToProps = (state) => ({
    updateInventoryItemsValidationErrors: state.inventoryState.updateInventoryItemsValidationErrors,
})

export default connect(mapStateToProps)(EditInventoryItemForm)
