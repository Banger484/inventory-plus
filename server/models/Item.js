// Imports required Schema class and model function from mongoose npm package
const {Schema, model} = require("mongoose")

//Sets schema for Item model
const ItemSchema = new Schema({
    enterprise: {
        type:Schema.Types.ObjectId,
        ref:"Enterprise"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    orderNumber:{
        type:Number,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    purchaseDate:{
        type:Date,
        required:true
    },
    supplier:{
        type:String,
        required:true
    },
    receivedDate:{
        type:Date,
        required:false
    },
    binLocation:{
        type:String,
        required:false
    },
    buyer:{
        type:String,
        required:false
    },
    salesPrice:{
        type:Number,
        required:false
    },
    saleNumber:{
        type:Number,
        required:false,
    },
    saleDate:{
        type:Date,
        required:false
    },
    fulfillmentDate:{
        type:Date,
        required:false
    }
})

// Creates Item model
const Item = model("Item",ItemSchema)

// Exports model
module.exports = {Item}