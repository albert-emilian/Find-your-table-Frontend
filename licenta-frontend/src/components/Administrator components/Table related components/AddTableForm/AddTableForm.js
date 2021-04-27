import React, { useState} from 'react';
import { connect } from 'react-redux';
import {
    CREATE_RESTAURANT_TABLE_SUCCESS
} from '../../../../actiontypes/index';
import {
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR,
    TABLE_SIZE
} from '../../../../helpers/constants'
import { addTable } from '../../../../actions/tablesActions'
import {Button} from 'react-bootstrap'
import './AddTableForm.css'


export const AddTableForm = (props) => {
  
    const [table,setTable] = useState({
       tableSize: "",
       tableName: ""
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

        const result = await addTable(table, props.loggedUser.email, props.dispatch);

        if(result.tableList){ 
            const { accesToken, refreshToken, tableList  } = result;

            if(result.tableList){
                props.dispatch({type: CREATE_RESTAURANT_TABLE_SUCCESS, payload: { tableList: tableList}});
    
                localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR, accesToken);
                localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken)
            }
        }
       
    }

    return (
        <div className='add-table-form'>  
        <div className='add-table-form-inner'> 
        <h3 className="add-table-form-title">Add a table!😊</h3>
         <div className="add-table-form-inner-inputs">
         <label>
             Table size
             <input id="add-table-form-input-number" className="form-control" type="number" name="tableSize" min="1" max="100" onChange={handleChange}></input>
         </label>  
         <label>
             <span id="add-table-form-input-name-label">Table name</span>
             <input id="add-table-form-input-name" className="form-control" type="text" name="tableName" onChange={handleChange}></input>
         </label>  
         </div>
               <div  className="btn-add-table">
               <Button id="btn-add-table-close" variant="outline-dark" onClick={handleCloseButton}>Close</Button>  
               <Button  id="btn-add-table-save" variant="outline-dark" onClick={handleSaveButton}>Save</Button>
               </div>
        </div>  
       </div>  
    )
}

const mapStateToProps = (state) => ({
    loggedUser: state.login.loggedUser,
    tableList: state.tablesState.tableList
})

export default connect(mapStateToProps)(AddTableForm)
