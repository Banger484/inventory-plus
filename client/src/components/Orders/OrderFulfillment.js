import { useQuery,useMutation} from "@apollo/client"
import {GET_OPEN_SALES} from "../../utils/queries"; 
import {  groupSales } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import { FULFILL_ITEMS } from "../../utils/mutations";

export default function OrderFulfillment ({enterpriseId}) {
    
    const [fulfillSale,{error}] = useMutation(FULFILL_ITEMS)

   
    const { loading: openSaleItemsLoading, data: openSaleItemsData, refetch } = useQuery(GET_OPEN_SALES, {
        variables: { enterpriseId:enterpriseId}
    })
    if (openSaleItemsData) {
        refetch()
    }

    const openSalesGroup = openSaleItemsLoading?[]:groupSales(openSaleItemsData.getOpenSales)
    console.log(openSalesGroup)
    const handleFulfill = (e)=>{
        refetch()
        const index = e.target.dataset.index;
        const variables = {
            enterpriseId:enterpriseId,
            saleNumber:parseInt(e.target.dataset.orderNumber),
            fulfillmentDate:orderDate(new Date()),
        }
        fulfillSale({variables})
    }

    return (
        <div>
            <h1>Fulfill Sale</h1>
            {openSaleItemsLoading
        ? <h2>Loading</h2>
        :  <table><thead>
             <tr>
                        <th>Sale #</th>
                        <th>Sale Date</th>
                        <th>Buyer</th>
                        <th>Items</th>
                        <th>Fulfill!</th>
                    </tr>
        </thead>
                <tbody>
                    {openSalesGroup.map((order,index)=>{
                        return(<tr key={index} data-order={order.number}>
                            <td>{order.number}</td>
                            <td>{orderDate(order.date)}</td>
                            <td>{order.buyer}</td>
                            <td>{order.itemList}</td>
                            <td><button data-order-number={order.number} data-index={index} onClick={handleFulfill}>Receive!</button></td>
                        </tr>
)
                    })}

                </tbody>
            </table>












      }
                
        </div>
    )
}