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

    for (let i = 0;i<addedData.length;i++){
        if(i===0){
            addedData[i].startingStock = 0
        }else{
            addedData[i].startingStock = addedData[i-1].startingStock+addedData[i-1].numberPurchased-addedData[i-1].numberSold
        }
    }
    for (let i = 0;i<addedData.length;i++){
        if(i===(addedData.length-1)){
            addedData[addedData.length-1].endingStock = addedData[i].startingStock+addedData[i].numberPurchased-addedData[i].numberSold
        }else{
            addedData[i].endingStock = addedData[i+1].startingStock
        }
    }


    return(
        <div>
            <div  className="product-selector-cont">
            <select value={selectedProduct} onChange={handleProductChange}>
                <option value={"all"}>All Products</option>
                {products.map(p=>{
                    return(
                        <option value={p._id}>{p.name}</option>
                    )
                })}
            </select>
            </div>
            <Table  data={addedData} excludedProperties={["__typename","month"]}/>
        </div>
    )
}