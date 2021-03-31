import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import ReactScrollableList from 'react-scrollable-list'
import axios from 'axios';
import RestaurantListItemComponent from '../RestaurantListItemComponent/RestaurantListItemComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import RestaurantListComponent from '../RestaurantListComponent/RestaurantListComponent'
import './CustomerPageComponent.css'
import { 
    CUSTOMER_LOCATION_LOADING,
    CUSTOMER_LOCATION_SUCCES,
    RESTAURANT_LOGOUT_CLEAR } from '../../actiontypes/index'
import NavBarComponent from '../NavBarComponent/NavBarComponent';
import { Navbar } from 'react-bootstrap';

export const CustomerPageComponent = (props) => {

    const history = useHistory();

    useEffect(() => {
        console.log({loggedUser:props.loggedUser,userId: props.userId})
        props.dispatch({type: RESTAURANT_LOGOUT_CLEAR});
        navigator.geolocation.getCurrentPosition(async (position)=> {
            props.dispatch({type: CUSTOMER_LOCATION_LOADING});
            const result = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.c0fd92606b4349cf283680e3cb8b6b11&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
            if(result)
                props.dispatch({type: CUSTOMER_LOCATION_SUCCES, payload: {
                    customerLocation: {
                        city: result.data.address.city,
                        county: result.data.address.county
                    }
                }});
          }, (error)=>{console.error(error)});
      }, []);

    const handleSignOutClick = async() => {
        
        const entity = window.location.pathname.split('/')[1];
        await signOut(entity,props.dispatch,history)
    }


    return (
        <div className="container-customer-page">
             <NavBarComponent signOutCustomer={handleSignOutClick}/>
            {
                props.customerLocationLoading ? <LoadingComponent/> : <RestaurantListComponent/>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    customerLocation: state.customerState.customerLocation,
    customerLocationLoading: state.customerState.customerLocationLoading,
    restaurantsRetrievedByCustomerLocationCityList: state.restaurantState.restaurantsRetrievedByCustomerLocationCityList,
    loggedUser: state.login.loggedUser,
    userId: state.login.userId

})

export default connect(mapStateToProps)(CustomerPageComponent)
