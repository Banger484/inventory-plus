import { dummyProductMonths } from "./dummyData"
import { useState } from "react"
import {MonthBar} from "./Charts/SalesByMonth"
import { GET_ENTERPRISE_BY_ID } from "../../utils/queries"
import { useQuery } from "@apollo/client"
import { t } from "../../utils/translation/translator"
import { StockPie } from "./Charts/StockPie"
import "./charts.css"
export const Charts = ({enterpriseId})=>{

const{loading: enterpriseLoading,data:enterpriseData} = useQuery(GET_ENTERPRISE_BY_ID,{
        variables:{id:enterpriseId}
    })

const [chart,selectChart] = useState(null)
const [productId,setProductId] = useState(false)
const [property,setProperty] = useState(null)
const [queryType,setQueryType] = useState(null)
const handleChartSelector = (e)=>{
    const {chartName,property,queryType} = JSON.parse(e.target.value)
    selectChart(chartName);
    setProperty(property)
    setQueryType(queryType)
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
        <div  className="product-selector-cont">
        <select onChange={handleChartSelector}>
            <option value={false}> Pick a Chart</option>
            <option value={JSON.stringify({chartName:"salesByMonth",property:["numberSold"]})}>Sales By Month</option>
            <option value={JSON.stringify({chartName:"purchasesByMonth",property:["numberPurchased"]})}>Purchases By Month</option>
            <option value={JSON.stringify({chartName:"activityByMonth",property:["numberPurchased","numberSold"]})}>Total Activity By Month</option>
            <option value={JSON.stringify({chartName:"costByMonth",property:["totalCost"]})}>Cost By Month</option>
            <option value={JSON.stringify({chartName:"totalSales",property:["totalIncome"]})}>Gross Sales Income By Month</option>
            <option value={JSON.stringify({chartName:"netSalesIncome",property:["totalCost","totalIncome","netSalesIncome"]})}>Purchase/Sales Cashflow</option>
            <option value={JSON.stringify({chartName:"currentStocksPie",property:null,queryType:"current"})}>Current Stocks</option>
            <option value={JSON.stringify({chartName:"pastSalesPie",property:null,queryType:"purchases"})}>Past Purchases Product Breakdown</option>
            <option value={JSON.stringify({chartName:"pastPurchasesPie",property:null,queryType:"sales"})}>Past Sales Product Breakdown</option>
            <option value={JSON.stringify({chartName:"pastSuppliersPie",property:"noLegend",queryType:"suppliers"})}>Suppliers</option>
            <option value={JSON.stringify({chartName:"pastBuyersPie",property:"noLegend",queryType:"buyers"})}>Buyers</option>
        </select>
        {property?(

      
            <select value={productId} onChange={handleProductChange}>
                <option value={null}>Pick a Product</option>
                {products.map(p=>{
                    return(
                        <option value={p._id}>{p.name}</option>
                    )
                })}
            </select>
          ):null
        }
        </div>
        {!chart?<div>Pick a chart</div>:null}
        {chart==="salesByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberSold"]}/>:null}
        {chart==="purchasesByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberPurchased"]}/>:null}
        {chart==="activityByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberPurchased","numberSold"]}/>:null}
        {chart==="costByMonth"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalCost"]}/>:null}
        {chart==="totalSales"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalIncome"]}/>:null}
        {chart==="netSalesIncome"?<MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalCost","totalIncome","netSalesIncome"]}/>:null}
        {chart==="currentStocksPie"?<StockPie productId={productId} queryType={queryType} setProperty={setProperty} name="product" number={"quantity"} enterpriseId={enterpriseId}/>:null}
        {chart==="pastSalesPie"?<StockPie productId={productId} queryType={queryType} setProperty={setProperty} name="product" number={"quantity"} enterpriseId={enterpriseId}/>:null}
        {chart==="pastPurchasesPie"?<StockPie productId={productId} queryType={queryType} setProperty={setProperty} name="product" number={"quantity"} enterpriseId={enterpriseId}/>:null}
        {productId && chart==="pastSuppliersPie"?<StockPie property={"product"} productId={productId} queryType={queryType} setProperty={setProperty} name={"supplier"} number={"quantity"} enterpriseId={enterpriseId}/>:null}
        {productId && chart==="pastBuyersPie"?<StockPie property={"product"} productId={productId} queryType={queryType} setProperty={setProperty} name={"buyer"} number={"quantity"} enterpriseId={enterpriseId}/>:null}

        
         
        {property && property!="noLegend"?(
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