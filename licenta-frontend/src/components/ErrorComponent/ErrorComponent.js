import React from 'react'
import './ErrorComponent.css'

 export default function ErrorComponent(props) {
    return (
        <div className='popup-error'>  
        <div className='popup-error-inner'>  
         <h3 className='popup-error-title'>Registration error!</h3>  
          <p className='popup-error-message'>{props.errorMessage}</p>
               <div className='close-popup-error'>
               <button  onClick={props.handleCloseButton}>Close</button>  
               </div>
        </div>  
       </div>  
       );  
}


