import { useQuery, useMutation } from "@apollo/client"
import { useState, useEffect } from 'react'
import { GET_CURRENT_STOCKS, GET_INCOMING_ITEMS } from "../../utils/queries";
import { BUY_ITEMS } from '../../utils/mutations'
import { groupItems, generatePurchaseTableData } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import './Order.css'

import OrderModal from "./OrderModal";

export default function OrderPurchase (props) {
    //modal junk
    const [openModal, setOpenModal] = useState(false)



    let supplier = "not specified"

    const [buyItems, { error }] = useMutation(BUY_ITEMS)

    const { loading: currentStocksLoading, data: currentStocksData, refetch: currentRefetch } = useQuery(GET_CURRENT_STOCKS, {
        variables: { enterpriseId: props.enterpriseId}
    })
    const { loading: incomingItemsLoading, data: incomingItemsData, refetch: incomingRefetch } = useQuery(GET_INCOMING_ITEMS, {
        variables: { enterpriseId: props.enterpriseId}
    })

    let currentStocksGroups
    let incomingItemsGroups
    let tableData = []
    let orderNumber = Date.now() % 1000000

    
    if(!currentStocksLoading && !incomingItemsLoading){
        incomingRefetch()
        currentRefetch()
        currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
        incomingItemsGroups = groupItems(incomingItemsData.getOrderedItems)
        tableData = generatePurchaseTableData(props.orderGuide, currentStocksGroups, incomingItemsGroups)
    }

    const handleSupplierChange = (e) => {
        supplier = e.target.value
    }
    const handleInputChange = (e) => {
        const index = e.target.dataset.index
        tableData[index][e.target.name] = parseInt(e.target.value)
    }
    const [updatedTable, setUpdatedTable] = useState([])
    const handleSubmit = async () => {
        
        const filterTableData = tableData.filter(data => data.newOrderQty > 0)

        try {
            await filterTableData.forEach(async (product) => {
                await buyItems({
                    variables: {
                        quantity: product.newOrderQty,
                        productId: product._id,
                        orderNumber,
                        cost: product.newOrderCostPerUnit,
                        purchaseDate: orderDate(),
                        supplier,
                        enterpriseId: props.enterpriseId
                    }
                })

            })
            setOpenModal(true)
        } catch (err) {
            console.error(err);
        }

    }
    return (
        <div>
            {openModal && <OrderModal orderNumber={orderNumber} closeModal={setOpenModal}/>}
            <div className="table-top purchase-order-header">
                <h1>Purchase Order</h1>
                <input type='text' onChange={handleSupplierChange} placeholder="Please enter supplier's name"/>
            </div>
            <table className='order-table'>
                <thead>
                    <tr className="order-header">
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>MSRP</th>
                        <th>Category</th>
                        <th>Notes</th>
                        <th>Current</th>
                        <th>Incoming</th>
                        <th>Cost</th>
                        <th>Order Qty</th>
                    </tr>
                </thead>
                    <tbody>
                    {tableData.map((product, index) => {
                        return (
                        <tr data-pid={product._id} key={index}>
                            <td className="td-1" data-pid={product._id}>{product.sku}</td>
                            <td className="td-3" data-pid={product._id}>{product.name}</td>
                            <td className="td-4" data-pid={product._id}>{product.description}</td>
                            <td className="td-1" data-pid={product._id}>${product.msrp}</td>
                            <td className="td-2" data-pid={product._id}>{product.category}</td>
                            <td className="td-4" data-pid={product._id}>{product.notes}</td>
                            <td className="td-1" data-pid={product._id}>{product.current}</td>
                            <td className="td-1" data-pid={product._id}>{product.incoming}</td>
                            <td className="td-1" data-pid={product._id}><input className="td-1" data-index={index} name="newOrderCostPerUnit" type="number" min="0" onChange={handleInputChange} /></td>
                            <td className="td-1" ><input className="td-1" data-index={index} name="newOrderQty" type="number" min="0" onChange={handleInputChange} /></td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div>
                <button className="order-submit" type="submit" onClick={handleSubmit}>Submit Order</button>
                </div>
        </div>
    )
}