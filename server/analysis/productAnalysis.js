const {Product,Item} = require("../models/")
const {Analysis} = require("../models/Analysis")
const {Schema,model}=require("mongoose")
const resolvers = require("../schemas/resolvers")
const {singleProduct} = require("../schemas/queries")

// Function to gernerate a Product report for an Enterprise
const generateProductReport = async (parent,{enterpriseId,productId})=>{
   try{
    const product = await Product.findById(productId)
    const purchasedItems = await Item.find({enterpriseId:enterpriseId,product:productId})
    const numberPurchased = purchasedItems.length
    const incomingItems = await Item.find({enterpriseId,product:productId,receivedDate:null})
    const numberIncoming = incomingItems.length
    const inStockItems = await Item.find({enterpriseId,product:productId,receivedDate:{$ne:null},saleNumber:null})
    const numberInStock = inStockItems.length
    const outgoingItems = await Item.find({enterpriseId,product:productId,saleNumber:{$ne:null},fulfillmentDate:null})
    const numberOutgoing = outgoingItems.length
    const fulfilledItems = await Item.find({enterpriseId,product:productId,fulfillmentDate:{$ne:null}})
    const numberFulfilled = fulfilledItems.length
    const soldItems = [...fulfilledItems,...outgoingItems]
    const numberSold = soldItems.length;
 
    let totalCost = 0;
    purchasedItems.forEach(i=>totalCost+=i.cost)
    let totalSalesRevenue = 0;
    soldItems.forEach(i=>totalSalesRevenue+=i.cost)
    const averageSalesPrice = numberSold>0?Math.round(totalSalesRevenue/numberSold):0

    const averageCost = numberPurchased>0?Math.round(totalCost/numberPurchased):0
    const analysis = await Analysis.create({
        name: product.name,
        description: product.description,
        msrp: product.msrp,
        category: product.category,
        notes: product.notes,
        numberPurchased,
        numberIncoming,
        numberInStock,
        numberOutgoing,
        numberFulfilled,
        numberSold,
        totalSalesRevenue,
        averageSalesPrice,
        totalCost,
        averageCost
        })
    return analysis
    }catch(err){
        console.error(err)
    }
}

// exports function
module.exports = {generateProductReport}