import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

export default function UserDashboard () {
    return (
        <section className='grid-container grid-container-settings'>
            <Link className='dash-grid-main' to="/users/add-user">
            <div className='task'>
                <div className='task-header'>
                    <h2>Add User</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/addUser.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='dash-grid-main' to="/users/roster">
            <div className='task'>
                <div className='task-header'>
                    <h2>Employee Roster</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/users.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='dash-grid-main' to="/users/roster">
            <div className='task'>
                <div className='task-header'>
                    <h2>Preferences</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/gear.png" alt='icon'/>
                </div>
            </div>
            </Link>

        </section>
    )
}