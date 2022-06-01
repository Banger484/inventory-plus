const {Item,Product,User} = require("../models")
const { Schema, model } = require('mongoose');

const getEnterpriseUsers = async(parent,{enterpriseId})=>{
    console.log("in it")
    const users = await User.find({enterprise:enterpriseId})
    console.log(users)
    return users
}

const getItemsByOrderNumber = async (parent,{orderNumber,enterpriseId})=>{
    try{
        const items = await Item.find({orderNumber,enterprise:enterpriseId}).populate("product").populate("enterprise")
        console.log(items);
        return items
    }catch(err){console.log(err)}
}

const getOrderedItems = async (parent,{enterpriseId}) =>{
    console.log(enterpriseId)
    const items = await Item.find({enterprise:enterpriseId,receivedDate:null})
    console.log(items)
    return items
}

const getCurrentStocks = async (parent,{enterpriseId}) =>{
    const items = await Item.find({enterprise:enterpriseId,receivedDate:{$ne:null},saleDate:null})
    return items
}

const getOpenSales = async (parent,{enterpriseId})=>{
    const items = await Item.find({enterprise:enterpriseId,saleDate:{$ne:null},fulfillmentDate:null})
    return items
}

const getFulfilledItems = async (parent,{enterpriseId})=>{
    const items = await Item.find({enterprise:enterpriseId,fulfillmentDate:{$ne:null}})
    return items
}

const getOrderedItemsByProduct = async (parent,{enterpriseId,productId}) =>{
    console.log(enterpriseId)
    const items = await Item.find({product:productId,enterprise:enterpriseId,receivedDate:null})
    console.log(items)
    return items
}

const getCurrentStocksByProduct = async (parent,{enterpriseId,productId}) =>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,receivedDate:{$ne:null},saleDate:null})
    return items
}

const getOpenSalesByProduct = async (parent,{enterpriseId,productId})=>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,saleDate:{$ne:null},fulfillmentDate:null})
    return items
}

const getFulfilledItemsByProduct = async (parent,{enterpriseId,productId})=>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,fulfillmentDate:{$ne:null}})
    return items
}

const getOneItemInStock = async ({enterpriseId,productId}) =>{
    console.log("here are the arguments")
    console.log({enterpriseId,productId})
    const item = await Item.findOne({product:productId,enterprise:enterpriseId,receivedDate:{$ne:null},saleDate:null})
    return item
}

module.exports = {getEnterpriseUsers,getItemsByOrderNumber,getOrderedItems,getCurrentStocks,getOpenSales,getFulfilledItems,getOrderedItemsByProduct,getCurrentStocksByProduct,getOpenSalesByProduct,getFulfilledItemsByProduct,getOneItemInStock}