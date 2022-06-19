const { Schema } = require("mongoose");

const stockGuideSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    requiredStock:{
        type:Number,
        min:0
    }
})

module.exports = {stockGuideSchema}