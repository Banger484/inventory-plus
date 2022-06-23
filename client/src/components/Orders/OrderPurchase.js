import { useQuery, useMutation } from "@apollo/client"
import { useState, useEffect } from 'react'
import { GET_CURRENT_STOCKS, GET_INCOMING_ITEMS } from "../../utils/queries";
import { BUY_ITEMS } from '../../utils/mutations'
import { groupItems, generatePurchaseTableData } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import './Order.css'

import OrderModal from "./OrderModal";
import { stringifyProperties } from "../../utils/filter";

export default function OrderPurchase (props) {
    //modal junk
    const [openModal, setOpenModal] = useState(false)
    const [date, setDate] = useState( orderDate())
    const [orderNumber,setOrderNumber] =useState(props.enterprise.getEnterpriseById.orderNumber)

    const [supplier,setSupplier] = useState("Not specified")

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
    const [searchTerm,setSearchTerm] = useState("")
    
    if(!currentStocksLoading && !incomingItemsLoading){
        incomingRefetch()
        currentRefetch()
        currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
        incomingItemsGroups = groupItems(incomingItemsData.getOrderedItems)
        tableData = generatePurchaseTableData(props.orderGuide, currentStocksGroups, incomingItemsGroups)
    }

    
    const handleSupplierChange = (e) => {
        setSupplier(e.target.value)
    }

    const [quantities,setQuantities] = useState({})

    const handleInputChange = (e) => {
        const index = e.target.dataset.index
        let val;
        if(e.target.name==="newOrderQty"){
            val = parseInt(e.target.value)
        }else{
            val = parseFloat(e.target.value)
        }
        const newQuantities = {...quantities};
        if (!newQuantities[e.target.dataset.pid]){
            newQuantities[e.target.dataset.pid] = {}
        }
        newQuantities[e.target.dataset.pid][e.target.name] = val
        setQuantities(newQuantities)
    }

    const handleDateChange = (e)=>{
        setDate(e.target.value)
        
    }
    

    const handleSubmit = async () => {

        const filterTableData = tableData.filter(data => quantities?.[data._id]?.newOrderQty > 0)

        try {
            filterTableData.forEach(async (product) => {
                console.log("this is the input",product.newOrderCostPerUnit)
                console.log("this is the quantities",)
                const variables = {
                    quantity: quantities[product._id].newOrderQty,
                    productId: product._id,
                    orderNumber,
                    cost: quantities[product._id].newOrderCostPerUnit,
                    purchaseDate: date,
                    supplier,
                    enterpriseId: props.enterpriseId
                }
                console.log(variables)
                await buyItems({
                    variables
                })

            })
            setOpenModal(true);
            setOrderNumber(orderNumber+1)
            setQuantities({})
        } catch (err) {
            console.error(err);
        }

    }

    const searchedRows = tableData.filter(p=>{
        return stringifyProperties(p).toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div>
            {openModal && <OrderModal orderNumber={orderNumber} closeModal={setOpenModal}/>}
            <div className="table-top purchase-order-header">
                <h1>Purchase Order</h1>
                <input type='text' onChange={handleSupplierChange} placeholder="Please enter supplier's name"/>
                <input onChange={handleDateChange} type="date"/>
            </div>
            <div className="search-bar">
                <input onChange={(e)=>setSearchTerm(e.target.value)}/>
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
                        <tr className={searchedRows.includes(product)?"":"hide"} data-pid={product._id} key={index}>
                            <td className="td-1" data-pid={product._id}>{product.sku}</td>
                            <td className="td-3" data-pid={product._id}>{product.name}</td>
                            <td className="td-4" data-pid={product._id}>{product.description}</td>
                            <td className="td-1" data-pid={product._id}>${product.msrp}</td>
                            <td className="td-2" data-pid={product._id}>{product.category}</td>
                            <td className="td-4" data-pid={product._id}>{product.notes}</td>
                            <td className="td-1" data-pid={product._id}>{product.current}</td>
                            <td className="td-1" data-pid={product._id}>{product.incoming}</td>
                            <td className="td-1" data-pid={product._id}>
                                <input className="td-1"  data-pid={product._id} data-index={index} name="newOrderCostPerUnit" type="number" step=".01" min="0" onChange={handleInputChange} />
                            </td>
                            <td className="td-1" ><input  data-pid={product._id} className="td-1" data-index={index} name="newOrderQty" type="number" min="0" onChange={handleInputChange} /></td>
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