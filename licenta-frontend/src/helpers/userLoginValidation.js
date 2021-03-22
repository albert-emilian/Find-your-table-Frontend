import validator from 'validator';

const userValidation = (
    email,
    password,
  ) => {

    let errorArray = [];
  
    if (validator.isEmail(email) === false || validator.isEmpty(email) === true)
     errorArray.push({inputName:"email", message: "Email field cannot be empty and must be a valid email format"});
  
    if (validator.isEmpty(password) === true)
      errorArray.push({inputName:"password", message: "Password field cannot be empty"});
      
    if(errorArray.length > 0)    
        throw {"validationErrors": errorArray};

        return;
  };

  export default userValidation;
  