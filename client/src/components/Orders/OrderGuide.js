import './OrderGuide.css'
import OrderList from "./OrderList"
import ProductList from '../Products/ProductList'
import { REMOVE_FROM_ORDERGUIDE, ADD_TO_ORDERGUIDE} from '../../utils/mutations'
import {} from '../../utils/queries'

export default function OrderGuide () {
    
    const buttons = true

    return (
    <>
        <div className="order-guide-content">
            <div className="order-guide-sides">
            <h1>Order Guide</h1>
                <OrderList buttons={buttons} />

            </div>
            <div className="order-guide-sides">
            <h1>Full Product List</h1>

                <ProductList buttons={buttons} />
            </div>
        </div>
    </>
    )
}