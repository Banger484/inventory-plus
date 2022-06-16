const { Schema, model } = require('mongoose');

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

const Product = model('Product', ProductSchema);

module.exports = {Product};
