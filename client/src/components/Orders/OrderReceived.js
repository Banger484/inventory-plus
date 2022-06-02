import { useQuery,useMutation, from } from "@apollo/client"
import {GET_INCOMING_ITEMS,GET_OPEN_SALES} from "../../utils/queries"; 
import { groupOrders } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import { RECEIVE_ITEMS } from "../../utils/mutations";
import './Order.css'
export default function OrderReceived ({enterpriseId}) {
    
    const [receiveOrder,{error}] = useMutation(RECEIVE_ITEMS)

    const { loading: incomingItemsLoading, data: incomingItemsData, refetch } = useQuery(GET_INCOMING_ITEMS, {
        variables: { enterpriseId:enterpriseId}
    })
    // const { loading: openSaleItemsLoading, data: openSaleItemsData } = useQuery(GET_OPEN_SALES, {
    //     variables: { enterpriseId:enterpriseId}
    // })
    if(incomingItemsData) {
        refetch()
    }

    const incomingOrders = incomingItemsLoading?null:groupOrders(incomingItemsData.getOrderedItems)
    
    const handleFulfill = (e)=>{
        const index = e.target.dataset.index;
        const binLocation = e.target.parentNode.parentNode.lastElementChild.childNodes[0].value
        const variables = {
            enterpriseId:enterpriseId,
            orderNumber:parseInt(e.target.dataset.orderNumber),
            receivedDate:orderDate(new Date()),
            binLocation
        }
        receiveOrder({variables})
        refetch()
    }

    return (
        <div>
            <h1>Receive Order</h1>
            {incomingItemsLoading
        ? <h2>Loading</h2>
        :  <table className="order-table">
            <thead>
                <tr className="order-header">
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
                        return(<tr data-order={order.number}>
                            <td>{order.number}</td>
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
                
        </div>
    )
}