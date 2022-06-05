import {useQuery} from "@apollo/client"
import { useState } from "react"
import { GET_ENTERPRISE_BY_ID,PRODUCT_ANALYSIS } from "../../utils/queries"
import ProductDetails from "./ProductDetails"
import './productReport.css'

export default function ProductReport ({enterpriseId}){
    console.log(enterpriseId)

    const{loading: enterpriseLoading,data:enterpriseData} = useQuery(GET_ENTERPRISE_BY_ID,{
        variables:{id:enterpriseId}
    })
    const [productId,setProductId] = useState(false)

    let products;
    if (!enterpriseLoading){
        console.log(enterpriseData)
        products = enterpriseData.getEnterpriseById.orderGuide;
        console.log(products)
    }

    if(enterpriseLoading){
        return(<h1>Loading...</h1>)
    }

    const handleProductClick = (e)=>{
        const productId = e.target.value
        setProductId(productId)
    }

    return(

        <div className="analysis-main">

        <div className="card analysis-header">

        <div>
        <div className="table-top product-report">
            <h1>Product Report</h1>
        </div>
        <div className="card product-report-container">

            <h3>Products</h3>
            <select defaultValue="Choose a Product" placeholder="Choose a product"  onChange={handleProductClick}>
            <option selected value="">Select a Product</option>
            {products.map((product,index)=>{
                console.log(product)
                return(<option data-product-id={product._id} value={product._id} >{product.name}</option>)
            })}
            </select>
        </div>
            {productId?<ProductDetails enterpriseId={enterpriseId} productId={productId}/>:null}
        </div>
    )


}