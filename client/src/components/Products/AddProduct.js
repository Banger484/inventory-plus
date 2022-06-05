import './AddProduct.css'
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'
import ProductList from './ProductList';

import Auth from '../../utils/auth';

export default function AddProduct (props) {
    
    const enterprise = Auth.getProfile().data.enterprise
    const [ formData, setFormData ] = useState({
        sku: '',
        name: '',
        description: '',
        msrp: 0,
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
            const variables = { ...inputData, enterprise }
            const { data } = await addProduct({
                variables
            })
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
    return (<>
    

        {/* <div className="table-top apl-top">
            <h1>Product Guide</h1>
        </div> */}
    <div className='add-product-body'>
    <div className='form-container'>
            <form  onSubmit={handleFormSubmit}>
                <div className='add-product-header'>
                    <h1>Add Product</h1>
                </div>
                <div className='add-product-form'>
                <label htmlFor='sku'>SKU:<input name='sku' value={formData.sku} type='text' onChange={handleInputChange}/></label>
                <label htmlFor='name'>Product Name:<input name='name' value={formData.name} type='text' onChange={handleInputChange}/></label>
                <label htmlFor='description'>Description:<input name='description' value={formData.description} type='text' onChange={handleInputChange}/></label>
                <label htmlFor='msrp'>MSRP:<input name='msrp' value={formData.msrp} type='number' onChange={handleInputChange}/></label>
                <label htmlFor='category'>Category:<input name='category' value={formData.category} type='text' onChange={handleInputChange}/></label>
                <label htmlFor='notes'>Notes:<input name='notes' value={formData.notes} type='text' onChange={handleInputChange}/></label>
                </div>
                <input id='add-product-submit' type='submit' value='Submit' />
                {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
            </form>
        </div>
        <div className='add-product-list'>
        
        <ProductList
          products={props.products}
          productsRefetch={props.productsRefetch}
        />
        </div>
    </div>
    </>  
    )
}