 import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

export default function ReportingDashboard () {
    return (
        <section className='task-container'>
            <Link className='task-links' to="/reporting/current-supply">
            <div className='task'>
                <div className='task-header'>
                    <h2>Current Supply</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table2.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/reporting/second-report">
            <div className='task'>
                <div className='task-header'>
                    <h2>Second Report</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting1.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/reporting/third-report">
            <div className='task'>
                <div className='task-header'>
                    <h2>Third Report</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting2.png" alt='icon'/>
                </div>
            </div>
            </Link>
        </section>
    )
}