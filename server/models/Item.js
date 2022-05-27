const {Schema, model} = require("mongoose")
const {EnterpriseSchema} = require("./Enterprise")
const {ProductSchema} = require("./Product")

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
    saleDate:{
        type:Date,
        required:false
    },
    fulfillmentDate:{
        type:Date,
        required:false
    }
})

const Item = model("Item",ItemSchema)

module.exports = {Item,ItemSchema}