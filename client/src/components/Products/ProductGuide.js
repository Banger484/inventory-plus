import './ProductGuide.css'
import ProductList from "./ProductList";

export default function ProductGuide (props) {
    console.log(props)
    return (
        <div className='product-guide-container'>
            <div className='table-top'>
            <h1>Product Guide</h1>
            </div>

            <ProductList />
        </div>
    )
}