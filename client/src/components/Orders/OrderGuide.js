import './OrderGuide.css'
import OrderList from "./OrderList"
import ProductList from '../Products/ProductList'

export default function OrderGuide () {
    
    return (
    <>
        <div className="order-guide-content">
            <div className="order-guide-sides">
            <h1>Order Guide</h1>
                <OrderList />

            </div>
            <div className="order-guide-sides">
            <h1>Full Product List</h1>

                <ProductList />
            </div>
        </div>
    </>
    )
}