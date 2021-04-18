import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import { signOut } from '../../../actions/authActions'; 
import { isRestaurantReady } from '../../../actions/restaurantActions';
import RestaurantFormComponent from '../Restaurant related components/RestaurantFormComponent/RestaurantFormComponent'
import NavBarComponent from '../../NavBarComponent/NavBarComponent'
import RestaurantIventoryComponent from '../Inventory related components/RestaurantInventoryComponent/RestaurantInventoryComponent';
import RestaurantTablesComponent from '../Table related components/RestaurantTablesComponent/RestaurantTablesComponent'
import { 
    CHECK_EXISTING_RESTAURANT_SUCCESS
} from '../../../actiontypes/index'
import { 
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from '../../../helpers/constants'
export const AdministratorPageComponent = (props) => {

    const history = useHistory();

    const [renderInventory, setRenderInventory] = useState(false);
    const [renderTables, setRenderTables] = useState(false);
    const [renderRestaurantInfo,setRenderRestaurantInfo] = useState(false);
    const restaurantNotExistingMessage = () => {
        <div>
            <p>You need to create your restaurant 👨‍🍳 profile before coming to this section!</p>
            <p>Go to Restaurant Information tab for finishing the process✅</p>
        </div>
    }

    useEffect(() => {

        const checkExistingRestaurant = async () => {

            const result = await isRestaurantReady(props.userId, props.dispatch);


            if(result){
              

                const { accesToken, refreshToken, isRestaurantReady } = result;


                props.dispatch({type: CHECK_EXISTING_RESTAURANT_SUCCESS, payload: {
                    isRestaurantReady: isRestaurantReady
                }});


                localStorage.setItem(ACCESS_TOKEN,accesToken);
                localStorage.setItem(REFRESH_TOKEN,refreshToken);
            }
        };

        checkExistingRestaurant();
    })


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
            {
                renderRestaurantInfo ? <RestaurantFormComponent/> : restaurantNotExistingMessage              
            }
            {
                props.isRestaurantReady && renderInventory ? <RestaurantIventoryComponent/> : restaurantNotExistingMessage
            }
            {
                renderTables && props.isRestaurantReady ? <RestaurantTablesComponent/> : restaurantNotExistingMessage
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isRestaurantReady: state.restaurantState.isRestaurantReady,
    userId: state.login.userId
})

export default connect(mapStateToProps)(AdministratorPageComponent);

