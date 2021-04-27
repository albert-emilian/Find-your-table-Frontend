import  {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { useEffect } from 'react';
  import { connect } from 'react-redux'
  import {
      HIDE_TWO_FACTOR_FORM
  } from '../../actiontypes/index'
import "./HomeComponent.css";

function Home(props){

    useEffect(()=>{
        props.dispatch({type: HIDE_TWO_FACTOR_FORM})
    },[])

    return(
        <div className="home-container">
           <div className="grid-item grid-item-1">
           <h1 className="title title-1">Find your table!</h1>
           <h3 className="title title-2">Thanks for using our services!🙏🏽</h3>
           </div>
           <div className="grid-item grid-item-2">
                <Link id="link-login" to="/login/customer">Check the nearby available tables!🍽</Link>              
           </div>
            <div className="grid-item grid-item-3">
                <Link id="link-register" to="/login/administrator">Welcome your clients!👨‍🍳</Link>              
            </div>
        </div>
    )

}

export default connect()(Home);