import "./ProductGuide.css";
import ProductList from "./ProductList";

export default function ProductGuide(props) {
  return (
    <>
      <div className="table-top product-report">
        <h1>Product Guide</h1>
      </div>
      <div className="product-guide-container">
        <ProductList
          products={props.products}
          productsRefetch={props.productsRefetch}
        />
      </div>
    </>
  );
}
