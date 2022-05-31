import './ProductGuide.css'
import ProductList from "./ProductList";

export default function ProductGuide () {

    return (
        <div className='product-guide-container'>
            <h1>Product Guide</h1>
            <ProductList />
        </div>
    )
}