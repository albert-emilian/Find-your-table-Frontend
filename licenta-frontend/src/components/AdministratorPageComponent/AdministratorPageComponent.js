import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signOut } from '../../actions/authActions'

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
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(AdministratorPageComponent);

