import { 
    RENDER_RESTAURANT,
    RENDER_RESTAURANT_LIST,
    SELECTED_RESTAURANT
} from '../actiontypes/index'


const initialState = {
    renderRestaurant: false,
    renderRestaurantList: true,
    restaurant: {}
}


export default function(state = initialState, action){

    switch(action.type){

        case RENDER_RESTAURANT:
            console.log("AA")
            return {
                ...state,
                renderRestaurant: true,
                renderRestaurantList: false
            }

        case RENDER_RESTAURANT_LIST:
            return {
                ...state,
                renderRestaurantList: true,
                renderRestaurant: false
            }

        case SELECTED_RESTAURANT: 
            return {
                ...state,
                restaurant: {...action.payload.restaurant}
            }

        default: return state;
    }
}