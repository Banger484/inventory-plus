import { useQuery } from "@apollo/client"
import { QUERY_SINGLE_PRODUCT,PRODUCT_AVERAGES } from "../../utils/queries"
import { MonthBar } from "./Charts/SalesByMonth"
import "./fullReport.css"
import ProductDetails from "./ProductDetails"
import { StockPie } from "./Charts/StockPie"
import { Table } from "../Table"
import { MonthlyAnalysis } from "./MonthlyAnalysis"

const FullReportInside = ({enterpriseId,productId})=>{
    console.log(enterpriseId,productId,"these are the props")
    const {data,error,loading} = useQuery(QUERY_SINGLE_PRODUCT,{variables:{singleProductId:productId}})
    const {data:avData,loading:avLoading} = useQuery(PRODUCT_AVERAGES,{variables:{enterpriseId,productId}})
    if(loading||avLoading){
        return(
            <h2>Loading...</h2>
            )
        }
    console.log(data)
    const product = data.singleProduct
    console.log("product",product)
return(
    <main>

    <div className="report-side-by-side">
        <section className="left">
       <h1>
         {product.name}
        </h1>
        {product.imageKey?<img src={`/images/${product.imageKey}`}/>:null}
        </section>
        <section className="right">
        <ProductDetails enterpriseId={enterpriseId} productId={productId}/>

        </section>
    </div>
    <div className="chart-cont">
        <h2>Purchase/Sale Quantity By Month</h2>
        <MonthBar enterpriseId={enterpriseId} productId={productId} property={["numberPurchased","numberSold"]}/>
    </div>
    <div className="chart-cont">
        <h2>Cost of Purchase/Sales Income By Month</h2>
        <MonthBar enterpriseId={enterpriseId} productId={productId} property={["totalCost","totalIncome","netSalesIncome"]}/>
    </div>
    <div>
        <MonthlyAnalysis enterpriseId={enterpriseId} presetProductId={productId}/>
    </div>


    <div>
    <Table data={avData.productAverages} excludedProperties={["__typename"]}/>
    </div>

    <div className="report-side-by-side">
        <section className="left chart-cont">
        <h2>Suppliers</h2>
        <StockPie property={"product"} productId={productId} queryType={"suppliers"} name={"supplier"} number={"quantity"} enterpriseId={enterpriseId}/>
        </section>
        <section className="right chart-cont">
        <h2>Buyers</h2>
        <StockPie property={"product"} productId={productId} queryType={"buyers"}  name={"buyer"} number={"quantity"} enterpriseId={enterpriseId}/>
        </section>
    </div>
    </main>
)

}

export const FullReport = ({enterpriseId})=>{

    const productId = "62993832ab0e9a436f475a32"

    return(
        <FullReportInside enterpriseId={enterpriseId} productId={productId}/>
    )
}