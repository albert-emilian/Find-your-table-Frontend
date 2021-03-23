import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
export const CustomerPageComponent = (props) => {

    const history = useHistory();

    const handleSignOutClick = async(evt) => {
        evt.preventDefault();
        
        const entity = window.location.pathname.split('/')[1];
        await signOut(entity,props.dispatch,history)
    }

    return (
        <div>
            CUSTOMER PAGE
            <button name="signOutButton" onClick={handleSignOutClick}>Sign out</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(CustomerPageComponent)
