import ChartistGraph from 'react-chartist';
import { CURRENT_STOCK_QUANTITIES } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import { otherizeArray } from '../../../utils/remodeledData';
export const StockPie = ({enterpriseId,setProperty})=>{

    const {data:queryData,error,loading} = useQuery(CURRENT_STOCK_QUANTITIES,{variables:{enterpriseId}})

const dummyData = [{
    product:"Bottle",
    quantity:47
},
{
    product:"Baking Soda",
    quantity:56
},
{product:"Grease",
quantity:94
},
{
    product:"Other",
    quantity:39
}
]

let addedData;



if(loading){
    return (
        <div>Loading...</div>
        )
    }
    addedData = queryData?.currentStocksQuantity
    addedData = otherizeArray(addedData,3,"product","quantity")
console.log(queryData)
const data = {
    labels: addedData.map(a=>a.product),
    series: addedData.map(a=>{
            return {
                value:a.quantity,
                name:a.product
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