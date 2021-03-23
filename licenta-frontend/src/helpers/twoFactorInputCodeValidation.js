import validator from 'validator';

const userValidation = (
   code
  ) => {
     
   
    if (validator.isEmpty(code) === true )
        throw {errorMessage: "Code field cannot be empty"};

    if(validator.isNumeric(code, {no_symbols: true}) === false)
      throw {errorMessage: "The code can only be numeric"};
  
        return;
  };

  export default userValidation;
  