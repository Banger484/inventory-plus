
// Imports custom css file and requires all dependant files
import './Header.css'
import React from 'react'
import Icon from './Icon'

// Export function to display header of application with welcome enterprise and user. Displays application logo and name as well.
export default function Header({user,enterprise}) {
  
  return (
    <header className='header-grid'>
        <div className='header-avatar'>
        {user.avatar?(<div className='avatar-cont'><img id="avatar-image" className='avatar-image' src={`/images/${user.avatar}`}/></div>):(<img src='/images/icons/avatar.png' alt='your avatar'/>)}
        </div>
        <div className='header-welcome'>
        <h1>{enterprise}</h1>
        <p>Welcome, {user.name}.</p>
        </div>
        <div className='header-logo'>
        <Icon /> 
        <h1>Inventory+</h1>
        </div>


    </header>
  )
}

