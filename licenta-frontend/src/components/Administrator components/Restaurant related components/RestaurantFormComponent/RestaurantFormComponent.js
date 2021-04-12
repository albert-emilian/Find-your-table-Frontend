import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveRestaurantInfo } from '../../../../actions/restaurantActions'
import { 
    DESCRIPTION,
    THEME,
    NAME,
    PHONE,

} from '../../../../helpers/constants'
import ErrorComponent from '../../../ErrorComponent/ErrorComponent';
import SelectComponent from '../../../SelectComponent/SelectComponent'

 function RestaurantFormComponent(props) {

    const [restaurantInfo, setRestaurantInfo] = useState({
        name: "",
        email: "",
        phone: "",
        theme: "",
        description: "",
        county: " ",
        city: ""
    });



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
   
        
        const {name, city, county, phone, description, theme} = restaurantInfo;

         saveRestaurantInfo(name, props.loggedUser.email, city, county, phone, description, theme, props.dispatch);
    }


    const handleChange = (evt) => { 
        setRestaurantInfo({
            ...restaurantInfo,
            [evt.target.name]: evt.target.value
        });
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
                <input name="name" type="text" className="form-control" placeholder="Name" onChange={handleChange}/>
               <div className="input-error">{renderError(props.restaurantInfoValidationErrors,NAME)}</div>
            </div>
              
            <div className="form-group">
                <label>Phone</label>
                <input name="phone" type="phone" className="form-control" placeholder="Enter restaurant`s phone number" onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,PHONE)}</div>
            </div>

            

            <SelectComponent handleSelectCity={handleSelectCity} handleSelectCounty={handleSelectCounty} countyValue={restaurantInfo.county}/>

            <div className="form-group">
                <label>Theme</label>
                <textarea name="theme" type="text" className="form-control" placeholder="Theme" onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,THEME)}</div>
            </div>

            <div className="form-group">
                <label>Description</label>
                <textarea name="description" type="text" className="form-control" placeholder="Description" onChange={handleChange} />
                <div className="input-error">{renderError(props.restaurantInfoValidationErrors,DESCRIPTION)}</div>
            </div>
            <div>{ props.restaurantInfoFail.isError ? <ErrorComponent errorMessage={props.restaurantInfoFail.errorMessage}/> : null}</div>
            <div>{ props.restaurantInfoSaved ? "The information about your restaurant has been saved, now the customers can see your restaurant in the app" : null} </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSaveButton} >Save</button>
        </form>
    </div>
    )
}


const mapStateToProps = state => ({
  restaurantInfoSaved: state.restaurantState.restaurantInfoSaved,
  restaurantInfoValidationErrors: state.restaurantState.restaurantInfoValidationErrors,
  restaurantInfoFail: state.restaurantState.restaurantInfoFail,
  loggedUser: state.login.loggedUser
})

export default connect(mapStateToProps)(RestaurantFormComponent);
