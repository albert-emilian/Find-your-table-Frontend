import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { 
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../../../../helpers/constants'
import { 
    SELECTED_TABLE_RESERVATION,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_LOADING,
    CREATE_DEFAULT_ORDER
} from '../../../../actiontypes/index';
import TimePicker from 'react-bootstrap-time-picker';
import {createReservation} from '../../../../actions/reservationActions'
import CustomerReservationTableComponent from '../CustomerReservationTableComponent/CustomerReservationTableComponent'
import './CustomerTablesComponent.css'
import {Button} from 'react-bootstrap'


export const CustomerTablesComponent = (props) => {

    const {TableId, TableName, Reserved, TableSize, restaurantId} = props.table;

    const [reservation,setReservation] = useState({
        numberOfPersons: 0,
        reservationHour: ""
    });

    const [validationError, setValidationError] = useState({
        isError: false,
        message: ""
    })

    const [renderCreateReservation, setRenderCreateReservation] = useState(false);

    const history = useHistory();

    const handleChange = (evt) => {
        setReservation({
            ...reservation,
            [evt.target.name]: evt.target.value
        });
    }

    const handleTimeChange = (time) => {

        const hour = Math.floor(time / 3600);
        const minute = time / 3600 % 1 * 60;

        const reservationHour = minute === 0 ? hour+""+ ":"+minute+""+"0" : hour+""+ ":"+minute+"";

        setReservation({ 
            ...reservation,
            reservationHour: reservationHour
        });
      }

    const handleRenderCreateReservationForm = () => {
        setRenderCreateReservation(true);
    }

    const handleCloseCreateReservationForm = () => {
        setRenderCreateReservation(false);
    }

    const handleCreateReservation = async () => {
        setValidationError({
            isError: false,
            message: ""
        });

    if(reservation.numberOfPersons > TableSize){
       
        setValidationError({
            isError: true,
            message: "Number of persons exceeds table capacity"
        });

        return;
    }

    props.dispatch({type: CREATE_RESERVATION_LOADING});

    const { email } = props.loggedUser;
   
    
    const result = await createReservation(reservation, props.dispatch, email, TableId);
        
        if(result){

        const {accesToken, refreshToken, order, menu, reservation} = result;

        props.dispatch({type: CREATE_RESERVATION_SUCCESS, payload: {
            reservation: reservation,
            order: order,
            menu: menu
        }});
        props.dispatch({type: SELECTED_TABLE_RESERVATION, payload:{table: props.table}});
        history.push(`/customer/page/restaurant/reservation`);

        localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
        localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken);
        }
       
    }

    return (
        <div>
            <div className="table-item">

                <div className="table-info">
                    <div className="table-details">Table : {TableName}</div>
                    <div className="table-details">Size 🪑: {TableSize}</div>
                </div>
              { 
                renderCreateReservation ? null : <Button className="reservation-btn-reserve" variant="outline-dark" onClick={handleRenderCreateReservationForm}>Reserve</Button>
              }  
              {
              renderCreateReservation ?  
              <div className="form-create-reservation">
                    
                    <div className="reservation-create-inputs">
                        <label>
                        Number of persons
                        <div>
                        <input id="reservation-persons-number" className="form-control" type="number" name="numberOfPersons" min="1" max="20" onChange={handleChange}></input>
                        {
                        validationError.isError ? <p>{validationError.message}</p> : null
                        }
                        </div>
                        </label> 
                    </div> 
                    <div className="reservation-create-inputs">
                        Reservation Hour
                        <TimePicker id="reservation-time-picker" value={reservation.reservationHour}  start="8:00" end="21:00" step={15} onChange={handleTimeChange} />
                    </div>
                    <div>
                    <Button className="reservation-create-btn" variant="outline-dark" onClick={handleCreateReservation}>Create reservation</Button>
                    <Button className="reservation-create-btn" variant="outline-dark" onClick={handleCloseCreateReservationForm}>Close</Button>
                    </div>
                    <div>
                        <CustomerReservationTableComponent tableId={TableId}/>
                    </div>
                </div> : null
              }
               
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loggedUser: state.login.loggedUser
})

export default connect(mapStateToProps)(CustomerTablesComponent)
