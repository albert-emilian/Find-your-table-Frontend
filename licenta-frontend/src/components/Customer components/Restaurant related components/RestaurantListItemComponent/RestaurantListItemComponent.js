import React, { useState } from 'react'
import { FaBeer } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import { SELECTED_RESTAURANT } from '../../../../actiontypes/index'
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux'
import RestaurantComponent from '../RestaurantComponent/RestaurantComponent'


function RestaurantListItemComponent(props) {

    const history = useHistory();

   const handleClick = () => {
      
    props.dispatch({type: SELECTED_RESTAURANT, payload:{restaurant: props.restaurant}});
    history.push(`/customer/page/restaurant`);

   }

    return (
        <div>
       
            <div>{props.restaurant.Name}</div>
            <FaBeer />
            <div>
            <Nav className="mr-auto">
                <Nav.Link onClick={handleClick}>Check it out!</Nav.Link>
            </Nav>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(RestaurantListItemComponent);