import { combineReducers } from "redux";
import registrationReducer from "./registrationReducer";
import loginReducer from './loginReducer';
import restaurantReducer from './restaurantReducer'
import customerReducer from './customerReducer'

export default combineReducers({
    registration: registrationReducer,
    login: loginReducer,
    restaurantState: restaurantReducer,
    customerState: customerReducer
});