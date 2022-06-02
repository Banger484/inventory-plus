import './ProductGuide.css'
import ProductList from "./ProductList";

export default function ProductGuide (props) {
    console.log(props)
    return (
        <>
        <div className='table-top'>
            <h1>Product Guide</h1>
            </div>
        <div className='product-guide-container'>
            <ProductList />
        </div>
        </>
        
    )
}