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
                        <tr key={index}>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.msrp}</td>
                            <td>{product.category}</td>
                            <td>{product.notes}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}