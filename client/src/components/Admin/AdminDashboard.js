import { Link } from 'react-router-dom'
import { Logout } from '../Users/logout'
export const AdminDashboard = ()=>{
    return (
       <section>
                                <Logout/>
            <Link className='task-links' to="/admin/users">
            <div className='task'>
                <div className='task-header'>
                    <h2>Users</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/admin/products">
            <div className='task'>
                <div className='task-header'>
                    <h2>Products</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            </Link>
       </section>
    )
}