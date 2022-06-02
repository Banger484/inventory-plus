import { useQuery, useMutation } from "@apollo/client"
import { useState, useEffect } from 'react'
import { GET_CURRENT_STOCKS, GET_INCOMING_ITEMS } from "../../utils/queries";
import { BUY_ITEMS } from '../../utils/mutations'
import { generatePurchaseTableData, groupItems } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";

export default function OrderPurchase (props) {

    const [supplier, setSupplier] = useState('dummy')

    const [buyItems, { error }] = useMutation(BUY_ITEMS)

    const { loading: currentStocksLoading, data: currentStocksData } = useQuery(GET_CURRENT_STOCKS, {
        variables: { enterpriseId: props.enterpriseId}
    })
    const { loading: incomingItemsLoading, data: incomingItemsData } = useQuery(GET_INCOMING_ITEMS, {
        variables: { enterpriseId: props.enterpriseId}
    })
    let currentStocksGroups
    let incomingItemsGroups
    let tableData = []

    
    if(!currentStocksLoading && !incomingItemsLoading){
        currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
        incomingItemsGroups = groupItems(incomingItemsData.getOrderedItems)
        tableData = generatePurchaseTableData(props.orderGuide, currentStocksGroups, incomingItemsGroups)
        }


    const handleSupplierChange = (e) => {
        setSupplier(e.target.value)
    }
    const handleInputChange = (e) => {
        const index = e.target.dataset.index
        tableData[index][e.target.name] = parseInt(e.target.value)
    }
    const [updatedTable, setUpdatedTable] = useState([])
    
    const handleSubmit = async () => {
        
        const filterTableData = tableData.filter(data => data.newOrderQty > 0)
        const orderNumber = Date.now() % 1000000
        console.log(orderNumber);
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
        } catch (err) {
            console.error(err);
        }

    }
    return (
        <div>
            <div>
                <input type='text' placeholder="supplier" onChange={handleSupplierChange}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            <table className='order-list-table'>
                <thead>
                    <tr>
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
                            <td data-pid={product._id}>{product.sku}</td>
                            <td data-pid={product._id}>{product.name}</td>
                            <td data-pid={product._id}>{product.description}</td>
                            <td data-pid={product._id}>${product.msrp}</td>
                            <td data-pid={product._id}>{product.category}</td>
                            <td data-pid={product._id}>{product.notes}</td>
                            <td data-pid={product._id}>{product.current}</td>
                            <td data-pid={product._id}>{product.incoming}</td>
                            <td data-pid={product._id}><input data-index={index} name="newOrderCostPerUnit" type="number" min="0" onChange={handleInputChange}></input></td>
                            <td><input data-index={index} name="newOrderQty" type="number" min="0" onChange={handleInputChange}/></td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}