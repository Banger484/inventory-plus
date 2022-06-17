const {Item} = require("../models")
const { groupItemsByProduct } = require("./analysisHelpers")

class ProductRow{
    constructor(product){
        this.productName = product[0].product.name
        this.units = product.length;
        this.sku = product[0].product.sku
        this.binLocation = product[0].binLocation
        this.totalCost = product.reduce((prev,current)=>{
            return prev+current.cost
        },0),
        this.costPerUnit = (this.totalCost)/this.units,
        this.totalSales = product.reduce((prev,current)=>{
            return prev+(current.salesPrice||0)
        },0),
        this.salePerUnit = (this.totalSales/this.units)
    }
}

const orderDetails = async (parent,{enterpriseId,orderNumber})=>{
    const items = await Item.find({enterpriseId,orderNumber}).populate("product")
    const products = await groupItemsByProduct(items)
    const analysis = []
    for (let product in products){
        const row = new ProductRow(products[product])
        analysis.push(row)
    }
    console.log(analysis)
    return analysis
}

module.exports = {orderDetails}