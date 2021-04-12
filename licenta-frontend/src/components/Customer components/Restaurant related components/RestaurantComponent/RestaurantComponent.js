import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NavBarComponent from '../../../NavBarComponent/NavBarComponent'
import {signOut} from '../../../../actions/authActions';
import { useHistory } from "react-router-dom";
import { loadTableList } from "../../../../actions/tablesActions";
import LoadingComponent from '../../../LoadingComponent/LoadingComponent';
import CustomerTableComponent from '../CustomerTablesComponent/CustomerTablesComponent'
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '.././../../../helpers/constants';
import { 
    RESTAURANT_TABLE_LIST_LOADING,
    RESTAURANT_TABLE_LIST_SUCCESS
} from '../../../../actiontypes/index'
import './RestaurantComponent.css'

export const RestaurantComponent = (props) => {
    
    const history = useHistory();

    const {Name, City, County, Phone, Description, Email, Theme} = props.restaurant;

    useEffect(async () => {

        props.dispatch({type: RESTAURANT_TABLE_LIST_LOADING});

        const entity = window.location.pathname.split('/')[1];
        console.log(entity);
        const result = await loadTableList(Email,entity, props.dispatch);
       
        if(result){
        const { tableList, accesToken, refreshToken } = result;
       
        props.dispatch({type: RESTAURANT_TABLE_LIST_SUCCESS, payload: { tableList: tableList }});

       localStorage.setItem(ACCESS_TOKEN,accesToken);
       localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }

        console.log(props)
    }, []);


    const handleSignOutClick = async() => {
        
        const entity = window.location.pathname.split('/')[1];
        await signOut(entity,props.dispatch,history)
    }
    
    return (
        <div>
          <NavBarComponent signOutCustomer={handleSignOutClick}/>
            Restaurant
            <div className="restaurant-info-container">
                <h1 className="restaurant-title">{Name}</h1>
                    <h4 className="restaurant-description">{Theme}</h4>
                    <h4 className="restaurant-description">{Description}</h4>
                <div className="restaurant-info">
                    <p>{County}</p>
                    <p>{City}</p>
                    <p>{Phone}</p>
                    <p>{Email}</p>
                </div>
                <div className="restaurant-list-loading">
                    {
                        props.tableListLoading ? <LoadingComponent/> : null
                    }
                </div>
                <div className="restaurant-tables-list">
                    {
                        props.isTableListRetrieved ? props.tableList.filter(table => table.Reserved === false).map(table =>  <CustomerTableComponent table={table} key={table.TableId}/>) : null
                    }
                    {
                        props.isTableListRetrieved ? props.tableList.length === 0 : <h4>"The restaurant did not expose any of it`s tables."</h4>
                    }
                </div>          
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    restaurant: state.customerPageState.restaurant,
    tableList: state.tablesState.tableList,
    isTableListRetrieved: state.tablesState.isTableListRetrieved,
    tableListError: state.tablesState.tableListError,
    tableListLoading: state.tablesState.tableListLoading
})

export default connect(mapStateToProps)(RestaurantComponent)
