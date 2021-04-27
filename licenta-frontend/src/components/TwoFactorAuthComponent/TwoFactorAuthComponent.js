import React from 'react';
import './TwoFactorAuthComponent.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { twoFactorValidation, lostVerification  } from '../../actions/authActions';
import { useHistory } from "react-router-dom";
import { 
    HIDE_TWO_FACTOR_FORM,
    LOGIN_SUCCESS,
    EXISTING_RESERVATION
} from '../../actiontypes/index'
import { verifiyExistingActiveReservation } from '../../actions/reservationActions'
import { Button } from 'react-bootstrap'


 function TwoFactorAuthComponent(props) {

    const [renderRecuperationMessage,setRenderRecuperationMessage] = useState(false);
    const [code, setCode] = useState({
        code: ""
    });

    const history = useHistory();

        history.listen(() => {
          if (history.action === 'POP' && (window.location.pathname === "/login/customer" 
                                            || window.location.pathname === "/login/administrator")) {
                   props.dispatch({type:HIDE_TWO_FACTOR_FORM }) ;
          }
        });

   

    const handleOnChange = (evt) => {
        setCode({
            [evt.target.name]: evt.target.value
        });
    }

    const handleSignInButton = async () => {
        
        const entity = window.location.pathname.split('/')[2];
        let path = `/${entity}/page`;
        const result = await twoFactorValidation(props.userId, Object.values(code)[0], entity, props.dispatch);
        
       if(!result) return;
       
       const {loggedUser, accesToken, refreshToken} = result;

       props.dispatch({type: LOGIN_SUCCESS, payload: {
        loggedUser: {
            email: loggedUser.Email,
            firstName: loggedUser.FirstName,
            lastName: loggedUser.LastName,
            role: loggedUser.Role,
            
        },
        accesToken: accesToken,
        refreshToken: refreshToken
    }});

       if(entity === "customer"){

        const existingReservation = await verifiyExistingActiveReservation(loggedUser.Email, props.dispatch);
        
        
        if(existingReservation.found){
            path = `/${entity}/page/restaurant/reservation`;
           
            props.dispatch({type: EXISTING_RESERVATION, payload: { 
                reservation: existingReservation.reservation,
                order: existingReservation.order,
                menu: existingReservation.menu,
                orderItems: existingReservation.orderItems
            }});
        }
       }
       
       history.push(path);
 
       }

       const handleCanelButton = async () => {
           props.dispatch({type: HIDE_TWO_FACTOR_FORM});
       }

       const handleLostQrCod = async () => {

        const entity = window.location.pathname.split('/')[2];

        const result =  await lostVerification(entity, props.userId, props.dispatch);

        if(result){
            setRenderRecuperationMessage(true);
        }

       }

    return (
       <div className="container-twofactor">
        <div className='popup-two-factor-auth'>  
            <div className='popup-two-factor-auth-inner'>  
            <h3 className='popup-two-factor-auth-title'>Enter the code from Google Authenticator</h3>  
            <div className='popup-two-factor-form'>
                <div className="popup-two-form-input">
                <input className="form-control"  name="code" placeholder="Code" type="text" onChange={handleOnChange}></input>
                </div>
                <Button id="popup-two-form-signin" variant="outline-dark" onClick={handleSignInButton}>Sign in</Button>
                <Button id="popup-two-form-qr" variant="outline-dark" onClick={handleLostQrCod}>Lost code</Button>    
                <Button id="popup-two-form-cancel" variant="outline-dark" onClick={handleCanelButton}>Cancel</Button>
               
                <div>
                    {
                        props.twoFactorLoginValidationError ? 
                            <p className="signin-error-message">{props.twoFactorLoginValidationError}</p> : null
                    }
                    {
                        renderRecuperationMessage ? <div  className="qr-message-container"><p className="qr-message">An email has been sent to you! Check it out to get you code back!😁</p></div> : null
                    }
                </div>
            </div>
            </div>
        </div>  
        </div> 
    )
}

const mapStateToProps = (state) =>({
    userId: state.login.userId, 
    order: state.reservationState.order,
    twoFactorLoginValidationError: state.login.twoFactorLoginValidationError,
    loggedIn: state.login.loggedIn,
    renderTwoFactorForm: state.login.renderTwoFactorForm
   
})

export default connect(mapStateToProps)(TwoFactorAuthComponent)