import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_MONTH_TO_MONTH } from "../../utils/queries"

export const MonthlyAnalysis = ({enterpriseId})=>{
    const [sales,setSales] = useState(true)
    const {data,loading,error}=useQuery(GET_MONTH_TO_MONTH,{variables:{enterpriseId,sales}})
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    console.log(data)
    return(
        <div>
            Monthly Analysis
        </div>
    )
}