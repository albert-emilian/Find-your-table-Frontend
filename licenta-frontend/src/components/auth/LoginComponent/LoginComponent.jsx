import './LoginComponent.css'
import { withRouter, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser } from '../../../actions/authActions';
import { connect } from 'react-redux';
import { EMAIL, PASSWORD } from '../../../helpers/constants'
import ReactDom from 'react-dom';
import ErrorComponent from "../../ErrorComponent/ErrorComponent";
import { 
    LOGIN_FAIL_CLOSE,
    RESTAURANT_LOGOUT_CLEAR} from '../../../actiontypes/index';
import TwoFactorAuthComponent from '../../TwoFactorAuthComponent/TwoFactorAuthComponent';
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core'
import '../LoginComponent/LoginComponent.css'

function Login(props) {

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    });

    useEffect(()=>{
        props.dispatch({type:RESTAURANT_LOGOUT_CLEAR});
    }, [])

    const handleChange = (evt) => {
        setLoginCredentials({
            ...loginCredentials,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const entity = window.location.pathname.split('/')[2];
        loginUser(loginCredentials,props.dispatch, entity);
        
    }

    function renderError(errorsArray, inputName){
        const error = errorsArray.filter(error => (error.message && error.inputName === inputName))[0]
        if(error?.message)
          return error.message;
            return null
      }

      const handleErrorPopUpClose = (evt) => {
        evt.preventDefault();
        props.dispatch({type: LOGIN_FAIL_CLOSE});
      }


        return ReactDom.createPortal(
            <div>
            <div className="login-container">
            <form className="form-login">
                <h3 className="form-login-title">Login</h3>
                <div className="form-login-group">
                    <label className="input-label">Email</label>
                    <input id="login-input-email" name="email" type="email" className="form-control " placeholder="Enter email" onChange={handleChange}/>
                    <div className="input-error-login-email">{renderError(props.validationErrors,EMAIL)}</div>
                </div>

                <div className="form-login-group">
                    <label className="input-label">Password</label>
                    <input id="login-input-password" name="password" type="password" className="form-control col-sm" placeholder="Enter password" onChange={handleChange}/>
                    <div className="input-error-login-password">{renderError(props.validationErrors,PASSWORD)}</div>
                </div>

                <Button className="btn-login" variant="outline-dark" onClick={handleSubmit}>Login</Button>
                <p className="sign-up-message ">
                    Don`t have an account? <Link  to={`/register/${window.location.pathname.split('/')[2]}`}>Sign up here!✍️</Link>
                </p>
            </form>
            </div>
            <div>
                {
                    props.loginError.isError ? <ErrorComponent errorMessage={props.loginError.errorMessage} handleCloseButton={handleErrorPopUpClose}/>  : null
                }
            </div>
            <div>
                {
                    props.renderTwoFactorForm ? <TwoFactorAuthComponent /> : null
                }
            </div>
            </div>,
            document.getElementById("qr-popup")
        );
    }

const mapStateToProps = (state) => ({
    loggedUser: state.login.loggedUser,
    loggedIn: state.login.loggedIn,
    validationErrors: state.login.validationErrors,
    loginError: state.login.loginError,
    renderTwoFactorForm: state.login.renderTwoFactorForm
})

export default withRouter(connect(mapStateToProps)(Login));