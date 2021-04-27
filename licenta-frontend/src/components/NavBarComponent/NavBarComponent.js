import React, { useState, useEffect } from 'react'
import {Navbar, Nav, Form, Button, FormControl, Container} from 'react-bootstrap';
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
        <div className="container">
        <Navbar className="navbar" collapseOnSelect fixed="top" bg="dark" expand="sm"  variant="dark">
        <Navbar.Brand className="page-title" href="#home">Find your table!</Navbar.Brand>
        <Container className="navbar-container">
            <Navbar.Toggle className="toggle" aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse className="collapse-navbar" id="responsive-navbar-nav">
            <Nav className="link-containers">
                <Nav.Link className="nav-link" href="#restaurantinfo">Restaurant information</Nav.Link>
                <Nav.Link className="nav-link" href="#inventory">Inventory</Nav.Link>
                <Nav.Link className="nav-link" href="#tables">Tables</Nav.Link>
                <Nav.Link className="nav-link"  className="btn-signout" bsStyle="primary" onClick={handleClicklSignOut} >Sign out</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
            :
            <div className="container">
        <Navbar className="navbar" collapseOnSelect fixed="top" bg="dark" expand="sm"  variant="dark">
        <Navbar.Brand className="page-title" href="#home">Find your table!</Navbar.Brand>
        <Container className="navbar-container">
            <Navbar.Toggle className="toggle" aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse className="collapse-navbar" id="responsive-navbar-nav">
            <Nav className="link-containers">
                <Nav.Link className="nav-link"  className="btn-signout" bsStyle="primary" onClick={handleClicklSignOut} >Sign out</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
        }
  
  
        </div>
    )
}



export default NavBarComponent;
