import './AddProduct.css'
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';

import Auth from '../../utils/auth';

export default function AddProduct () {
    
    const enterprise = Auth.getProfile().data.enterprise
    const [ formData, setFormData ] = useState({
        sku: '',
        name: '',
        description: '',
        msrp: 3,
        category: '',
        notes: '',
    })
    

    const [addProduct, { error, data }] = useMutation(ADD_PRODUCT)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const inputData = { ...formData}

        inputData.msrp = parseInt(inputData.msrp)


        try {
            const variables = { ...inputData,enterprise }
            console.log(variables)
            const { data } = await addProduct({
                variables
            })
            console.log( data );
        } catch (err) {
            console.error(err);
        }
        setFormData({
            sku: '',
            name: '',
            description: '',
            msrp: 0,
            category: '',
            notes: '',
        })
    }
    return (
        <div className='form-container'>
            <form  onSubmit={handleFormSubmit}>
                <div className='add-product-header'>
                    <h1>Add Product</h1>
                </div>
                <div className='add-product-form'>
                <label htmlFor='sku'>SKU:<input name='sku' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='name'>Product Name:<input name='name' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='description'>Description:<input name='description' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='msrp'>MSRP:<input name='msrp' placeholder='something' type='number' onChange={handleInputChange}/></label>
                <label htmlFor='category'>Category:<input name='category' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='notes'>Notes:<input name='notes' placeholder='something' type='text' onChange={handleInputChange}/></label>
                </div>
                <input id='add-product-submit' type='submit' value='Submit' />
                {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
            </form>
        </div>
    )
}