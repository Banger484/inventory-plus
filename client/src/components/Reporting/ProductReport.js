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
        const productId = e.target.dataset.productId
        setProductId(e.target.dataset.productId)
    }

    return(
        <div>

        <div className="card">
            <h3>Products</h3>
            {products.map((product,index)=>{
                return(<button data-product-id={product._id} onClick={handleProductClick} >{product.name}</button>)
            })}
        </div>
            {productId?<ProductDetails enterpriseId={enterpriseId} productId={productId}/>:null}
        </div>
    )


}