import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signOut } from '../../actions/authActions';
import RestaurantFormComponent from '../RestaurantFormComponent/RestaurantFormComponent'
import NavBarComponent from '../NavBarComponent/NavBarComponent'
import RestaurantIventoryComponent from '../RestaurantInventoryComponent/RestaurantInventoryComponent';
import RestaurantTablesComponent from '../RestaurantTablesComponent/RestaurantTablesComponent'
export const AdministratorPageComponent = (props) => {

    const history = useHistory();

    const [renderInventory, setRenderInventory] = useState(false);
    const [renderTables, setRenderTables] = useState(false);
    const [renderRestaurantInfo,setRenderRestaurantInfo] = useState(false);


    const handleSignOutClick = async () => {
        
        const entity = window.location.pathname.split('/')[1];
        await signOut(entity,props.dispatch,history)
    }

    window.addEventListener("hashchange",()=>{
       
            if(props.location.hash ==="#restaurantinfo"){
                setRenderInventory(false)
                setRenderTables(false)
                setRenderRestaurantInfo(true)
            }
                
                 
            if(props.location.hash === "#inventory"){
                setRenderInventory(true)
                setRenderTables(false)
                setRenderRestaurantInfo(false)
            } 
               
             
            if(props.location.hash === "#tables"){
                setRenderInventory(false)
                setRenderTables(true)
                setRenderRestaurantInfo(false)
            }
     })

    return (
        <div>
            <NavBarComponent signOutAdministrator={handleSignOutClick}/>
            <button onClick={()=> {console.log(props)}}>PROPS</button>
          
            {
                renderRestaurantInfo ? <RestaurantFormComponent/> : null              
            }
            {
                renderInventory ? <RestaurantIventoryComponent/> : null
            }
            {
                renderTables ? <RestaurantTablesComponent/> : null
            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(AdministratorPageComponent);

