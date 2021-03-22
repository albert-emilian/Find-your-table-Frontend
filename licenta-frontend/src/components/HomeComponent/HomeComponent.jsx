import  {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import "./HomeComponent.css";

function Home(){

    return(
        <div>
           <div className="home-links">
                <Link id="link-login" to="/login/customer">Find your table!</Link>              
                <Link id="link-register" to="/login/administrator">Welcome your clients!</Link>              
           </div>
        </div>
    )

}

export default Home;