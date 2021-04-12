import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { 
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../../../helpers/constants'
import { 
    SELECTED_TABLE_RESERVATION,
    CREATE_RESERVATION_SUCCESS,
    CREATE_RESERVATION_LOADING,
    CREATE_DEFAULT_ORDER
} from '../../../../actiontypes/index';
import TimePicker from 'react-bootstrap-time-picker';
import {createReservation} from '../../../../actions/reservationActions'



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
    
    console.log(props.loggedUser)
    console.log(reservation)
    
    const result = await createReservation(reservation, props.dispatch, email, TableId);
        
        if(result){

        const {accesToken, refreshToken, order, menu} = result;

        props.dispatch({type: CREATE_RESERVATION_SUCCESS, payload: {
            order: order,
            menu: menu
        }});
        props.dispatch({type: SELECTED_TABLE_RESERVATION, payload:{table: props.table}});
        history.push(`/customer/page/restaurant/reservation`);

        localStorage.setItem(ACCESS_TOKEN,accesToken);
        localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
       
    }

    return (
        <div>
            <div>
                <button onClick={handleRenderCreateReservationForm}>Reserve</button>
              {
              renderCreateReservation ?  
              <div className="form-create-reservation">
                    <label>
                    Number of persons
                    <input type="number" name="numberOfPersons" min="1" max="20" onChange={handleChange}></input>
                    {
                    validationError.isError ? <p>{validationError.message}</p> : null
                    }
                    </label>  
                    <label>
                        Reservation Hour
                        <TimePicker value={reservation.reservationHour}  start="10:00" end="21:00" step={15} onChange={handleTimeChange} />
                    </label>
                    <button onClick={handleCreateReservation}>Create reservation</button>
                    <button onClick={handleCloseCreateReservationForm}>Close</button>
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
