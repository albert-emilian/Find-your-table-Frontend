import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    DELETE_RESTAURANT_TABLE_SUCCESS,
    RESERVATIONS_TABLE_LIST_SUCCESS,
    RESERVATIONS_TABLE_LIST_CLEAR,
} from '../../../../actiontypes/index';
import {
    ACCESS_TOKEN_ADMINISTRATOR,
    REFRESH_TOKEN_ADMINISTRATOR
} from '../../../../helpers/constants';
import { deleteRestaurantTable } from '../../../../actions/tablesActions'
import { loadReservationsList } from '../../../../actions/reservationActions'
import EditTableForm from '../EditTableForm/EditTableForm'
import ReservationsListComponent from '../../Reservation related components/ReservationsListComponent/ReservationsListComponent'
import "./TableComponent.css"
import {Button} from "react-bootstrap"

function TableComponent(props) {

    const [renderEditForm,setRenderEditForm] = useState(false);

    const [renderReservations, setRenderReservations] = useState(false);

    const {TableId , TableSize, Reserved, TableName} = props.table;

    const handleDeleteButton = async () => {

        const result = await deleteRestaurantTable(TableId, props.dispatch);

        const { accesToken, refreshToken } = result;

        const tableById = (element) => element.TableId === TableId;
        const index = props.tableList.findIndex(tableById)
        
        props.dispatch({type: DELETE_RESTAURANT_TABLE_SUCCESS, payload: { index: index }});

        
        localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
        localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken);    
    };

    const handleEditButton = ()  => {
        setRenderEditForm(true);
    }

    const closeEditForm = () => {
        setRenderEditForm(false);
    }

    const handleReservations =  async () => {
            setRenderReservations(true);
            const result = await loadReservationsList(TableId, props.dispatch);
    
            if(result){
        
                const { accesToken, refreshToken, reservationsList } = result;
        
                props.dispatch({type: RESERVATIONS_TABLE_LIST_SUCCESS, payload: { reservationsList: reservationsList }});
            
                localStorage.setItem(ACCESS_TOKEN_ADMINISTRATOR,accesToken);
                localStorage.setItem(REFRESH_TOKEN_ADMINISTRATOR,refreshToken);  
                console.log("aa")
            }
    }

    const closeReservationsList = ()  => {
        setRenderReservations(false);

        props.dispatch({type:RESERVATIONS_TABLE_LIST_CLEAR});
    }


    return (
        <div className="table-container">
            <label className="table-label-info">
                Table 🍽: { <span id="table-label-info-content-name">{TableName}</span> }
            </label>
            <label  className="table-label-info">
                Table size 👨‍👩‍👧: { <span id="table-label-info-content-size">{TableSize}</span>}
            </label>
            <div>
            <Button className="button-table" variant="outline-dark" onClick={handleDeleteButton}>Delete</Button>
            <Button className="button-table" variant="outline-dark" onClick={handleEditButton}>Edit</Button>
            <Button className="button-table" variant="outline-dark" onClick = {handleReservations}>Reservations</Button>
            </div>
            <div>
            {
                renderEditForm ? <EditTableForm closeForm={closeEditForm} table={props.table}/> : null
            }
            </div>

            <div>
            {
                renderReservations ? <ReservationsListComponent closeReservationsList={closeReservationsList } render={renderReservations} TableId={TableId} key={TableId} /> : null
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tableList: state.tablesState.tableList,
    reservationsList: state.reservationState.reservationsList,
    isReservationsListRetrieved: state.reservationState.isReservationsListRetrieved,
    reservationsListLoading: state.reservationState.reservationsListLoading
});

export default connect(mapStateToProps)(TableComponent);