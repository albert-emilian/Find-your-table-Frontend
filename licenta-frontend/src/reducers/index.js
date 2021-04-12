import { combineReducers } from "redux";
import registrationReducer from "./registrationReducer";
import loginReducer from './loginReducer';
import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'
import inventoryReducer from './restaurantInventoryReducer'
import tablesReducer from './tablesReducer'
import reservationReducer from './reservationReducer'
import customerPageStateReducer from './customerPageStateReducer'

export default combineReducers({
    registration: registrationReducer,
    login: loginReducer,
    restaurantState: restaurantReducer,
    customerState: customerReducer,
    inventoryState: inventoryReducer,
    tablesState: tablesReducer,
    reservationState: reservationReducer,
    customerPageState: customerPageStateReducer
});