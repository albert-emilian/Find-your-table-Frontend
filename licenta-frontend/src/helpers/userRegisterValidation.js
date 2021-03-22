import validator from 'validator';

const userValidation = (
    email,
    password,
    firstname,
    lastname,
    phone,
    confirmPassword
  ) => {

    let errorArray = [];

    if (
      validator.isEmpty(lastname) == true ||
      validator.isAlpha(lastname) == false
    )
      errorArray.push ({inputName:"lastName", message: "Invalid Lastname"});
  
    if (
      validator.isEmpty(firstname) === true ||
      validator.isAlpha(firstname) === false
    )
     errorArray.push ({inputName:"firstName", message: "Invalid  Firstname"});
  
    if (
      validator.isMobilePhone(phone, "ro-RO") === false ||
      validator.isEmpty(phone) === true
    )
     errorArray.push ({inputName:"phone", message: "Invalid Phone number"});
  
    if (validator.isEmail(email) === false || validator.isEmpty(email) === true)
     errorArray.push({inputName:"email", message: "Invalid Email"});
  
    if (
      validator.isStrongPassword(password, { minSymbols: 0 }) === false ||
      validator.isEmpty(password) === true
    )
      errorArray.push({inputName:"password", message: "Invalid Password"});
    
    if(!password === confirmPassword)
      errorArray.push({inputName:"confirmPassword", message: "Password confirmation does not match the password"});
      
    if(errorArray.length > 0)    
        throw {"validationErrors": errorArray};

        return;
  };

  export default userValidation;
  