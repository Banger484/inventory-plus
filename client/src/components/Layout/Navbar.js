import './Navbar.css'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth';

export default function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
  return (
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
