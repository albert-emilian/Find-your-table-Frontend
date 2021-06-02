import React from 'react'
import { connect } from 'react-redux'
import MenuItemComponent from '../MenuItemComponent/MenuItemComponent'
import './MenuComponent.css'

export const MenuComponent = (props) => {
    
    return (
        <div className="menu-component">
            <div>
                <h3>Menu 🍔</h3>
            </div>
            <div>
                {
                    props.menu.map(item => <MenuItemComponent item={item} key={item.InventoryItemId}/>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    menu: state.reservationState.menu
})

export default connect(mapStateToProps)(MenuComponent)
