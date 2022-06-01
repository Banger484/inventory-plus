import './OrderGuide.css'
import React, { useState } from 'react'
import OrderList from "./OrderList"
import ProductList from '../Products/ProductList'
import { REMOVE_FROM_ORDERGUIDE, ADD_TO_ORDERGUIDE} from '../../utils/mutations'
import {} from '../../utils/queries'

export default function OrderGuide (props) {

    const [guideState, setGuideState] = useState(props.orderGuide)
    const buttons = true

    return (
    <>
        <div className="order-guide-content">
            <div className="order-guide-sides">
            <h1>Order Guide</h1>
                <OrderList enterpriseId={props.enterpriseId} orderGuide={guideState} setGuideState={setGuideState} buttons={buttons} />

            </div>
            <div className="order-guide-sides">
            <h1>Full Product List</h1>

                <ProductList enterpriseId={props.enterpriseId} orderGuide={guideState} setGuideState={setGuideState} products={props.products} buttons={buttons} />
            </div>
        </div>
    </>
    )
}