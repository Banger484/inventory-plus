import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

export default function OrderDashboard () {
    return (
        <section className='task-container'>
            <Link className='task-links' to="/orders/purchase-order">
            <div className='task'>
                <div className='task-header'>
                    <h2>Purchase Order</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/arrowDown.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/orders/sell-order">
            <div className='task'>
                <div className='task-header'>
                    <h2>Sell Order</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/arrowUp.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/orders/order-received">
            <div className='task'>
                <div className='task-header'>
                    <h2>Receive Order</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/completed.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/orders/order-fulfillment">
            <div className='task'>
                <div className='task-header'>
                    <h2>Order Fulfillment</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/completed.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/orders/order-guide">
            <div className='task'>
                <div className='task-header'>
                    <h2>Order Guide</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/write.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link to="/orders/order-history">
            <div className='task'>
                <div className='task-header'>
                    <h2>Order History</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/history.png" alt='icon'/>
                </div>
            </div>
            </Link>
        </section>
    )
}