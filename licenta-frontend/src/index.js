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
            </Switch>
          </Provider>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


