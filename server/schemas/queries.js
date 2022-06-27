const {Item,Product,User,Enterprise} = require("../models")
const { Schema, model } = require('mongoose');

// Function to get all Users for an Enterprise
const getEnterpriseUsers = async(parent,{enterpriseId})=>{
    const users = await User.find({enterprise:enterpriseId})
    return users
}
// Function to get all Items on by order number for an Enterprise
const getItemsByOrderNumber = async (parent,{orderNumber,enterpriseId})=>{
    try{
        const items = await Item.find({orderNumber,enterprise:enterpriseId}).populate("product").populate("enterprise")
        return items
    }catch(err){console.error(err)}
}

// Function to get all Users for an Enterprise
const getOrderedItems = async (parent,{enterpriseId}) =>{
    const items = await Item.find({enterprise:enterpriseId,receivedDate:null}).populate("product")
    return items
}

// Function to get all Items currently instock for an Enterprise
const getCurrentStocks = async (parent,{enterpriseId}) =>{
    const items = await Item.find({enterprise:enterpriseId,receivedDate:{$ne:null},saleDate:null}).populate("product")
    return items
}

// Function to get all Items sold but have not had shipment fulfilled
const getOpenSales = async (parent,{enterpriseId})=>{
    const items = await Item.find({enterprise:enterpriseId,saleDate:{$ne:null},fulfillmentDate:null}).populate("product")
    return items
}

// Function to get all Itmes sold and shipment fulfilled
const getFulfilledItems = async (parent,{enterpriseId})=>{
    const items = await Item.find({enterprise:enterpriseId,fulfillmentDate:{$ne:null}})
    return items
}

// Function to get all Items by product id number
const getOrderedItemsByProduct = async (parent,{enterpriseId,productId}) =>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,receivedDate:null})
    return items
}

// Function to get all Items instock by product id number
const getCurrentStocksByProduct = async (parent,{enterpriseId,productId}) =>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,receivedDate:{$ne:null},saleDate:null})
    return items
}

// Function to get all open sales for a product
const getOpenSalesByProduct = async (parent,{enterpriseId,productId})=>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,saleDate:{$ne:null},fulfillmentDate:null})
    return items
}

// Function to get all fulfilled sales for a product
const getFulfilledItemsByProduct = async (parent,{enterpriseId,productId})=>{
    const items = await Item.find({product:productId,enterprise:enterpriseId,fulfillmentDate:{$ne:null}})
    return items
}

// Function to get one item instock
const getOneItemInStock = async ({enterpriseId,productId}) =>{
    const item = await Item.findOne({product:productId,enterprise:enterpriseId,receivedDate:{$ne:null},saleDate:null})
    return item
}

// Function to get all completed sales for an enterprise
const getCompletedSales = async (parent,{enterpriseId})=>{
    const items = await Item.find({enterprise:enterpriseId,saleDate:{$ne:null},fulfillmentDate:{$ne:null}})
    return items
}

// Function to get current invetory for an enterprise
const getInventory = async (parent,{enterpriseId})=>{
    const items = await Item.find({enterprise:enterpriseId,receivedDate:{$ne:null}, saleDate:null,fulfillmentDate:null})
    return items
}

// Function to get a single Product by Id number
const singleProduct = async (parent,{id})=>{
    return await Product.findById(id)
  }

const getStockGuide = async (parent,{enterpriseId})=>{
    const enterprise = await Enterprise.findById(enterpriseId);
    console.log(enterprise._id)
    return enterprise.stockGuide
}

const getAllUsers = async ()=>{
    const users = await User.find().populate("enterprise");
    console.log(users)
    return users
}

const getTheme = async (parent,{userId})=>{
    const user = await User.findById(userId);
    const theme = user.theme;
    return theme
}


// Exports functions 
module.exports = {getTheme,getAllUsers,getStockGuide,getEnterpriseUsers,getItemsByOrderNumber,getOrderedItems,getCurrentStocks,getOpenSales,getFulfilledItems,getOrderedItemsByProduct,getCurrentStocksByProduct,getOpenSalesByProduct,getFulfilledItemsByProduct,getOneItemInStock, getCompletedSales, getInventory,singleProduct}



