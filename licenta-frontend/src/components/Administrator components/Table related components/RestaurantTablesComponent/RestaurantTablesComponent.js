import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {
    RESTAURANT_TABLE_LIST_LOADING,
    RESTAURANT_TABLE_LIST_SUCCESS
} from '../../../../actiontypes/index';
import {
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants';
import { loadTableList } from '../../../../actions/tablesActions';
import LoadingComponent from '../../../LoadingComponent/LoadingComponent';
import TableComponent from '../TableComponent/TableComponent';
import AddTableForm from '../AddTableForm/AddTableForm'
import {Button} from 'react-bootstrap'
import "./RestaurantTableComponent.css"


const RestaurantTablesComponent = (props) => {

    const [renderAddTableForm, setRenderAddTableForm] = useState(false);

    useEffect(async () => {

        props.dispatch({type: RESTAURANT_TABLE_LIST_LOADING});

        const entity = window.location.pathname.split('/')[1];
        const result = await loadTableList(props.loggedUser.email,entity, props.dispatch);
       
        if(result){
        const { tableList, accesToken, refreshToken } = result;

        if(result.tableList)
            props.dispatch({type: RESTAURANT_TABLE_LIST_SUCCESS, payload: { tableList: tableList }});

       localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
       localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken);
        }
    }, [])

    const handleOpenAddTableForm = () => {
        setRenderAddTableForm(true);
    }

    const handleCloseAddTableForm = () => {
        setRenderAddTableForm(false);
    }

    return (
        <div className="restaurant-tables">
        <div className="table-list-container">
            {
                props?.tableList.length > 0  ? props?.tableList.map((table) => <TableComponent  table = {table} key = {table.TableId}/>) : <p>There are no existing tables.</p>
            }
            
        </div>
            
            {
                props.tableListLoading ? <LoadingComponent/> : null
            }
            {
                props.tableListError.isError ? <p>{props.tableListError.errorMessage}</p> : null
            }
            {
                renderAddTableForm ? <AddTableForm closeForm={handleCloseAddTableForm}/> : null
            }
           
            <Button className="button-add-table" variant="outline-dark" onClick={handleOpenAddTableForm}>Add table</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tableList: state.tablesState.tableList,
    tableListLoading: state.tablesState.tableListLoading,
    tableListError: state.tablesState.tableListError,
    loggedUser: state.login.loggedUser
})


export default connect(mapStateToProps)(RestaurantTablesComponent)
