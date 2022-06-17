// Imports custom css file and requires all dependant files
import './Navbar.css'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth';

// function to create Navigation bar html for application. exports function
export default function Navbar() {

  //function to logout user when logout button in navigation bar is used.
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    //Navigation bar html 
    <nav className="mini-nav">
        <Link to='/'>
        <button className='mini-nav-buttons'>Dashboard</button>
        </Link>
        <Link to='/products'>
        <button className='mini-nav-buttons'>Products</button>
        </Link>
        <Link to='/orders'>
        <button className='mini-nav-buttons'>Orders</button>
        </Link>
        <Link to='/users'>
        <button className='mini-nav-buttons'>Users</button>
        </Link>
        <Link to='/reporting'>
        <button className='mini-nav-buttons'>Reporting</button>
        </Link>
        
        <button className='mini-nav-buttons' onClick={logout}>Logout</button>
        
    </nav>
  );
}
