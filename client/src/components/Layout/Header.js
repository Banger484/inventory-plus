
// Imports custom css file and requires all dependant files
import './Header.css'
import React from 'react'
import Icon from './Icon'
import { Link } from 'react-router-dom'

// Export function to display header of application with welcome enterprise and user. Displays application logo and name as well.
export default function Header({avatarPic,user,enterprise}) {
  
  // const {data,loading,error} = useQuery(GET_AVATAR,{variables:{userId:user._id}})
  // if(loading){
  //   return(<div>Loading...</div>)
  // }


  return (
    <header className='header-grid'>
        <Link className='header-avatar' to='/users/settings'>
        {user.avatar?(<div className='avatar-cont'><img id="avatar-image" className='avatar-image' src={`/images/${user.avatar}`}/></div>):(<img src='/images/icons/avatar.png' alt='your avatar'/>)}
        </Link>
        
        <Link className='header-welcome' to='users/roster'>
        <h1>{enterprise}</h1>
        <p>Welcome, {user.name}.</p>
        </Link>
        <Link to='/' className='header-logo'>
        <Icon /> 
        <h1>Inventory+</h1>
        </Link>


    </header>
  )
}

