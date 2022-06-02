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
            <div className='table-top'>
            <h1>Order Guide</h1>
            <h1>Full Product List</h1>
            </div>
        <div className="order-guide-content">
            <div className="order-guide-sides">
                <OrderList enterpriseId={props.enterpriseId} orderGuide={guideState} setGuideState={setGuideState} buttons={buttons} />

            </div>
            <div className="order-guide-sides">

                <ProductList enterpriseId={props.enterpriseId} orderGuide={guideState} setGuideState={setGuideState} buttons={buttons} />
            </div>
        </div>
    </>
    )
}