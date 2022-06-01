import './OrderList.css'
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import {} from '../../utils/mutations'
import { GET_ENTERPRISE_BY_ID } from '../../utils/queries'
import auth from '../../utils/auth'

export default function OrderList (props) {

    const user = auth.getProfile()
    // console.log(user.data.enterprise);
    
    console.log(user);

    const { loading, data } = useQuery(GET_ENTERPRISE_BY_ID, {
        variables: { id: user.data.enterprise}
    })
    console.log(data);

    const orderList = data?.getEnterpriseById.orderGuide || []
    console.log(orderList);
    return (
        <div>
            <table className='order-list-table'>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>MSRP</th>
                        <th>Category</th>
                        <th>Notes</th>
                        {props.buttons?<th>Remove</th> : null}
                    </tr>
                </thead>
                    <tbody>
                    {orderList.map((product, index) => {
                        return (
                        <tr key={index}>
                            <td>{product.sku}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.msrp}</td>
                            <td>{product.category}</td>
                            <td>{product.notes}</td>
                            {props.buttons?<td><button>X</button></td> : null}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}