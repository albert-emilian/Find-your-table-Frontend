import validator from 'validator';

const itemValidation = (
    name,
    description,
    unitPrice,
    quantity
  ) => {

    let errorArray = [];

    const nameWithoutSpace = name.split(" ").join("");

    if (
      validator.isEmpty(nameWithoutSpace) == true 
    )
      errorArray.push ({inputName:"name", message: "Name field cannot be empty"});

    if(validator.isFloat(unitPrice+"") === false) errorArray.push ({inputName: "unitprice", message: 'Invalid Unit price format'});

    if(validator.isInt(quantity+"") === false) errorArray.push ({inputName: "quantity", message: 'Invalid quantity  format'});

    const descriptionWithoutSpace = description.split(" ").join("");

    if (validator.isEmpty(descriptionWithoutSpace) == true)
        errorArray.push ({inputName:"description", message: "Invalid description"});


    if(errorArray.length > 0)    
        throw {"validationErrors": errorArray};
      
        return;
  };

  
  export default itemValidation;