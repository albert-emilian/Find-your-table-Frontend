import React from 'react';
import './TwoFactorAuthComponent.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { twoFactorValidation } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import { 
    HIDE_TWO_FACTOR_FORM,
    LOGIN_SUCCESS
} from '../../actiontypes/index'

 function TwoFactorAuthComponent(props) {

    const history = useHistory();

        history.listen(() => {
          if (history.action === 'POP' && (window.location.pathname === "/login/customer" 
                                            || window.location.pathname === "/login/administrator")) {
                   props.dispatch({type:HIDE_TWO_FACTOR_FORM }) ;
          }
        });

    const [code, setCode] = useState({
        code: ""
    });

    const handleOnChange = (evt) => {
        setCode({
            [evt.target.name]: evt.target.value
        });
    }

    const handleSignInButton = async () => {
        
        const entity = window.location.pathname.split('/')[2];
        const data = await twoFactorValidation(props.userId, Object.values(code)[0], entity, props.dispatch);

       

       if(!data) return;

        props.dispatch({type: LOGIN_SUCCESS, payload: {
            loggedUser: {
                email: data.loggedUser.Email,
                firstName: data.loggedUser.FirstName,
                lastName: data.loggedUser.LastName,
                role: data.loggedUser.Role,
                
            },
            accesToken: data.accesToken,
            refreshToken: data.refreshToken
        }})
        
        history.push(`/${entity}/page`);
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
                <div>
                    {
                        props.twoFactorLoginValidationError ? 
                            <p>{props.twoFactorLoginValidationError}</p> : null
                    }
                </div>
            </div>
            </div>
        </div>  
    )
}

const mapStateToProps = (state) =>({
    userId: state.login.userId, 
    twoFactorLoginValidationError: state.login.twoFactorLoginValidationError,
    loggedIn: state.login.loggedIn
   
})

export default connect(mapStateToProps)(TwoFactorAuthComponent);