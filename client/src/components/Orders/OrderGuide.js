import "./OrderGuide.css";
import React, { useState } from "react";
import OrderList from "./OrderList";
import ProductList from "../Products/ProductList";

export default function OrderGuide(props) {
  const [guideState, setGuideState] = useState(props.orderGuide);
  const buttons = true;
  return (
    <>
      <div className="order-guide-grid">
        <div className="order-guide-sides">
      <div className="table-top-og">
        <h1>Order Guide</h1>
      </div>
          <OrderList
            enterpriseRefetch={props.enterpriseRefetch}
            enterpriseId={props.enterpriseId}
            orderGuide={guideState}
            setGuideState={setGuideState}
            buttons={buttons}
          />
        </div>
        <div className="order-guide-sides">
      <div className="table-top-og">
        <h1>Full Product List</h1>
      </div>
          <ProductList
            productsRefetch={props.productsRefetch}
            products={props.products}
            enterpriseId={props.enterpriseId}
            orderGuide={guideState}
            setGuideState={setGuideState}
            buttons={buttons}
          />
        </div>
      </div>
    </>
  );
}
