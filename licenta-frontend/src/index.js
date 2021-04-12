import React from 'react';
import ReactDOM from 'react-dom';
import  {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/HomeComponent/HomeComponent.jsx"
import RegisterComponent from "./components/auth/RegisterComponent/RegisterComponent";
import LoginComponent from "./components/auth/LoginComponent/LoginComponent";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'
import ProtectedRoute from './components/ProtectedRoute'
import CustomerPageComponent from './components/Customer components/CustomerPageComponent/CustomerPageComponent'
import AdministratorPageComponent from './components/Administrator components/AdministratorPageComponent/AdministratorPageComponent'
import RestaurantComponent from './components/Customer components/Restaurant related components/RestaurantComponent/RestaurantComponent'
import ReservationComponent from './components/Customer components/ReservationComponent/ReservationComponent'
import './index.css'


const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
       <Router>
          <Provider store={store} >
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login/customer">
                    <LoginComponent />
                </Route>
                <Route exact path="/login/administrator">
                    <LoginComponent />
                </Route>
                <Route exact path="/register/customer">
                    <RegisterComponent />
                </Route>
                <Route exact path="/register/administrator">
                    <RegisterComponent />
                </Route>
                <ProtectedRoute exact path='/customer/page' component={CustomerPageComponent} entity={window.location.pathname.split('/')[1]} />
                <ProtectedRoute exact path='/administrator/page' component={AdministratorPageComponent} entity={window.location.pathname.split('/')[1]}/>
                <ProtectedRoute exact path='/customer/page/restaurant' component={RestaurantComponent} entity={window.location.pathname.split('/')[1]} />
                <ProtectedRoute exact path='/customer/page/restaurant/reservation' component={ReservationComponent} entity={window.location.pathname.split('/')[1]} />
            </Switch>
          </Provider>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


