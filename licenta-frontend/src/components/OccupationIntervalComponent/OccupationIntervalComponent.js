import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { loadOccupationInterval } from '../../actions/restaurantActions'
import { 
    OCCUPATION_INTERVAL_SUCCESS
} from '../../actiontypes/index'
import {
    ACCESS_TOKEN_CUSTOMER,
    REFRESH_TOKEN_CUSTOMER
} from '../../helpers/constants'

const OccupationIntervalComponent = (props) => {
    
    const {restaurantId} = props;


    useEffect(async ()=> {
        console.log(restaurantId)
    const result = await loadOccupationInterval(restaurantId, props.dispatch);


    if(result){
        const { occupationPerIntervals, accesToken, refreshToken} = result;

        props.dispatch({type: OCCUPATION_INTERVAL_SUCCESS, payload: {
            occupationPerIntervals: occupationPerIntervals
        }});

    localStorage.setItem(ACCESS_TOKEN_CUSTOMER,accesToken);
    localStorage.setItem(REFRESH_TOKEN_CUSTOMER,refreshToken);
    }
    }, [])
    
    
    
    return (
        <div>
            <h4>Occupation per intervals</h4>            
            {
                Object.keys(props.occupationPerIntervals).map(key => 
                <div>
                    <div>
                    {key.toString()}: {props.occupationPerIntervals[key].toString()+"%"}
                    </div>
                </div>)
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    occupationPerIntervals: state.restaurantState.occupationPerIntervals
})

export default connect(mapStateToProps)(OccupationIntervalComponent)
