import '../Layout/Dashboard.css'
import { Link } from 'react-router-dom'

export default function ProductDashboard () {
    return (
        <section className='task-container'>
            <Link className='task-links' to="/products/add-product">
            <div className='task'>
                <div className='task-header'>
                    <h2>Add Product</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/add.png" alt='icon'/>
                </div>
            </div>
            </Link>
            <Link className='task-links' to="/products/product-guide">
            <div className='task'>
                <div className='task-header'>
                    <h2>Product Guide</h2>
                </div>
                <div className='task-image'>
                <img className="button-icon" src="/images/icons/write.png" alt='icon'/>
                </div>
            </div>
            </Link>
        </section>
    )
}