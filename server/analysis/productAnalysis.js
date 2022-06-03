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
   try{
    console.log(productId)
    const product = await Product.findById(productId)
    const purchasedItems = await Item.find({enterpriseId:enterpriseId,product:productId})
    const numberPurchased = purchasedItems.length
    console.log("number purchased",numberPurchased)
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
 
    console.log(purchasedItems[0].cost)
    let totalCost = 0;
    purchasedItems.forEach(i=>totalCost+=i.cost)
    let totalSalesRevenue = 0;
    soldItems.forEach(i=>totalSalesRevenue+=i.cost)
    console.log(numberSold)
    const averageSalesPrice = numberSold>0?Math.round(totalSalesRevenue/numberSold):0

    const averageCost = numberPurchased>0?Math.round(totalCost/numberPurchased):0
    // const totalCost = purchasedItems.reduce((a,b)=>parseInt(a.cost)+parseInt(b.cost),0)
    // console.log(totalCost)
    // const totalSalesPrice = soldItems.reduce((a,b)=>{a.salesPrice+b.salesPrice},0)
    // console.log(totalSalesPrice)
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


module.exports = {generateProductReport}