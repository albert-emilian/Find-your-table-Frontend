import { combineReducers } from "redux";
import registrationReducer from "./registrationReducer";
import loginReducer from './loginReducer';
import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import inventoryReducer from './restaurantInventoryReducer'

export default combineReducers({
    registration: registrationReducer,
    login: loginReducer,
    restaurantState: restaurantReducer,
    customerState: customerReducer,
    inventoryState: inventoryReducer
});