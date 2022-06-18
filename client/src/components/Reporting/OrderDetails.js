import { useQuery } from "@apollo/client"
import { QUERY_ORDER_DETAILS } from "../../utils/queries"
import { Table } from "../Table"

export const OrderDetails = ({orderNumber,enterpriseId})=>{

  const variables = {enterpriseId,orderNumber:parseInt(orderNumber)}

    const {data,loading,error} = useQuery(QUERY_ORDER_DETAILS,{variables})
    const input = data?.orderDetails
    
    if(loading){
        return ("Loading...")
    }
    return (
        <Table data={input}  excludedProperties={["__typename","totalSales","salePerUnit","binLocation"]}/>
    )
}