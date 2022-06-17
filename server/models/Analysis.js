// Imports required Schema class and model function from mongoose npm package
const { Schema, model } = require('mongoose');

// Sets schema for Analysis model
const AnalysisSchema = new Schema({
  sku: {
    type: String,
    required: false,
    unique: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type:String,
    required:false
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
  numberIncoming:{
      type:Number,
  },
  numberPurchased:{
    type:Number,
},
numberInStock:{
    type:Number,
},
numberOutgoing:{
    type:Number,
},
numberFulfilled:{
    type:Number,
},
numberSold:{
    type:Number,
},
totalSalesRevenue:{
  type:Number
},
averageSalesPrice:{
  type:Number
},
totalCost:{
  type:Number
},
averageCost:{
  type:Number
}
});

// Creates Analysis model 
const Analysis = model('Analysis', AnalysisSchema);

// Exports model
module.exports = {Analysis};
