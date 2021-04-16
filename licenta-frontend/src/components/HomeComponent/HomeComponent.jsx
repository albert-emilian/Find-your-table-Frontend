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
        <div>
           <div className="home-links">
                <Link id="link-login" to="/login/customer">Find your table!</Link>              
                <Link id="link-register" to="/login/administrator">Welcome your clients!</Link>              
           </div>
        </div>
    )

}

export default connect()(Home);