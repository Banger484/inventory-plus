import { dummyProductMonths } from "./dummyData"
import { useState } from "react"
import {MonthBar} from "./Charts/SalesByMonth"
import { GET_ENTERPRISE_BY_ID } from "../../utils/queries"
import { useQuery } from "@apollo/client"
import { t } from "../../utils/translation/translator"
import { StockPie } from "./Charts/StockPie"

export const Charts = ({enterpriseId})=>{

const{loading: enterpriseLoading,data:enterpriseData} = useQuery(GET_ENTERPRISE_BY_ID,{
        variables:{id:enterpriseId}
    })

const [chart,selectChart] = useState(null)
const [productId,setProductId] = useState(false)
const [property,setProperty] = useState(null)

const handleChartSelector = (e)=>{
    const {chartName,property} = JSON.parse(e.target.value)
    selectChart(chartName);
    setProperty(property)

}
let products
if (!enterpriseLoading){
    products = enterpriseData.getEnterpriseById.orderGuide;
}

const handleProductChange = (e)=>{
    setProductId(e.target.value)
}

return(
    <section className="chart-cont">
        <select onChange={handleChartSelector}>
            <option value={false}> Pick a Chart</option>
            <option value={JSON.stringify({chartName:"salesByMonth",property:["numberSold"]})}>Sales By Month</option>
            <option value={JSON.stringify({chartName:"purchasesByMonth",property:["numberPurchased"]})}>Purchases By Month</option>
            <option value={JSON.stringify({chartName:"activityByMonth",property:["numberPurchased","numberSold"]})}>Total Activity By Month</option>
            <option value={JSON.stringify({chartName:"costByMonth",property:["totalCost"]})}>Cost By Month</option>
            <option value={JSON.stringify({chartName:"totalSales",property:["totalIncome"]})}>Gross Sales Income By Month</option>
            <option value={JSON.stringify({chartName:"netSalesIncome",property:["totalCost","totalIncome","netSalesIncome"]})}>Purchase/Sales Cashflow</option>
            <option value={JSON.stringify({chartName:"currentStocksPie",property:null})}>Current Stocks</option>
        </select>
        {property?(

      
        <div  className="product-selector-cont">
            <select value={productId} onChange={handleProductChange}>
                <option value={null}>Pick a Product</option>
                {products.map(p=>{
                    return(
                        <option value={p._id}>{p.name}</option>
                    )
                })}
            </select>
        </div>
          ):null
        }
        {!chart?<div>Pick a chart</div>:null}
        {chart==="salesByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberSold"]}/>:null}
        {chart==="purchasesByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberPurchased"]}/>:null}
        {chart==="activityByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberPurchased","numberSold"]}/>:null}
        {chart==="costByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalCost"]}/>:null}
        {chart==="totalSales"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalIncome"]}/>:null}
        {chart==="netSalesIncome"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalCost","totalIncome","netSalesIncome"]}/>:null}
        {chart==="currentStocksPie"?<StockPie setProperty={setProperty} enterpriseId={enterpriseId}/>:null}
        {property?(
            <section className="legend">
                {property.map(p=>{
                return(<div className="legend-div">
                    <div className="legend-square"></div>
                    <span>{t(p)}</span>
                </div>)})}
            </section>

        ):null}
    </section>
)

}