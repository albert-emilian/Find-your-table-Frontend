import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signOut } from '../../../actions/authActions'
import NavBarComponent from '../../NavBarComponent/NavBarComponent'
import OrderComponent from '../Order related components/OrderComponent/OrderComponent'
import MenuComponent from '../Menu related components/MenuComponent/MenuComponent'


const ReservationComponent = (props) => {

    const history = useHistory();

    const handleSignOutClick = async() => {
        
        const entity = window.location.pathname.split('/')[1];
        await signOut(entity,props.dispatch,history)
    }



    return (
        <div>
             <NavBarComponent signOutCustomer={handleSignOutClick}/>
            <div>
            <OrderComponent/>
            </div>
            <div>
            <MenuComponent/>
            </div>
        </div>
    )
}

/*
1. OrderComponent (unde adaug itemele se calculeaza totalul si se merge spre plata)
2. MenuComponent (iau toate itemele din inventar si le vad)

*/

const mapStateToProps = (state) => ({
    foundReservation: state.reservationState.foundReservation,
    order: state.reservationState.order,
    menu: state.reservationState.menu,
    existingReservationError: state.reservationState.existingReservationError
});


export default connect(mapStateToProps)(ReservationComponent)
