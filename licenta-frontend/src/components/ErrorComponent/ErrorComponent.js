import React from 'react'
import './ErrorComponent.css'
import { Button } from 'react-bootstrap'
 export default function ErrorComponent(props) {
    return (
       <div className="container-error-component">
        <div className='popup-error'>  
        <div className='popup-error-inner'>  
         <h3 className='popup-error-title'>Registration error!</h3>  
          <p className='popup-error-message'>{props.errorMessage+"😬"}</p>
               <div className='close-popup-error'>
               <Button className="btn-close"  variant="outline-dark" onClick={props.handleCloseButton}>Close</Button>  
               </div>
        </div>  
       </div>  
       </div>           
       );  
}


