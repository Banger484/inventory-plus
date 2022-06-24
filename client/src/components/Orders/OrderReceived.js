import { useQuery,useMutation, from } from "@apollo/client"
import {GET_INCOMING_ITEMS,GET_OPEN_SALES} from "../../utils/queries"; 
import { groupOrders } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import { RECEIVE_ITEMS } from "../../utils/mutations";
import "./orderReceived.css"
import { useState } from "react";
import { OrderDetails } from "../Reporting/OrderDetails";
import { t } from "../../utils/translation/translator";
import { stringifyProperties } from "../../utils/filter";

export default function OrderReceived ({enterpriseId}) {
    
    const [receiveOrder,{error}] = useMutation(RECEIVE_ITEMS)
    const [date,setDate] = useState(null)
    const { loading: incomingItemsLoading, data: incomingItemsData, refetch } = useQuery(GET_INCOMING_ITEMS, {
        variables: { enterpriseId:enterpriseId}
    })
    const [searchTerm,setSearchTerm] = useState("")
    const [orderNumberSelected,setOrderNumberSelected] = useState(false)

    if (incomingItemsData) {
        refetch()
    }

    const incomingOrders = incomingItemsLoading?null:groupOrders(incomingItemsData.getOrderedItems)
    
    const handleFulfill = (e)=>{
        console.log("this is the date input",date)
        refetch()
        const index = e.target.dataset.index;
        const binLocation = e.target.parentNode.parentNode.lastElementChild.childNodes[0].value
        const variables = {
            enterpriseId:enterpriseId,
            orderNumber:parseInt(e.target.dataset.orderNumber),
            receivedDate:date,
            binLocation
        }
        receiveOrder({variables})
        refetch()
    }

    const handleSelect = (e)=>{
        const {order} = e.target.dataset
        console.log("selected",order)
        setOrderNumberSelected(order)
    }

    const handleDateChange = (e)=>{
        setDate(e.target.value)
    }

    if(incomingItemsLoading){
        return(
            <div>Loading...</div>
        )
    }

    const searchedRows = incomingOrders.filter(p=>{
        return stringifyProperties(p).toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="big-center-flex">
            <h1>Receive Order</h1>
            <input type="date" onChange={handleDateChange}></input>
            <div className="search-bar">
                <input onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
            {incomingItemsLoading
        ? <h2>Loading</h2>
        :  <table  className="product-list-table" id="order-received-table"><thead>
             <tr>
                        <th>Order #</th>
                        <th>Order Date</th>
                        <th>Seller</th>
                        <th>Items</th>
                        <th>Receive!</th>
                        <th>Bin #</th>
                    </tr>
        </thead>
                <tbody>
                    {incomingOrders.map((order,index)=>{
                        return(<tr  className={searchedRows.includes(order)?"":"hide"} key={index} onClick={handleSelect} data-order={order.number}>
                            <td data-order={order.number}>{order.number}</td>
                            <td>{orderDate(order.date)}</td>
                            <td>{order.supplier}</td>
                            <td>{order.itemList}</td>
                            <td><button data-order-number={order.number} data-index={index} onClick={handleFulfill}>Receive!</button></td>
                            <td><input type="text"></input></td>
                        </tr>
)
                    })}

                </tbody>
            </table>
      }
      {
        orderNumberSelected?(<OrderDetails orderNumber={orderNumberSelected} enterpriseId={enterpriseId}/>):null
      }
                
        </div>
    )
}