import React, { useState } from 'react'
import { FaBeer } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import { SELECTED_RESTAURANT } from '../../../../actiontypes/index'
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux'
import './RestaurantListItemComponent.css'

function RestaurantListItemComponent(props) {

    const history = useHistory();

   const handleClick = () => {
      
    props.dispatch({type: SELECTED_RESTAURANT, payload:{restaurant: props.restaurant}});
    history.push(`/customer/page/restaurant`);

   }

    return (
        
        <div className="restaurant-item-container">
       {console.log(props)}
            <h4>{props.restaurant.Name}</h4>
            <div>
                Theme 👨‍🍳: {props.restaurant.Theme}
            </div>
            <div>
                Schedule ⌛️: {props.restaurant.StartingHour} - {props.restaurant.FinishingHour}
            </div>
            <div>
            <Nav className="mr-auto">
                <Nav.Link onClick={handleClick}>Check it out!👀</Nav.Link>
            </Nav>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(RestaurantListItemComponent);