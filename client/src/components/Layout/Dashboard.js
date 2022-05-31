import './Dashboard.css'
import { Link } from 'react-router-dom'

export default function Dashboard () {
    return (
        <section className='task-container'>
            <Link to="/products">
            <div className='task'>
                <div className='task-header'>
                    <h2>Products</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link to="/orders">
            <div className='task'>
                <div className='task-header'>
                    <h2>Orders</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/gear.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link to="/reporting">
            <div className='task'>
                <div className='task-header'>
                    <h2>Reporting</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting2.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link to="/login">
            <div className='task'>
                <div className='task-header'>
                    <h2>Login</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link to="/signup">
            <div className='task'>
                <div className='task-header'>
                    <h2>Signup</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            </Link>
        </section>
    )
}