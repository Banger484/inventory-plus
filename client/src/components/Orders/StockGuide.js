import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STOCK_GUIDE, GET_CURRENT_STOCKS, GET_INCOMING_ITEMS } from "../../utils/queries";
import { SET_STOCK_GUIDE } from "../../utils/mutations";
import { groupItems, generatePurchaseTableData } from '../../utils/remodeledData'

export default function StockGuide(props) {
  // Stock Guide Query
  const { loading, data, refetch } = useQuery(GET_STOCK_GUIDE, {
    variables: { enterpriseId: props.enterpriseId },
  });

  const { loading: currentStocksLoading, data: currentStocksData, refetch: currentRefetch } = useQuery(GET_CURRENT_STOCKS, {
    variables: { enterpriseId: props.enterpriseId}
})
const { loading: incomingItemsLoading, data: incomingItemsData, refetch: incomingRefetch } = useQuery(GET_INCOMING_ITEMS, {
    variables: { enterpriseId: props.enterpriseId}
})


let currentStocksGroups
let incomingItemsGroups
let stockGuide = [];

// const [searchTerm,setSearchTerm] = useState("")

if(!loading && !currentStocksLoading && !incomingItemsLoading ){
    refetch()
    incomingRefetch()
    currentRefetch()
    currentStocksGroups = groupItems(currentStocksData.getCurrentStocks)
    incomingItemsGroups = groupItems(incomingItemsData.getOrderedItems)
    stockGuide = data.getStockGuide

}
  console.log(currentStocksGroups, incomingItemsGroups, stockGuide);

  const getValues = (id, array) => {
    let val
    if (loading || currentStocksLoading || incomingItemsLoading) {
      return
    }
    const value = array.filter(product => product.id === id)
    if (value.length > 0) {
      console.log('bing');
      val = value[0].quantity
    } else {
      val = 0
    }
    return val
  }
  const stockDefault = (id) => {
    if (loading) {
        return
    }
    let val;
    const filteredStockGuide = stockGuide.filter(product => product.product === id.toString())
    val = filteredStockGuide[0]?.requiredStock || ''
    return val;
  };
  // Mutation
  let updatedStockGuide = [];
  const [setNewPars, { error }] = useMutation(SET_STOCK_GUIDE);

  // Change Handler
  const handleInputChange = (e) => {
    const index = e.target.dataset.index;
    const newPar = {
      product: props.orderGuide[index]._id,
      requiredStock: parseInt(e.target.value),
    };

      updatedStockGuide = updatedStockGuide.filter((par) => {
        return par.product !== newPar.product;
      });
 
    updatedStockGuide.push(newPar);
    return updatedStockGuide;
  };

  // Submit
  const handleSubmit = async () => {
    console.log("wired");
    try {
        await updatedStockGuide.forEach(async (product) => {
            const variables = {
                enterpriseId: props.enterpriseId,
                product: product.product,
                requiredStock: product.requiredStock
            }
            console.log('product', product);
            console.log('variables', variables);
            await setNewPars({
                variables
            })
        })
    } catch (err) {
        console.error(err);
    }
  };
  return (
    <>
      {loading && currentStocksLoading && incomingItemsLoading ? (
        <h2>Loading...</h2>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Description</th>
              <th>MSRP</th>
              <th>Category</th>
              <th>Notes</th>
              <th>Current</th>
              <th>Incoming</th>
              <th>Par</th>
              {props.buttons ? <th>Rem</th> : null}
            </tr>
          </thead>
          <tbody>
            {props.orderGuide.map((product, index) => {
              return (
                <tr data-pid={product._id} key={index}>
                  <td className="td-2">{product.imageKey?(<img className='table-image' src={`/images/${product.imageKey}`}/>):null}</td>
                  <td className="td-1" data-pid={product._id}>{product.sku}</td>
                  <td className="td-3" data-pid={product._id}>{product.name}</td>
                  <td className="td-3" data-pid={product._id}>{product.description}</td>
                  <td className="td-1" data-pid={product._id}>${product.msrp}</td>
                  <td className="td-1" data-pid={product._id}>{product.category}</td>
                  <td className="td-3" data-pid={product._id}>{product.notes}</td>
                  <td className="td-1" data-pid={product._id}>{getValues(product._id, currentStocksGroups)}</td>
                  <td className="td-1" data-pid={product._id}>{getValues(product._id, incomingItemsGroups)}</td>
                  <td className='td-1'data-pid={product._id}>
                    <input className="td-1"
                      data-index={index}
                      name="par"
                      type="number"
                      min={0}
                      onChange={handleInputChange}
                      defaultValue={stockDefault(product._id)}
                    />
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
