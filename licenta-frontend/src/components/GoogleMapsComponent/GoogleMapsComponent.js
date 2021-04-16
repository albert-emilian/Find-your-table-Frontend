import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import './GoogleMapsComponent.css'


export const GoogleMapsComponent = (props) => {


     const handleMarkerClick = (props, marker, e) => {
         alert(`Copy the coordinates (${props.mapCenter.lat}, ${props.mapCenter.lng} ) and paste them into Google Maps app for directions!`)
         console.log(props)
         
     }
    
    return (
        <div className="google-maps-container">
        <Map google={props.google}
            initialCenter={{
            lat: props.lat,
            lng: props.lng}}
            style={{width: '50%', height: '50%', position: 'relative'}}
            className={'map'}
            zoom={14}>
        <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            onClick={handleMarkerClick}
           />
        
        </Map>
        </div>
    )
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyDcnm2ORqQJhIRRlpV4yAgmGcspY4nZmEI")
  })(GoogleMapsComponent)
