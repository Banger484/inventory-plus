import { useQuery, useMutation } from "@apollo/client"
import { useState } from 'react'
import { GET_CURRENT_STOCKS } from "../../utils/queries";
import { SELL_ITEMS } from '../../utils/mutations'
import { generateSalesTableData, groupItems } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import './Order.css'
import { stringifyProperties } from "../../utils/filter";

import OrderModal from "./OrderModal";

export default function OrderSell (props) {

    const [openModal, setOpenModal] = useState(false)
    const [date, setDate] = useState( orderDate())
    const [saleNumber,setSaleNumber] = useState(props.enterprise.getEnterpriseById.saleNumber)

    const [buyer,setBuyer] = useState("Not specified")
    const [sellItems, { error }] = useMutation(SELL_ITEMS)

    const { loading: currentStocksLoading, data: currentStocksData, refetch } = useQuery(GET_CURRENT_STOCKS, {
        variables: { enterpriseId: props.enterpriseId}
    })

    let currentStocksGroups
    let tableData = []
    const [searchTerm,setSearchTerm] = useState("")
    
    if(!currentStocksLoading ){
        refetch()
        currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
        tableData = generateSalesTableData(props.orderGuide, currentStocksGroups)
    }


    const handleSupplierChange = (e) => {
        setBuyer(e.target.value)
    }

    const [quantities,setQuantities] = useState({})

    const handleInputChange = (e) => {
        const index = e.target.dataset.index
        let val;
        if(e.target.name==="newSaleQty"){
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
        console.log(e)
        setDate(e.target.value)
    }

    const handleSubmit = async () => {
        console.log(quantities)
        const filterTableData = tableData.filter(data => quantities?.[data._id]?.newSaleQty > 0)
        
        try {
            await filterTableData.forEach(async (product) => {
                const variables = {
                    quantity: quantities[product._id].newSaleQty,
                    productId: product._id,
                    saleId:saleNumber,
                    salesPrice: quantities[product._id].newSalePricePerUnit,
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
            setQuantities({})
        } catch (err) {
            console.error(err);
        }}

        const searchedRows = tableData.filter(p=>{
            return stringifyProperties(p).toLowerCase().includes(searchTerm.toLowerCase())
        })

    return (
        <div>
            {openModal && <OrderModal orderNumber={saleNumber-1} closeModal={setOpenModal}/>}
            <div className="table-top">
                <h1>Sell Order</h1>
                <input type='text' onChange={handleSupplierChange} placeholder="Enter Buyer"/>
                <input onChange={handleDateChange} type="date"/>
            </div>
            <div className="search-bar">
                <input onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
            <table className='order-table'>
                <thead>
                    <tr className="order-header">
                        <th>Image</th>
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
                        <tr className={searchedRows.includes(product)?"":"hide"}  data-pid={product._id} key={index}>
                            <td className="td-2">{product.imageKey?(<img className='table-image' src={`/images/${product.imageKey}`}/>):null}</td>
                            <td className="td-1" data-pid={product._id}>{product.sku}</td>
                            <td className="td-3" data-pid={product._id}>{product.name}</td>
                            <td className="td-4" data-pid={product._id}>{product.description}</td>
                            <td className="td-1" data-pid={product._id}>${product.msrp}</td>
                            <td className="td-2" data-pid={product._id}>{product.category}</td>
                            <td className="td-4" data-pid={product._id}>{product.notes}</td>
                            <td className="td-1" data-pid={product._id}>{product.current}</td>
                            <td className="td-1" data-pid={product._id}><input data-pid={product._id} className="td-1" step={0.01} data-index={index} name="newSalePricePerUnit" type="number" min="0" onChange={handleInputChange}  value={quantities?.[product._id]?.newSalePricePerUnit||""}></input></td>
                            <td className="td-1" ><input data-pid={product._id} className="td-1" data-index={index} name="newSaleQty" type="number" min="0" max={product.current} onChange={handleInputChange} value={quantities?.[product._id]?.newSaleQty||0}/></td>
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