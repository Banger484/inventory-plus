// Imports required Schema class and model function from mongoose npm package
const { Schema, model } = require('mongoose');

// Sets schema for Product model
const ProductSchema = new Schema({
  sku: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type:String,
    required:true
  },
  msrp:{
    type:Number,
    required: false
  },
  category:{
    type:String,
    required:false,
    default:"Other"
  },
  notes:{

      type:String,
      required:false
  },
  disabled:{
    type:Boolean,
    default:false

  }
});

// Creates Product model
const Product = model('Product', ProductSchema);

// Exports model
module.exports = {Product};