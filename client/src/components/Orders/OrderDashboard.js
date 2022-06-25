// Imports custom css file and requires all dependant files
import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

// Function to create icons and link html for order dasbboard. exports function
export default function OrderDashboard ({ incomingOrderCount, salesCount, incomingItemsRefetch, salesRefetch }) {
    incomingItemsRefetch()
    salesRefetch()
    return (
        <section className='grid-container grid-container-order'>
            <Link className='dash-grid-main' to="/orders/purchase-order">
            <div className='task'>
                <div className='task-header'>
                    <h2>Purchase Order</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/arrowDown.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <p className='order-arrows  dash-grid-main'>➤</p>
            <Link className='dash-grid-main' to="/orders/order-received">
            <div className='task'>
                <div className='task-header'>
                    <h2>Receive Order</h2>{incomingOrderCount? <div className='order-count'>{incomingOrderCount}</div> : null}
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/completed.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <p className='order-arrows dash-grid-main'>➤</p>
            <Link className='dash-grid-main' to="/orders/sell-order">
            <div className='task'>
                <div className='task-header'>
                    <h2>Sell Order</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/arrowUp.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <p className='order-arrows dash-grid-main'>➤</p>
            <Link className='dash-grid-main' to="/orders/order-fulfillment">
            <div className='task'>
                <div className='task-header'>
                    <h2>Order Fulfillment</h2>{salesCount? <div className='order-count'>{salesCount}</div> : null}
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/sale.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='gi-8' to="/orders/order-guide">
            <div className='task'>
                <div className='task-header'>
                    <h2>Order Guide</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/write.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='gi-9' to="/orders/stock-guide">
            <div className='task'>
                <div className='task-header'>
                    <h2>Stock Guide</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            </Link>
        </section>
    )
}