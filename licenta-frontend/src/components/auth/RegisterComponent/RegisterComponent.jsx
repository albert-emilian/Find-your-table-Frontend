import './RegisterComponent.css'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { registerUser } from '../../../actions/authActions'
import QrCodeComponent from '../../QrCodeComponent/QrCodeComponent';
import ReactDom from 'react-dom';
import ErrorPopUpComponent from '../../ErrorComponent/ErrorComponent';
import {
  FIRST_NAME,
  LAST_NAME,
  PHONE,
  EMAIL,
  PASSWORD,
  PASSWORD_CONFIRM
} from '../../../helpers/constants';
import { 
  REGISTER_FAIL_CLOSE,
  SCANNED_QR
} from '../../../actiontypes/index';



function SignUp(props){

  const [user,setUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [renderQrCode,setRenderQrCode] = useState(false);

  const handleChange = (evt) => {
    setUser({
      ...user,
      [evt.target.name]:evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const entity = window.location.pathname.split('/')[2];

    registerUser(user,props.dispatch,entity);
    setRenderQrCode(true);
   
  }

  const handleRenderQrCodeClose = (evt) => {
    evt.preventDefault();
    props.dispatch({type: SCANNED_QR, payload: {
      registerSuccess: false
    }})
    setRenderQrCode(false);
  }

  const handleErrorPopUpClose = (evt) => {
    evt.preventDefault();
    props.dispatch({type: REGISTER_FAIL_CLOSE});
  }

  function renderError(errorsArray, inputName){
    const error = errorsArray.filter(error => (error.message && error.inputName === inputName))[0]
    if(error?.message)
      return error.message;
        return null
  }
  

    return ReactDom.createPortal(
      <div>
            <form className="form-sign-up">
                <h3 className="component-title">Register</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input name="firstName" type="text" className="form-control" placeholder="First name" onChange={handleChange}/>
                   <div className="input-error">{renderError(props.validationErrors,FIRST_NAME)}</div>
                </div>
               
                <div className="form-group">
                    <label>Last name</label>
                    <input name="lastName" type="text" className="form-control" placeholder="Last name" onChange={handleChange} />
                    <div className="input-error">{renderError(props.validationErrors,LAST_NAME)}</div>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
                    <div className="input-error">{renderError(props.validationErrors,EMAIL)}</div>
                </div>
                  
                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" type="phone" className="form-control" placeholder="Enter phone number" onChange={handleChange} />
                    <div className="input-error">{renderError(props.validationErrors,PHONE)}</div>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                    <div className="input-error">{renderError(props.validationErrors,PASSWORD)}</div>
                </div>

                <div className="form-group">
                    <label>Password confirm</label>
                    <input name="passwordConfirm" type="password" className="form-control" placeholder="Confirm password" onChange={handleChange} />
                    <div className="input-error">{renderError(props.validationErrors,PASSWORD_CONFIRM) }</div>
                </div>

                
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <Link  to={`/login/${window.location.pathname.split('/')[2]}`}  >log in?</Link>
                </p>
            </form>
            <div>
              {
                (renderQrCode && props.registerSuccess) ? <QrCodeComponent handleCloseButton={handleRenderQrCodeClose}/> :  null
              }
            </div>
            <div>
              {
                props.registrationError.isError ? <ErrorPopUpComponent errorMessage={props.registrationError.errorMessage} handleCloseButton={handleErrorPopUpClose}/> : null
              }
            </div>

        
      </div>,
        document.getElementById("qr-popup"));
    }


const mapStateToProps = (state) => ({
  registerLoading: state.registration.registerLoading,
  qrCode: state.registration.qrCode,
  validationErrors: state.registration.validationErrors,
  registerSuccess: state.registration.registerSuccess,
  registrationError: state.registration.registrationError
})

export default withRouter(connect(mapStateToProps)(SignUp));