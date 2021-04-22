import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveRestaurantInfo,updateRestaurantInfo } from '../../../../actions/restaurantActions'
import { 
    DESCRIPTION,
    THEME,
    NAME,
    PHONE,
    STREET,
    ACCESS_TOKEN,
    REFRESH_TOKEN
} from '../../../../helpers/constants'
import {
    RESTAURANT_INFO_SAVE_SUCCES,
    CHECK_EXISTING_RESTAURANT_SUCCESS,
    RESTAURANT_INFO_UPDATE_SUCCESS
} from '../../../../actiontypes/index'
import ErrorComponent from '../../../ErrorComponent/ErrorComponent';
import SelectComponent from '../../../SelectComponent/SelectComponent'
import TimePicker from 'react-bootstrap-time-picker';

 function RestaurantFormComponent(props) {

    const [restaurantInfo, setRestaurantInfo] = useState({
        name: "",
        email: "",
        phone: "",
        theme: "",
        description: "",
        county: "",
        city: "",
        street: "",
        number: "",
        startingHour: "",
        finishingHour: ""
    });

    useEffect(()=> {
        if(props.isRestaurantReady)
            setRestaurantInfo({...props.restaurantInfo});
    },[]);

     const handleSelectCounty = (county) => {
        setRestaurantInfo({
            ...restaurantInfo,
            county: county
        });
     }


     const handleSelectCity = (city) => {
        setRestaurantInfo({
            ...restaurantInfo,
            city: city
        });
     }

    const handleSaveButton = async (evt) => {
        evt.preventDefault();   
   
        
        const {name, city, county, street, number, phone, description, theme, startingHour, finishingHour} = restaurantInfo;

        const result = await saveRestaurantInfo(name, props.loggedUser.email, city, street, number,  county, phone, description, theme, props.dispatch, startingHour, finishingHour);

        if(result){

            const {accesToken, refreshToken, restaurantInfo} = result;

            props.dispatch({type: RESTAURANT_INFO_SAVE_SUCCES});
       
            props.dispatch({type: CHECK_EXISTING_RESTAURANT_SUCCESS, payload: {
                isRestaurantReady: true,
                restaurantInfo: restaurantInfo
            }});

            localStorage.setItem(ACCESS_TOKEN,accesToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
    }

    const handleChange = (evt) => { 
        setRestaurantInfo({
            ...restaurantInfo,
            [evt.target.name]: evt.target.value
        });
    }

    const handleTimeChangeStarting = (time) => {

        const hour = Math.floor(time / 3600);
        const minute = time / 3600 % 1 * 60;

        const startingHour = minute === 0 ? hour+""+ ":"+minute+""+"0" : hour+""+ ":"+minute+"";

        setRestaurantInfo({ 
            ...restaurantInfo,
            startingHour: startingHour
        });
      }

    const handleTimeChangeFinishing = (time) => {

    const hour = Math.floor(time / 3600);
    const minute = time / 3600 % 1 * 60;

    const finishingHour = minute === 0 ? hour+""+ ":"+minute+""+"0" : hour+""+ ":"+minute+"";

    setRestaurantInfo({ 
        ...restaurantInfo,
        finishingHour: finishingHour
    });
    }

    const handleUpdateButton = async (evt) => {
        evt.preventDefault();
        const {name, city, county, street, number, phone, description, theme, startingHour, finishingHour} = restaurantInfo;

        const result = await updateRestaurantInfo(name, props.loggedUser.email, city, street, number,  county, phone, description, theme, props.dispatch, startingHour, finishingHour);

        if(result){

            const {accesToken, refreshToken, restaurantInfo} = result;

            props.dispatch({type: RESTAURANT_INFO_SAVE_SUCCES});
       
            props.dispatch({type: CHECK_EXISTING_RESTAURANT_SUCCESS, payload: {
                isRestaurantReady: true,
                restaurantInfo: restaurantInfo
            }});

            localStorage.setItem(ACCESS_TOKEN,accesToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
    }

    function renderError(errorsArray, inputName){
        const error = errorsArray.filter(error => (error.message && error.inputName === inputName))[0]
        if(error?.message)
          return error.message;
            return null
      }


    return (
    <div>
        <form className="form-restaurant">
            <h3 className="component-title">Restaurant information</h3>
            <div className="form-group">
                <label>Restaurant name</label>
                <input name="name" type="text" className="form-control" placeholder="Name" defaultValue={restaurantInfo.name} onChange={handleChange}/>
               <div className="input-error">{renderError(props.restaurantInfoValidationErrors,NAME)}</div>
            </div>
              
            <div className="form-group">
                <label>Phone</label>
                <input name="phone" type="phone" className="form-control" placeholder="Enter restaurant`s phone number" defaultValue={restaurantInfo.phone} onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,PHONE)}</div>
            </div>

            <SelectComponent handleSelectCity={handleSelectCity} handleSelectCounty={handleSelectCounty} defaultValue={restaurantInfo.city} countyValue={restaurantInfo.county}/>

            <div className="form-group">
                <label>Street</label>
                <textarea name="street" type="text"  className="form-control" placeholder="Street" defaultValue={restaurantInfo.street} onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,STREET)}</div>
            </div>

            <div className="form-group">
                <label>Number</label>
                <input name="number" type="number" min="0" max="1000"  className="form-control" placeholder="Number" defaultValue={restaurantInfo.number} onChange={handleChange} />
            </div>

            <div className="form-group">
                <label>Theme</label>
                <textarea name="theme" type="text" className="form-control" placeholder="Theme" defaultValue={restaurantInfo.theme} onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,THEME)}</div>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" type="text" className="form-control" placeholder="Description" defaultValue={restaurantInfo.description} onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,DESCRIPTION)}</div>
            </div>
            <label className="form-group">
                Schedule
                Begining: <TimePicker value={restaurantInfo.startingHour}  start="00:00" end="23:00" step={60} defaultValue={restaurantInfo.startingHour} onChange={handleTimeChangeStarting} />
                End: <TimePicker value={restaurantInfo.finishingHour}  start="00:00" end="23:00" step={60} defaultValue={restaurantInfo.finishingHour} onChange={handleTimeChangeFinishing} />
            </label>
           
            <div>{ props.restaurantInfoFail.isError ? <ErrorComponent errorMessage={props.restaurantInfoFail.errorMessage}/> : null}</div>
            <div>{ props.restaurantInfoSaved ? "The information about your restaurant has been saved, now the customers can see your restaurant in the app" : null} </div>
           {
            props.isRestaurantReady ? <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleUpdateButton} >Update</button> :
             <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSaveButton} >Save</button>
           } 
        </form>
    </div>
    )
}


const mapStateToProps = state => ({
  restaurantInfoSaved: state.restaurantState.restaurantInfoSaved,
  restaurantInfoValidationErrors: state.restaurantState.restaurantInfoValidationErrors,
  restaurantInfoFail: state.restaurantState.restaurantInfoFail,
  loggedUser: state.login.loggedUser,
  isRestaurantReady: state.restaurantState.isRestaurantReady,
  restaurantInfo: state.restaurantState.restaurantInfo
})

export default connect(mapStateToProps)(RestaurantFormComponent);
