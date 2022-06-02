const {Product,Item} = require("../models/")
const {Analysis} = require("../models/Analysis")
const {Schema,model}=require("mongoose")
const resolvers = require("../schemas/resolvers")

const {singleProduct} = require("../schemas/queries")

const generateProductReportFail = async (parent,{enterpriseId,productId})=>{
    try{
        const product = await Product.findById(productId)
    const items = await Item.find({enterpriseId,productId})
    console.log(items)
    const analysis = {
        sku:product.sku,
        name:product.name,
        description: product.description,
        msrp:product.msrp,
        category:product.category,
        notes:product.notes
    }
    console.log(analysis)
    return analysis
}catch(err){
    console.log(err)
}
}

const generateProductReport = async (parent,{enterpriseId,productId})=>{
    const product = await Product.findById(productId)
    const purchasedItems = await Item.find({enterpriseId,productId})
    const numberPurchased = purchasedItems.length
    const incomingItems = await Item.find({enterpriseId,productId,receivedDate:null})
    const numberIncoming = incomingItems.length
    const inStockItems = await Item.find({enterpriseId,productId,receivedDate:{$ne:null},salesPrice:null})
    const numberInStock = inStockItems.length
    const outgoingItems = await Item.find({enterpriseId,productId,salesPrice:{$ne:null},fulfillmentDate:null})
    const numberOutgoing = outgoingItems.length
    const fulfilledItems = await Item.find({enterpriseId,productId,fulfilledItems:{$ne:null}})
    const numberFulfilled = fulfilledItems.length
    const analysis = await Analysis.create({
        name: product.name,
        description: product.name,
        msrp: product.msrp,
        category: product.category,
        notes: product.notes,
        numberPurchased,
        numberIncoming,
        numberInStock,
        numberOutgoing,
        numberFulfilled
        })
        console.log(analysis)
    return analysis
  }


module.exports = {generateProductReport}