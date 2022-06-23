
// Imports custom css file and requires all dependant files
import './Header.css'
import React from 'react'
import Icon from './Icon'

// Export function to display header of application with welcome enterprise and user. Displays application logo and name as well.
export default function Header(props) {
  return (
    <header>
      <div className='header-enterprise'>
        <h1>{props.enterprise}</h1>
        <p>Welcome, {props.user}.</p>
      </div>
      <div className='header-logo'>
        <Icon className='header-icon' /> 
        <h1>Inventory+</h1>
      </div>
    </header>
  )
}

