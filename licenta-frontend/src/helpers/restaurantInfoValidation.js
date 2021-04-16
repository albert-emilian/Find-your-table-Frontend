import validator from 'validator';

const restaurantInfoValidation = (
    name,
    city,
    street,
    county,
    phone,
    description,
    theme
  ) => {

    let errorArray = [];

    if (
      validator.isEmpty(name) == true 
    )
      errorArray.push ({inputName:"name", message: "Name field cannot be empty"});
  
    if (
      validator.isMobilePhone(phone, "ro-RO") === false ||
      validator.isEmpty(phone) === true
    )
     errorArray.push ({inputName:"phone", message: "Invalid Phone number"});
  
    if (
    validator.isEmpty(city) == true 
    )
    errorArray.push ({inputName:"city", message: "City field cannot be empty"});
   

    if (
      validator.isEmpty(street) == true 
      )
      errorArray.push ({inputName:"street", message: "Street field cannot be empty"});

    if (
    validator.isEmpty(county) == true 
    )
    errorArray.push ({inputName:"county", message: "County field cannot be empty"});

    if (
    validator.isEmpty(theme) == true 
    )
    errorArray.push ({inputName:"theme", message: "Theme field cannot be empty"});

    if (
    validator.isEmpty(description) == true 
    )
    errorArray.push ({inputName:"description", message: "Description field cannot be empty"});


    if(errorArray.length > 0)    
        throw {"validationErrors": errorArray};
      
        return;
  };

  export default restaurantInfoValidation;
  