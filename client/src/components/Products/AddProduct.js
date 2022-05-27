import './AddProduct.css'

export default function AddProduct () {
    return (
        <div className='form-container'>
            <form>
                <div className='add-product-header'>
                    <h1>Add Product</h1>
                </div>
                <div className='add-product-form'>
                <label for='SKU'>SKU:<input name='SKU' placeholder='something' type='text' /></label>
                <label for='Product Name'>Product Name:<input name='Product Name' placeholder='something' type='text' /></label>
                <label for='Description'>Description:<input name='Description' placeholder='something' type='text' /></label>
                <label for='MSRP'>MSRP:<input name='MSRP' placeholder='something' type='text' /></label>
                <label for='Category'>Category:<input name='Category' placeholder='something' type='text' /></label>
                <label for='Notes'>Notes:<input name='Notes' placeholder='something' type='text' /></label>
                </div>
                <input id='add-product-submit' type='submit' value='Submit' />
            </form>
        </div>
    )
}