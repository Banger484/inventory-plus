import { useQuery, useMutation } from "@apollo/client"
import { useState } from 'react'
import { GET_CURRENT_STOCKS } from "../../utils/queries";
import { SELL_ITEMS } from '../../utils/mutations'
import { generateSalesTableData, groupItems } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import './Order.css'

import OrderModal from "./OrderModal";

export default function OrderSell (props) {
    //modal junk
    const [openModal, setOpenModal] = useState(false)

    // const [buyer, setBuyer] = useState('dummy')


    let buyer = "dummy"
    const [sellItems, { error }] = useMutation(SELL_ITEMS)

    const { loading: currentStocksLoading, data: currentStocksData, refetch } = useQuery(GET_CURRENT_STOCKS, {
        variables: { enterpriseId: props.enterpriseId}
    })

    let currentStocksGroups
    let tableData = []
    let saleNumber = Date.now() % 1000000

    
    if(!currentStocksLoading ){
        refetch()
        currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
        tableData = generateSalesTableData(props.orderGuide, currentStocksGroups)
    }


    const handleSupplierChange = (e) => {
        buyer=e.target.value
    }
    const handleInputChange = (e) => {
        const index = e.target.dataset.index
        tableData[index][e.target.name] = parseInt(e.target.value)
        console.log(tableData[0])
    }
    const handleSubmit = async () => {
        console.log(tableData[0])
        const filterTableData = tableData.filter(data => data.newSaleQty > 0)
        console.log(filterTableData)
        try {
            await filterTableData.forEach(async (product) => {
                const variables = {
                    quantity: product.newSaleQty,
                    productId: product._id,
                    saleId:saleNumber,
                    salesPrice: product.newSalePricePerUnit,
                    saleDate: orderDate(),
                    buyer,
                    enterpriseId: props.enterpriseId
                }
                console.log(variables);
                await sellItems({
                    variables
                })

            })
            setOpenModal(true)
        } catch (err) {
            console.error(err);
        }}


    return (
        <div>
            {openModal && <OrderModal orderNumber={saleNumber} closeModal={setOpenModal}/>}
            <div className="buy-table-top">
                <h1>Sell Order</h1>
                <input type='text' onChange={handleSupplierChange} placeholder="Enter Buyer"/>
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
                        <th>Price</th>
                        <th>Qty</th>
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
                            <td className="td-1" data-pid={product._id}><input className="td-1" data-index={index} name="newSalePricePerUnit" type="number" min="0" onChange={handleInputChange}></input></td>
                            <td className="td-1" ><input className="td-1" data-index={index} name="newSaleQty" type="number" min="0" max={product.current} onChange={handleInputChange}/></td>
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