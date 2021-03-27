import React from 'react'
import { FaBeer } from 'react-icons/fa';


function RestaurantListItemComponent(props) {
    return (
        <div>
            <div>{props.name}</div>
            <FaBeer />
            <div>
                <button>Show</button>
            </div>
        </div>
    )
}

export default RestaurantListItemComponent;