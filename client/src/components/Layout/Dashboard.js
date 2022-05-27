import './Dashboard.css'

export default function Dashboard () {
    return (
        <section className='task-container'>
            <div className='task'>
                <div className='task-header'>
                    <h2>Current Stock</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/table1.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>Order History</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting1.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>Reporting</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/reporting2.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>Add Product</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/add.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>Update Product</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/update.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>New Purchase</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/arrowDown.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>New Sale</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/arrowUp.png" alt='icon'/>
                </div>
            </div>
            <div className='task'>
                <div className='task-header'>
                    <h2>Product Guide</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/gear.png" alt='icon'/>
                </div>
            </div>

        </section>
    )
}