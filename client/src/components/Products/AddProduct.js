import './AddProduct.css'
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';

export default function AddProduct () {
    
    const [ formData, setFormData ] = useState({
        sku: '',
        productName: '',
        description: '',
        msrp: 0,
        category: '',
        notes: ''
    })

    const [addProduct, { error }] = useMutation(ADD_PRODUCT, {
        update(cache, { data: { addProduct } }) {
            try {
                const { allProducts } = cache.readQuery({ query: QUERY_ALL_PRODUCTS })

                cache.writeQuery({
                    query: QUERY_ALL_PRODUCTS,
                    data: { products: [...allProducts, addProduct] }
                })
            } catch (err) {
                console.error(err);
            }
        }
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProduct({
                variables: { ...formData }
            })
            console.log( data );

            setFormData({
                sku: '',
                productName: '',
                description: '',
                msrp: 0,
                category: '',
                notes: ''
            })
            console.log(formData);
        } catch (err) {
            console.error(err);
        }
    }
    console.log(formData);
    return (
        <div className='form-container'>
            <form  onSubmit={handleFormSubmit}>
                <div className='add-product-header'>
                    <h1>Add Product</h1>
                </div>
                <div className='add-product-form'>
                <label htmlFor='sku'>SKU:<input name='sku' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='productName'>Product Name:<input name='productName' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='description'>Description:<input name='description' placeholder='something' type='text' onChange={handleInputChange}/></label>
                <label htmlFor='msrp'>MSRP:<input name='msrp' placeholder='something' type='text' onChange={handleInputChange}/></label>
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