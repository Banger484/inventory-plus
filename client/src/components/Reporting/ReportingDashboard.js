 import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

export default function ReportingDashboard () {
    return (
        <section className='grid-container grid-container-reporting'>
            {/* <Link className='task-links' to="/reporting/current-supply">
            <div className='task'>
                <div className='task-header'>
                    <h2>Current Supply</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table2.png" alt='icon'/>
                </div>
            </div>
            </Link> */}
            <Link className='dash-grid-main' to="/reporting/product">
            <div className='task'>
                <div className='task-header'>
                    <h2>Product Report</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/text.png" alt='icon'/>
                </div>
            </div>
            </Link>
            {/* <Link className='task-links' to="/reporting/third-report">
            <div className='task'>
                <div className='task-header'>
                    <h2>Third Report</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting2.png" alt='icon'/>
                </div>
            </div>
            </Link> */}
        </section>
    )
}