const {Item,Product,Enterprise} = require("../models")

const generateProductReport = async (enterpriseId,productId)=>{
    const product = await Product.findById(productId)
    const items = await Item.find({enterpriseId,productId})
    const analysis = {
        sku:product.sku,
        name:product.name,
        description: 




    }
}


