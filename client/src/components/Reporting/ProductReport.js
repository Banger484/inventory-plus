import {useQuery} from "@apollo/client"
import { useState } from "react"
import { GET_ENTERPRISE_BY_ID,PRODUCT_ANALYSIS } from "../../utils/queries"
import ProductDetails from "./ProductDetails"
import './productReport.css'

export default function ProductReport ({enterpriseId}){

    const{loading: enterpriseLoading,data:enterpriseData} = useQuery(GET_ENTERPRISE_BY_ID,{
        variables:{id:enterpriseId}
    })
    const [productId,setProductId] = useState(false)

    let products;
    if (!enterpriseLoading){
        products = enterpriseData.getEnterpriseById.orderGuide;
    }

    if(enterpriseLoading){
        return(<h1>Loading...</h1>)
    }

    const handleProductClick = (e)=>{
        const productId = e.target.value
        setProductId(productId)
    }

    return(
        <div>

        <div className="card">
            <h3>Products</h3>
            <select defaultValue="Choose a Product" placeholder="Choose a product"  onChange={handleProductClick}>
            <option selected value="">Select a Product</option>
            {products.map((product,index)=>{
                return(<option data-product-id={product._id} value={product._id} >{product.name}</option>)
            })}
            </select>
        </div>
            {productId?<ProductDetails enterpriseId={enterpriseId} productId={productId}/>:null}
        </div>
    )


}