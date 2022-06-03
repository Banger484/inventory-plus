import './ProductList.css'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_ORDERGUIDE } from '../../utils/mutations'
import { QUERY_ALL_PRODUCTS } from '../../utils/queries'

export default function ProductList (props) {
    
    const { loading: productsLoading, data: productsData, refetch } = useQuery(QUERY_ALL_PRODUCTS)
    let products

    if(productsData) {
        refetch()
        products = productsData.allProducts
    }

    const [addProduct, { error }] = useMutation(ADD_TO_ORDERGUIDE)
    const checkIfInList = (product,list)=>{
        const match = list.filter(li=>{
            return li._id===product._id
        })
        if (match.length!==0){
            return true
        }
        else{
            return false
        }
    }

    const handleAdd = async (product) => {
        let newList = [...props.orderGuide, product]
        
        props.setGuideState(newList)
        try {
            await addProduct({
                variables: { enterpriseId: props.enterpriseId, productId: product._id }
            })
        } catch (err) {
            console.error(err);
        }  

    }

    return (
        <div>
            <table className='product-list-table'>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>MSRP</th>
                        <th>Category</th>
                        <th>Notes</th>
                        {props.buttons?<th>Add</th> : null}

                    </tr>
                </thead>
                    <tbody>{productsLoading? (<tr><td>Loading...</td></tr>) : (
                        products.map((product, index) => {
                        const check = checkIfInList(product, (props?.orderGuide||[]))
                        if(!check) {
                         return (
                        <tr data-pid={product._id} key={index} >
                            <td data-pid={product._id}>{product.sku}</td>
                            <td data-pid={product._id}>{product.name}</td>
                            <td data-pid={product._id}>{product.description}</td>
                            <td data-pid={product._id}>${product.msrp}</td>
                            <td data-pid={product._id}>{product.category}</td>
                            <td data-pid={product._id}>{product.notes}</td>
                            {props.buttons?<td><button onClick={() => handleAdd(product)}>✔️</button></td> : null}

                        </tr>
                        )   
                        }})
                    )}
                    
                    </tbody>
                </table>
        </div>
    )
}