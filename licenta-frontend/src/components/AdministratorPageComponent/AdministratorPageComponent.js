import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signOut } from '../../actions/authActions';
import RestaurantFormComponent from '../RestaurantFormComponent/RestaurantFormComponent'

export const AdministratorPageComponent = (props) => {

    const history = useHistory();


    const handleSignOutClick = async (evt) => {
        evt.preventDefault();
        const entity = window.location.pathname.split('/')[1];
        await signOut(entity,props.dispatch,history)
    }

    return (
        <div>
            AdministratorPage
            <button name="signOutButton" onClick={handleSignOutClick}>Sign out</button>
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <RestaurantFormComponent></RestaurantFormComponent>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(AdministratorPageComponent);

