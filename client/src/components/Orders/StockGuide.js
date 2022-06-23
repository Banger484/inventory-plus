import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STOCK_GUIDE } from "../../utils/queries";
import { SET_STOCK_GUIDE } from "../../utils/mutations";

export default function StockGuide(props) {
  // Stock Guide Query
  const { loading, data, refetch } = useQuery(GET_STOCK_GUIDE, {
    variables: { enterpriseId: props.enterpriseId },
  });
  let stockGuide = []
  if (data) {
    stockGuide = data.getStockGuide;
  }
  console.log('stock guide', stockGuide);
  const stockDefault = (id) => {
    let val
    if(!loading) {
        stockGuide.map(product => {
            if(id === product.product) {
                val = product.requiredStock;
            } else {
                val = 0
            }
        })
    }
    return val
  }
  // Mutation
  let updatedStockGuide = []
  const [setNewPars, { error}] = useMutation(SET_STOCK_GUIDE)

  // Change Handler
  const handleInputChange = (e) => {

    const index = e.target.dataset.index
    console.log('this', props.orderGuide[index]);
    const newPar = {
        
    }
  }

  // Submit
  const handleSubmit = async () => {
    console.log("wired");
  };
  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Description</th>
              <th>MSRP</th>
              <th>Category</th>
              <th>Par</th>
              {props.buttons ? <th>Rem</th> : null}
            </tr>
          </thead>
          <tbody>
            {props.orderGuide.map((product, index) => {
              return (
                <tr data-pid={product._id} key={index}>
                  <td data-pid={product._id}>{product.sku}</td>
                  <td data-pid={product._id}>{product.name}</td>
                  <td data-pid={product._id}>{product.description}</td>
                  <td data-pid={product._id}>${product.msrp}</td>
                  <td data-pid={product._id}>{product.category}</td>
                  <td data-pid={product._id}>
                    <input data-index={index} name="par" type="number" min={0} onChange={handleInputChange} defaultValue={stockDefault(product._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div>
        <button className="order-submit" type="submit" onClick={handleSubmit}>
          Set Pars
        </button>
      </div>
    </>
  );
}
