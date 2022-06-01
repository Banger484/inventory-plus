import './ProductList.css'
import React, { useState} from 'react'
import { useMutation, useQuery } from '@apollo/client';
import {} from '../../utils/mutations'
import { QUERY_ALL_PRODUCTS } from '../../utils/queries'

export default function ProductList () {

    const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)

    const products = data?.allProducts || [];

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
                    </tr>
                </thead>
                    <tbody>
                    {products.map((product, index) => {
                        return (
                        <tr data-sku={product._id} key={index} onClick={(e) => { console.log(e.target.dataset.sku)}}>
                            <td data-sku={product._id}>{product.sku}</td>
                            <td data-sku={product._id}>{product.name}</td>
                            <td data-sku={product._id}>{product.description}</td>
                            <td data-sku={product._id}>${product.msrp}</td>
                            <td data-sku={product._id}>{product.category}</td>
                            <td data-sku={product._id}>{product.notes}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}