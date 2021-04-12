import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ADD_INVENTORY_ITEM_SUCCESS } from '../../../../actiontypes/index'
import { 
    DESCRIPTION,
    UNIT_PRICE,
    QUANTITY,
    NAME,
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../../../helpers/constants'
import { addInventoryItem } from '../../../../actions/inventoryActions'
import "./AddInventoryItemForm.css"

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

        
        const { accesToken, refreshToken, inventoryItemsList  } = result;

        if(result.inventoryItemsList){
            props.dispatch({type: ADD_INVENTORY_ITEM_SUCCESS, payload: { inventoryItemsList: inventoryItemsList}});

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

        <div className='add-item-form'>  
        <div className='add-item-form-inner'> 
        <div>
         <label>
             Name
             <input type="text" name="name" onChange={handleChange}></input>
         </label>  
         <div className="input-error">{renderError(props.addInventoryItemsValidationErrors,NAME) }</div>
         </div> 
         <div>
         <label >
             Description
             <textarea type="text" name="description" onChange={handleChange}></textarea>
         </label>  
         <div className="input-error">{renderError(props.addInventoryItemsValidationErrors,DESCRIPTION) }</div>
         </div>
         <div>
         <label >
             Unit price
             <input type="text" name="unitprice" onChange={handleChange}></input>
         </label>  
         <div className="input-error">{renderError(props.addInventoryItemsValidationErrors,UNIT_PRICE) }</div>
         </div>
         <div>
         <label >
             Quantity
             <input type="text" name="quantity" onChange={handleChange}></input>
         </label>  
         <div className="input-error">{renderError(props.addInventoryItemsValidationErrors,QUANTITY) }</div>
         </div>
               <div className='close-add-item-form'>
               <button  onClick={handleCloseButton}>Close</button>  
               <button onClick={handleSaveButton}>Save</button>
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
