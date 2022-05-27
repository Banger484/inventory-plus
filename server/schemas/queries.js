const {Item} = require("../models")
const { Schema, model } = require('mongoose');


const getItemsByOrderNumber = async (parent,{orderNumber})=>{
    const items = await Item.find({orderNumber})
    console.log(items);
    return items
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

module.exports = {getItemsByOrderNumber,getOrderedItems,getCurrentStocks,getOpenSales,getFulfilledItems}