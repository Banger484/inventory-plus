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
        const productId = e.target.dataset.productId
        setProductId(e.target.dataset.productId)
    }

    return(
        <div className="">
        <div className="table-top product-report">
        <h1>Product Report</h1>
        </div>
        <div className="card product-report-container">
            {products.map((product,index)=>{
                console.log(product)
                return(<button data-product-id={product._id} onClick={handleProductClick} >{product.name}</button>)
            })}
        </div>
            {productId?<ProductDetails enterpriseId={enterpriseId} productId={productId}/>:null}
        </div>
    )


}