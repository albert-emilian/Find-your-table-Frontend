import React, { useState } from 'react'
import { connect } from 'react-redux'
import { UPDATE_RESTAURANT_TABLE_SUCCESS } from '../../../../actiontypes/index';
import { 
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants'
import { updateRestaurantTable } from '../../../../actions/tablesActions';
import "./EditTableForm.css"
import {Button} from 'react-bootstrap';


export const EditTableForm = (props) => {

    const { TableId, TableSize, TableName} = props.table;

    const [table,setTable] = useState({
        tableId: TableId,
        tableSize: TableSize,
        tableName: TableName,
    });

    const handleChange = (evt) => {
        setTable({
            ...table,
            [evt.target.name]: evt.target.value
        });
    }

    const handleCloseButton = () => {
        props.closeForm();
    }

    const handleSaveButton = async () => {

        const result = await updateRestaurantTable(table,props.dispatch);

       
        if(result){ 
        const { accesToken, refreshToken, updatedItem  } = result;

        if(result.updatedItem){
            props.dispatch({type: UPDATE_RESTAURANT_TABLE_SUCCESS, payload: { updatedItem: updatedItem}});


            localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR, accesToken);
            localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken)
        }
        }
    }

    return (
        <div className='edit-table-form'>  
        <div className='edit-table-form-inner'> 
        <div className="edit-table-form-input">
         <label>
            <span>Table size </span> 
             <input className="form-control" id="edit-table-input-table-size"  type="number" name="tableSize" min="1" max="100" defaultValue={TableSize} onChange={handleChange}></input>
         </label>  
         <label>
             <span id="edit-table-input-table-name-label">Table name</span>
             <input className="form-control" id="edit-table-input-table-name" type="text" name="tableName"  defaultValue={TableName} onChange={handleChange}></input>
         </label>  
         </div>
               <div className='close-edit-table-form'>
               <Button className="btn-edit-table" variant="outline-dark" onClick={handleCloseButton}>Close</Button>  
               <Button className="btn-edit-table" variant="outline-dark" onClick={handleSaveButton}>Save</Button>
               </div>
        </div>  
       </div>  
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(EditTableForm)
