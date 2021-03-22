import React from 'react';
import './TwoFactorAuthComponent.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { twoFactorValidation } from '../../actions/authActions';


 function TwoFactorAuthComponent(props) {

    const [code, setCode] = useState({
        code: ""
    });

    const handleOnChange = (evt) => {
        setCode({
            [evt.target.name]: evt.target.value
        });
    }

    const handleSignInButton = () => {
        
        const entity = window.location.pathname.split('/')[2];
        twoFactorValidation(props.userId, code, entity);
    }

    return (
        <div className='popup-two-factor-auth'>  
            <div className='popup-two-factor-auth-inner'>  
            <h3 className='popup-two-factor-auth-title'>Enter the code from Google Authenticator</h3>  
            <div className='popup-two-factor-form'>
                <label>
                    <input name="code" type="text" onChange={handleOnChange}></input>
                </label>
                <button onClick={handleSignInButton}>Sign in</button>  
            </div>
              {console.log(props.userId)}
            </div>
        </div>  
    )
}

const mapStateToProps = (state) =>({
    userId: state.login.userId
})

export default connect(mapStateToProps)(TwoFactorAuthComponent);