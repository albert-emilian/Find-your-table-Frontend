import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import RestaurantListItemComponent from '../RestaurantListItemComponent/RestaurantListItemComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import {
    RESTAURANTS_RETRIEVED_BY_CITY_SUCCES,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_LOADING 
} from '../../actiontypes/index';


export const RestaurantListComponent = (props) => {

    useEffect(async () => {
        try {

            props.dispatch({type: RESTAURANTS_RETRIEVED_BY_CITY_LOADING });
            
            const result = await axios.post("http://localhost:8000/restaurant/location/all", {
                City: props.customerLocation.city,
                County: props.customerLocation.county,
                accesToken: localStorage.getItem("ACCES_TOKEN"),
                refreshToken: localStorage.getItem("REFRESH_TOKEN")
            });
            console.log(result, props.customerLocation)

            props.dispatch({type: RESTAURANTS_RETRIEVED_BY_CITY_SUCCES, payload: {
                restaurantsRetrievedByCustomerLocationCityList: result.data.restaurantsByLocation
            }})

        } catch (error) {
            props.dispatch({type: RESTAURANTS_RETRIEVED_BY_CITY_FAIL, payload: {
                restaurantsRetrievedByCityCustomerLocationError: {
                    errorMessage: error.message
                }
            } });
        }
      }, []);

    return (
        <div>
            {
                props.isRestaurantListRetrievedByCustomerLocation ?  props.restaurantsRetrievedByCustomerLocationCityList?.map(restaurant => <RestaurantListItemComponent name={restaurant.Name} key={restaurant.RestaurantId}/>) : 
                <LoadingComponent/>
            }
            {
                console.log(props)
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    customerLocation: state.customerState.customerLocation,
    isRestaurantListRetrievedByCustomerLocation: state.restaurantState.isRestaurantListRetrievedByCustomerLocation,
    restaurantsRetrievedByCustomerLocationLoading: state.restaurantState.restaurantsRetrievedByCustomerLocationLoading,
    restaurantsRetrievedByCustomerLocationCityList: state.restaurantState.restaurantsRetrievedByCustomerLocationCityList,
    restaurantsRetrievedByCityCustomerLocationError: state.restaurantState.restaurantsRetrievedByCityCustomerLocationError
})

export default connect(mapStateToProps)(RestaurantListComponent)
