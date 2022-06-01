import './ProductGuide.css'
import ProductList from "./ProductList";

export default function ProductGuide (props) {
    console.log(props)
    return (
        <div className='product-guide-container'>
            <h1>Product Guide</h1>
            <ProductList products={props.products} />
        </div>
    )
}