import validator from 'validator';

const tableEditValidation = (
    name,
    description,
    unitPrice,
    quantity
  ) => {

    let errorArray = [];

    if (
      validator.isEmpty(name) == true 
    )
      errorArray.push ({inputName:"name", message: "Name field cannot be empty"});

    if(validator.isFloat(unitPrice+"") === false) errorArray.push ({inputName: "unitprice", message: 'Invalid Unit price format'});

    if(validator.isInt(quantity+"") === false) errorArray.push ({inputName: "quantity", message: 'Invalid quantity  format'});

    if (
        validator.isEmpty(description) == true ||
        validator.isAlphanumeric(description) == false
      )
        errorArray.push ({inputName:"description", message: "Invalid description"});


    if(errorArray.length > 0)    
        throw {"validationErrors": errorArray};
      
        return;
  };


  export const tableValidation = (tableName) => {

    if(
        validator.isEmpty(tableName+"") == true 
    )
        throw ({validationError: "Table name field cannot be empty"});
  }

  
