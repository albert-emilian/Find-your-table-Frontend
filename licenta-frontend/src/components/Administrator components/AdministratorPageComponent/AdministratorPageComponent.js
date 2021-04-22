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
    const [renderRestaurantNotReadyMessage,setRenderRestaurantNotReadyMessage] = useState(false);
  

    useEffect(() => {

        const checkExistingRestaurant = async () => {

            const result = await isRestaurantReady(props.userId, props.dispatch);


            if(result){
              

                const { accesToken, refreshToken, isRestaurantReady, restaurantInfo } = result;


                props.dispatch({type: CHECK_EXISTING_RESTAURANT_SUCCESS, payload: {
                    isRestaurantReady: isRestaurantReady,
                    restaurantInfo: restaurantInfo
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
                setRenderRestaurantNotReadyMessage(false)
            }
                
                 
            if(props.location.hash === "#inventory"){
                setRenderTables(false)
                setRenderRestaurantInfo(false)
                if(props.isRestaurantReady){
                    setRenderInventory(true)
                }else{
                    setRenderRestaurantNotReadyMessage(true);
                }

            } 
               
             
            if(props.location.hash === "#tables"){
                setRenderInventory(false)
                setRenderRestaurantInfo(false)
                if(props.isRestaurantReady){
                    setRenderTables(true)
                }else{
                    setRenderRestaurantNotReadyMessage(true);
                }

            }
     })

    return (
        <div>
            <NavBarComponent signOutAdministrator={handleSignOutClick}/>
            {
                renderRestaurantInfo ? <RestaurantFormComponent/> : null          
            }
            {
              renderInventory ? <RestaurantIventoryComponent/> :  null
            }
            {
                renderRestaurantNotReadyMessage ?  <div>
            <p>You need to create your restaurant 👨‍🍳 profile before coming to this section!</p>
            <p>Go to Restaurant Information tab for finishing the process✅</p>
        </div> : null
            }
            {
                renderTables  ? <RestaurantTablesComponent/> :   null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isRestaurantReady: state.restaurantState.isRestaurantReady,
    userId: state.login.userId
})

export default connect(mapStateToProps)(AdministratorPageComponent);

