import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ADD_INVENTORY_ITEM_SUCCESS } from '../../../../actiontypes/index'
import { 
    DESCRIPTION,
    UNIT_PRICE,
    QUANTITY,
    NAME,
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants'
import { addInventoryItem } from '../../../../actions/inventoryActions'
import "./AddInventoryItemForm.css"
import { Button } from 'react-bootstrap'

export const AddInventoryItemForm = (props) => {

    const [item,setItem] = useState({
        name: "",
        description: "",
        unitprice: "",
        quantity: ""
    });

    const handleChange = (evt) => {
        setItem({
            ...item,
            [evt.target.name]: evt.target.value
        });
    }

    const handleCloseButton = () => {
        props.closeForm();
    }

    const handleSaveButton = async () => {

        const result = await addInventoryItem(item, props.loggedUser.email, props.dispatch);

        if(result){
            const { accesToken, refreshToken, inventoryItemsList  } = result;

            if(result.inventoryItemsList){
                props.dispatch({type: ADD_INVENTORY_ITEM_SUCCESS, payload: { inventoryItemsList: inventoryItemsList}});
    
                localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR, accesToken);
                localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken)
            }
        }
    }
    

    function renderError(errorsArray, inputName){
        const error = errorsArray.filter(error => (error.message && error.inputName === inputName))[0]
        if(error?.message)
          return error.message;
            return null
      }


    return (

        <div className='add-item-form'>  
        <div className='add-item-form-inner'> 
        <h3 className="add-item-form-title">Complete the fields with information about the item that you want to add!😊</h3>
        <div className="add-item-form-inputs">
         <label className="add-item-form-label">
             Name
         </label>  
         <input className="add-item-form-input-name form-control" type="text" name="name" onChange={handleChange}></input>
         <p className="input-error">{renderError(props.addInventoryItemsValidationErrors,NAME)}</p>
         </div> 
         <div  className="add-item-form-inputs">
         <label className="add-item-form-label" >
             Unit price
         </label>  
         <input className="add-item-form-input-price form-control" type="text" name="unitprice" onChange={handleChange}></input>
         <p className="input-error">{renderError(props.addInventoryItemsValidationErrors,UNIT_PRICE)}</p>
         </div>
         <div  className="add-item-form-inputs">
         <label className="add-item-form-label" >
             Quantity
         </label>  
         <input className="add-item-form-input-quantity form-control" type="text" name="quantity" onChange={handleChange}></input>
         <p className="input-error">{renderError(props.addInventoryItemsValidationErrors,QUANTITY)}</p>
         </div>
         <div  className="add-item-form-inputs">
         <label className="add-item-form-label">
             Description
         </label>  
         <textarea className="add-item-form-input-description form-control" type="text" name="description" onChange={handleChange}></textarea>
         <p className="input-error">{renderError(props.addInventoryItemsValidationErrors,DESCRIPTION)}</p>
         </div>
         
               <div className='close-add-item-form'>
               <Button variant="outline-dark" onClick={handleCloseButton}>Close</Button>  
               <Button variant="outline-dark" onClick={handleSaveButton}>Save</Button>
               </div>
        </div>  
       </div>  
    )
}

const mapStateToProps = (state) => ({
    addInventoryItemsValidationErrors: state.inventoryState.addInventoryItemsValidationErrors,
    loggedUser: state.login.loggedUser
})

export default connect(mapStateToProps)(AddInventoryItemForm)
