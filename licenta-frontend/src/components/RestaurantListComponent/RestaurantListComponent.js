import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RestaurantListItemComponent from '../RestaurantListItemComponent/RestaurantListItemComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { getRestaurantsByCustomerLocation } from '../../actions/restaurantActions'
import {
    RESTAURANT_INFO_SAVE_SUCCES ,
    RESTAURANT_INFO_SAVE_VALIDATION_ERROR,
    RESTAURANT_INFO_SAVE_FAIL,
    RESTAURANTS_RETRIEVED_BY_CITY_LOADING,
    RESTAURANTS_RETRIEVED_BY_CITY_SUCCES,
    RESTAURANTS_RETRIEVED_BY_CITY_FAIL
 } from '../../actiontypes/index'


export const RestaurantListComponent = (props) => {

    useEffect(async () => {

        props.dispatch({type: RESTAURANTS_RETRIEVED_BY_CITY_LOADING });
       
       const result = await getRestaurantsByCustomerLocation(props.customerLocation.city, props.customerLocation.county, props.dispatch);
        if(result?.data.restaurantsByLocation.length > 0){
        props.dispatch({type: RESTAURANTS_RETRIEVED_BY_CITY_SUCCES, payload: {
            restaurantsRetrievedByCustomerLocationCityList: result.data.restaurantsByLocation
        }});

        localStorage.setItem("ACCES_TOKEN", result.data.accesToken);
        localStorage.setItem("REFRESH_TOKEN", result.data.refreshToken);
    }
      }, []);

    return (
        <div>
       
            <div className="container-restaurant-list">
                {
                    !props.restaurantsRetrievedByCustomerLocationLoading  ?  props.restaurantsRetrievedByCustomerLocationCityList?.map(restaurant => <RestaurantListItemComponent name={restaurant.Name} key={restaurant.RestaurantId}/>) : 
                    <LoadingComponent/>
                }
            </div>
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
