import './OrderList.css'
import React from 'react'
import { useMutation } from '@apollo/client'
import { REMOVE_FROM_ORDERGUIDE } from '../../utils/mutations'

export default function OrderList (props) {
    if(props.orderGuide) {
        props.enterpriseRefetch()
    }
    const [removeProduct, { error }] = useMutation(REMOVE_FROM_ORDERGUIDE)
    const handleRemove = async (pid) => {
        const newList = props.orderGuide.filter((product) => {
            return product._id !== pid
        })
        props.setGuideState(newList)
        try {
            await removeProduct({
                variables: { enterpriseId: props.enterpriseId, productId: pid }
            })
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Img</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>MSRP</th>
                        <th>Category</th>
                        <th>Notes</th>
                        {props.buttons?<th>Rem</th> : null}
                    </tr>
                </thead>
                    <tbody>
                    {props.orderGuide.map((product, index) => {
                        return (
                        <tr data-pid={product._id} key={index}>
                            <td>{product.imageKey?(<img className='table-image' src={`/images/${product.imageKey}`}/>):null}</td>
                            <td data-pid={product._id}>{product.sku}</td>
                            <td data-pid={product._id}>{product.name}</td>
                            <td data-pid={product._id}>{product.description}</td>
                            <td data-pid={product._id}>${product.msrp}</td>
                            <td data-pid={product._id}>{product.category}</td>
                            <td data-pid={product._id}>{product.notes}</td>
                            {props.buttons?<td><button onClick={() => handleRemove(product._id)} data-pid={product._id}>❌</button></td> : null}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
    )
}