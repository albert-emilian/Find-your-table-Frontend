import React, { useState } from 'react'
import Select from 'react-select'
import romaniaCities from '../../helpers/romaniaCities.json'
import './SelectComponent.css'
export default function SelectComponent(props) {

    const handleOnchangeCounty = (evt) => { 
      props.handleSelectCounty(evt.value)
    }

    const handleOnchangeCity = (evt) => { 
        props.handleSelectCity(evt.value)
    }
    
 const countyNames = romaniaCities.judete.map(county => county.nume);
 let optionsCounty = []
 countyNames.forEach(countyName =>{
    optionsCounty.push({
        value: countyName,
        label: countyName
        })
    });
let optionsCity = []

const countyCities = romaniaCities.judete.filter(county => county.nume == props.countyValue)[0]?.localitati;
let citiesNames = null;
if(countyCities){
    citiesNames = countyCities.map(city => city.nume);

citiesNames.forEach(cityName =>{
    optionsCity.push({
        value: cityName,
        label: cityName
        })
    });
}


    
    return (
        <div className="container-select">
            <span className="select-county" >
            
                <Select name="county" options={optionsCounty}  defaultInputValue= "County" onChange={handleOnchangeCounty}/>  
            </span>
            <span className="select-city">
                <Select defaultInputValue= "City" options={optionsCity} onChange={handleOnchangeCity} />  
            </span>
        </div>
    )
}
