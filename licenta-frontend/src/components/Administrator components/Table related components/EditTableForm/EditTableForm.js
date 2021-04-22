import React, { useState } from 'react'
import { connect } from 'react-redux'
import { UPDATE_RESTAURANT_TABLE_SUCCESS } from '../../../../actiontypes/index';
import { 
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants'
import { updateRestaurantTable } from '../../../../actions/tablesActions';

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
        <div>
         <label>
             Table size
             <input type="number" name="tableSize" min="1" max="100" defaultValue={TableSize} onChange={handleChange}></input>
         </label>  
         </div> 
         <div>
         <label>
             Table name
             <input type="text" name="tableName"  defaultValue={TableName} onChange={handleChange}></input>
         </label>  
         </div> 
               <div className='close-edit-table-form'>
               <button  onClick={handleCloseButton}>Close</button>  
               <button onClick={handleSaveButton}>Save</button>
               </div>
        </div>  
       </div>  
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(EditTableForm)
