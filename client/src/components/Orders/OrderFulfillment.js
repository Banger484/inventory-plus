// Imports custom css file and requires all dependant files
import { useQuery, useMutation } from "@apollo/client"
import { GET_OPEN_SALES } from "../../utils/queries";
import { groupSales } from "../../utils/remodeledData";
import orderDate from "../../utils/orderDate";
import { FULFILL_ITEMS } from "../../utils/mutations";
import { useState } from "react";
import { stringifyProperties } from "../../utils/filter";

export default function OrderFulfillment({ enterpriseId }) {

    const [fulfillSale, { error }] = useMutation(FULFILL_ITEMS)
    const [date, setDate] = useState( orderDate())
    const [searchTerm,setSearchTerm] = useState("")
    const { loading: openSaleItemsLoading, data: openSaleItemsData, refetch } = useQuery(GET_OPEN_SALES, {
        variables: { enterpriseId: enterpriseId }
    })
    if (openSaleItemsData) {
        refetch()
    }

    const handleDateChange = (e)=>{
        console.log(e)
        setDate(e.target.value)
    }

    const openSalesGroup = openSaleItemsLoading ? [] : groupSales(openSaleItemsData.getOpenSales)
    const handleFulfill = (e) => {
        const index = e.target.dataset.index;
        const variables = {
            enterpriseId: enterpriseId,
            saleNumber: parseInt(e.target.dataset.orderNumber),
            fulfillmentDate: date,
        }
        fulfillSale({ variables })
        refetch()

    }

    if(openSaleItemsLoading){
        return(
            <div>Loading...</div>
        )
    }

    const searchedRows = openSalesGroup.filter(p=>{
        return stringifyProperties(p).toLowerCase().includes(searchTerm.toLowerCase())
    })



    return (
        <div className="big-center-flex">
            <div className="table-top rec-order-tt">
            <h1>Fulfill Sale</h1>
            </div>

            <input onChange={handleDateChange} type="date"/>
            <div className="search-bar">
                <input onChange={(e)=>setSearchTerm(e.target.value)}/>
            </div>
            {openSaleItemsLoading
                ? <h2>Loading</h2>
                : <table className="product-list-table"><thead>
                    <tr>
                        <th>Sale #</th>
                        <th>Sale Date</th>
                        <th>Buyer</th>
                        <th>Items</th>
                        <th>Fulfill!</th>
                    </tr>
                </thead>
                    <tbody>
                        {openSalesGroup.map((order, index) => {
                            return (<tr  className={searchedRows.includes(order)?"":"hide"}  key={index} data-order={order.number}>
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