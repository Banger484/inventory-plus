import ChartistGraph from 'react-chartist';
import { PAST_BUYERS,CURRENT_STOCK_QUANTITIES,PAST_SALES_QUANTITIES,ALL_PURCHASES, PAST_SUPPLIERS } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import { otherizeArray } from '../../../utils/remodeledData';
export const StockPie = ({enterpriseId,setProperty,queryType,name,number,productId})=>{
    console.log("name",name)

    const queries = {
        current:{name:CURRENT_STOCK_QUANTITIES,function:"currentStocksQuantity"},
        sales:{name:PAST_SALES_QUANTITIES,function:"pastSalesQuantity"},
        purchases:{name:ALL_PURCHASES,function:"allPastPurchases"},
        suppliers:{name:PAST_SUPPLIERS,function:"pastSuppliers",variables:{productId}},
        buyers:{name:PAST_BUYERS,function:"pastBuyers",variables:{productId}}
    }
    console.log(queries[queryType].name)
    const {data:queryData,error,loading} = useQuery(queries[queryType].name,{variables:{enterpriseId,...queries[queryType].variables}})

let addedData;

console.log(queryData)


if(loading){
    return (
        <div>Loading...</div>
        )
    }
    addedData = queryData?.[queries[queryType].function]
    addedData = otherizeArray(addedData,4,name,number)
console.log(addedData)
const data = {
    labels: addedData.map(a=>a[name]),
    series: addedData.map(a=>{
            a= {...a}
            a.product = a[name]
            console.log(a)
            return {
                name:a[name],
                value:a[number]
            }})
}


const options = {
    width:"400px",
    showLabel:true,
    donut:true,
    donutWidth:"150",
    donutSolid:true
}

return(
    <div className='pie'>
    <ChartistGraph data={data} options={options} type="Pie"/>
    </div>
)

}