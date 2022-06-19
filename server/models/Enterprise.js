// Imports required Schema class and model function from mongoose npm package
const { Schema, model } = require('mongoose');
const {stockGuideSchema} = require("./StockGuide")
// Sets schema for Enterprise model
const EnterpriseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  location: {
    type: String,
    required: true
  },
  orderGuide:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }],
  orderNumber:{
    type:Number,
    default:0
  },
  saleNumber:{
    type:Number,
    default:0
  },
  stockGuide:[{
    type:stockGuideSchema,
  }]

});

// Creates Enterprise model
const Enterprise = model('Enterprise', EnterpriseSchema);

// Exports model
module.exports = {Enterprise};