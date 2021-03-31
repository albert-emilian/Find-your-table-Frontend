import React, { useState, useEffect } from 'react'
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBarComponent.css'

 const NavBarComponent = (props) => {

    const history = useHistory();

    const [entity,setEntity] = useState("")

    useEffect(()=> {
        setEntity(history.location.pathname.split("/")[1]);
    }, [])

    const handleClicklSignOut = () => {
        
        entity === "administrator" ? props.signOutAdministrator() : props.signOutCustomer();
    }

    return (
        <div>
        {
    entity === "administrator" ?
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Find your table!</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#restaurantinfo">Restaurant information</Nav.Link>
                <Nav.Link href="#inventory">Inventory</Nav.Link>
                <Nav.Link href="#tables">Tables</Nav.Link>
            </Nav>
            <Form id="button-navbar-container">
                <Button id="btn-navbar" bsStyle="primary" onClick={handleClicklSignOut} >Sign out</Button>
            </Form>
        </Navbar>
            :
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Find your table!</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#restaurants">Restaurants</Nav.Link>
                <Nav.Link href="#reservation">Reservation</Nav.Link>
                <Nav.Link href="#tables">Tables</Nav.Link>
            </Nav>
            <Form id="button-navbar-container">
                <Button id="btn-navbar" bsStyle="primary" onClick={handleClicklSignOut} >Sign out</Button>
            </Form>
        </Navbar>
        }
  
  
        </div>
    )
}



export default NavBarComponent;
