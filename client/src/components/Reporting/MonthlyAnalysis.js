import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_MONTH_TO_MONTH } from "../../utils/queries"
import { Table } from "../Table"
import { t } from "../../utils/translation/translator"

export const MonthlyAnalysis = ({enterpriseId})=>{
    const [sales,setSales] = useState(true)
    const {data,loading,error}=useQuery(GET_MONTH_TO_MONTH,{variables:{enterpriseId}})
    if(loading){
        return(
            <div>Loading...</div>
        )
    }

    const addedData = [];
    data.groupItemsByMonth.forEach(i=>{
        const obj = {monthText:t(i.month),...i}
        addedData.push(obj)
    })

    addedData.sort((a,b)=>{
        return a.month-b.month
    })
    addedData.sort((a,b)=>{
        return a.year-b.year
    })

    return(
        <div>
            <Table data={addedData} excludedProperties={["__typename","month"]}/>
        </div>
    )
}