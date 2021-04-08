import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {
    RESTAURANT_TABLE_LIST_LOADING,
    RESTAURANT_TABLE_LIST_SUCCESS
} from '../../actiontypes/index';
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../helpers/constants';
import { loadTableList } from '../../actions/tablesActions';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import TableComponent from '../TableComponent/TableComponent';
import AddTableForm from '../AddTableForm/AddTableForm'
import ReservationsListComponent from '../ReservationsListComponent/ReservationsListComponent'

const RestaurantTablesComponent = (props) => {

    const [renderAddTableForm, setRenderAddTableForm] = useState(false);

    useEffect(async () => {

        props.dispatch({type: RESTAURANT_TABLE_LIST_LOADING});


        const result = await loadTableList(props.loggedUser.email, props.dispatch);
       
        if(result){
        const { tableList, accesToken, refreshToken } = result;

        if(result.tableList)
            props.dispatch({type: RESTAURANT_TABLE_LIST_SUCCESS, payload: { tableList: tableList }});

       localStorage.setItem(ACCESS_TOKEN,accesToken);
       localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
    }, [])

    const handleOpenAddTableForm = () => {
        setRenderAddTableForm(true);
    }

    const handleCloseAddTableForm = () => {
        setRenderAddTableForm(false);
    }

    return (
        <div>
        <div>
            {
                props?.tableList.length > 0  ? props?.tableList.map((table) => <TableComponent table = {table} key = {table.TableId}/>) : <p>There are no existing tables.</p>
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
           
            <button onClick={handleOpenAddTableForm}>Add table</button>
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
