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
    const [date, setDate] = useState( orderDate())
    const [saleNumber,setSaleNumber] = useState(props.enterprise.getEnterpriseById.saleNumber)
    // const [buyer, setBuyer] = useState('dummy')
    console.log(props)

    const [buyer,setBuyer] = useState("Not specified")
    const [sellItems, { error }] = useMutation(SELL_ITEMS)

    const { loading: currentStocksLoading, data: currentStocksData, refetch } = useQuery(GET_CURRENT_STOCKS, {
        variables: { enterpriseId: props.enterpriseId}
    })

    let currentStocksGroups
    let tableData = []

    
    if(!currentStocksLoading ){
        refetch()
        currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
        tableData = generateSalesTableData(props.orderGuide, currentStocksGroups)
    }


    const handleSupplierChange = (e) => {
        setBuyer(e.target.value)
    }
    const handleInputChange = (e) => {
        const index = e.target.dataset.index
        let val;
        if(e.target.name==="newOrderQty"){
            val = parseInt(e.target.value)
        }else{
            val = parseFloat(e.target.value)
        }
        tableData[index][e.target.name] = val
    }

    const handleDateChange = (e)=>{
        console.log(e)
        setDate(e.target.value)
    }

    const handleSubmit = async () => {
        const filterTableData = tableData.filter(data => data.newSaleQty > 0)
        try {
            await filterTableData.forEach(async (product) => {
                const variables = {
                    quantity: product.newSaleQty,
                    productId: product._id,
                    saleId:saleNumber,
                    salesPrice: product.newSalePricePerUnit,
                    saleDate: date,
                    buyer,
                    enterpriseId: props.enterpriseId
                }
                console.log(variables)
                await sellItems({
                    variables
                })

            })
            setOpenModal(true)
            setSaleNumber(saleNumber+1)
        } catch (err) {
            console.error(err);
        }}


    return (
        <div>
            {openModal && <OrderModal orderNumber={saleNumber-1} closeModal={setOpenModal}/>}
            <div className="table-top">
                <h1>Sell Order</h1>
                <input type='text' onChange={handleSupplierChange} placeholder="Enter Buyer"/>
                <input onChange={handleDateChange} type="date"/>
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
                            <td className="td-1" data-pid={product._id}><input className="td-1" step={0.01} data-index={index} name="newSalePricePerUnit" type="number" min="0" onChange={handleInputChange}></input></td>
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