 import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

export default function ReportingDashboard () {
    return (
        <section className='grid-container'>
            <Link className='dash-grid-main gi-1' to="/reporting/charts">
            <div className='task'>
                <div className='task-header'>
                    <h2>Charts</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting2.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='dash-grid-main gi-2' to="/reporting/product">
            <div className='task'>
                <div className='task-header'>
                    <h2>Product Report</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/text.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='dash-grid-main gi-3' to="/reporting/month-to-month-report">
            <div className='task'>
                <div className='task-header'>
                    <h2>Month to Month Report</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting2.png" alt='icon'/>
                </div>
            </div>
            </Link>
        </section>
    )
}