
// Imports custom css file and requires all dependant files
import './Header.css'
import React from 'react'

// Export function to display header of application with welcome enterprise and user. Displays application logo and name as well.
export default function Header(props) {
  return (
    <header>
      <div className='header-enterprise'>
        <h1>{props.enterprise}</h1>
        <p>Welcome, {props.user}.</p>
      </div>
      <div className='header-logo'>
        <img src='/images/icons/iplus_adobe_express.png' alt="Inventory+ Logo" />
      </div>
    </header>
  )
}

