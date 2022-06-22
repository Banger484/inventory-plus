import { useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_MONTH_TO_MONTH } from "../../utils/queries"
import { Table } from "../Table"
import { t } from "../../utils/translation/translator"
import { GET_ENTERPRISE_BY_ID } from "../../utils/queries"

export const MonthlyAnalysis = ({enterpriseId})=>{
    const [sales,setSales] = useState(true)
    const [selectedProduct,setSelectedProduct] = useState(null)
    const{loading: enterpriseLoading,data:enterpriseData} = useQuery(GET_ENTERPRISE_BY_ID,{
        variables:{id:enterpriseId}
    })
    const variables = selectedProduct==="all"?{enterpriseId}:{enterpriseId,productId:selectedProduct}
    console.log(variables)
    const {data,loading,error}=useQuery(GET_MONTH_TO_MONTH,{variables})
    
    let products;
    if (!enterpriseLoading){
        products = enterpriseData.getEnterpriseById.orderGuide;
    }
    
    if(loading){
        return(
            <div>Loading...</div>
        )
    }

    const handleProductChange = (e)=>{
        setSelectedProduct(e.target.value)
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
            <select value={selectedProduct} onChange={handleProductChange}>
                <option value={"all"}>All Products</option>
                {products.map(p=>{
                    return(
                        <option value={p._id}>{p.name}</option>
                    )
                })}
            </select>
            <Table data={addedData} excludedProperties={["__typename","month"]}/>
        </div>
    )
}