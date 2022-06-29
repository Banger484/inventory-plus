import './AddProduct.css'
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations'
import ProductList from './ProductList';
import { DropBox } from '../Tools/DropBox';
import Auth from '../../utils/auth';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const addSchema = yup.object().shape({
    sku: yup.string().required("sku is required!"),
    name: yup.string().required(),
    description: yup.string().required(),
    msrp: yup.number().required(),
    category: yup.string().required(),
    notes: yup.string().optional(),
  });

export default function AddProduct (props) {
    const [imageKey,setImageKey] = useState(null)
    const enterprise = Auth.getProfile().data.enterprise
    const [ formData, setFormData ] = useState({
        sku: '',
        name: '',
        description: '',
        msrp: "",
        category: '',
        notes: '',
    })
    
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(addSchema)
      });

    const [addProduct, { error, data }] = useMutation(ADD_PRODUCT)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = async (d) => {
        const info = {
            sku: d.sku,
            name: d.name,
            description: d.description,
            msrp: d.msrp,
            category: d.category,
            notes: d.notes
        }

        const inputData = info

        inputData.msrp = parseInt(inputData.msrp)


        try {
            const variables = { ...inputData, enterprise }
            if (imageKey){
                variables.imageKey = imageKey
            }
            console.log(variables)
            const { data } = await addProduct({
                variables
            })
        } catch (err) {
            console.error(err);
        }
        setImageKey(null)
        setFormData({
            sku: '',
            name: '',
            description: '',
            msrp: '',
            category: '',
            notes: '',
        })
    }
    return (<>
    

        {/* <div className="table-top apl-top">
            <h1>Product Guide</h1>
        </div> */}
    <div className='add-product-grid'>
            <form  onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='add-product-header'>
                    <h1>Add Product</h1>
                </div>
                <div className='add-product-form'>
                <label htmlFor='sku'>SKU:<input name='sku' value={formData.sku} type='text' {...register("sku")} onChange={handleInputChange}/></label>
                <label htmlFor='name'>Product Name:<input name='name' value={formData.name}  type='text' {...register("name")} onChange={handleInputChange}/></label>
                <label htmlFor='description'>Desc.:<input name='description' value={formData.description} type='text' {...register("description")} onChange={handleInputChange}/></label>
                <label htmlFor='msrp'>MSRP:<input name='msrp' value={formData.msrp} type='number' placeholder="0" {...register("msrp")} onChange={handleInputChange}/></label>
                <label htmlFor='category'>Category:<input name='category' value={formData.category} type='text' {...register("category")} onChange={handleInputChange}/></label>
                <label htmlFor='notes'>Notes:<input name='notes' value={formData.notes} type='text' {...register("notes")} onChange={handleInputChange}/></label>
                </div>
    {/* <input type="file" id="fileElem" multiple accept="image/*" onChange={()=>{}}/>
    <label id="" className="button select-btn" htmlFor="fileElem">Select some files</label> */}
                <DropBox imageKey={imageKey} setImageKey={setImageKey}/>
                <input id='add-product-submit' type='submit' value='Submit' />
                {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
        <div className='errors-cont'>
        <p>{errors.sku?.message}</p>
              <p>{errors.name?.message}</p>
              <p>{errors.description?.message}</p>
              <p>{errors.msrp?.message}</p>
              <p>{errors.category?.message}</p>
              <p>{errors.notes?.message}</p>
              </div>
            </form>
        <div className='add-product-list'>
        {/* <img src="/images/305746d03021662a7f453c223d81e707"/> */}
        <ProductList
          products={props.products}
          productsRefetch={props.productsRefetch}
        />
        </div>
    </div>
    </>  
    )
}