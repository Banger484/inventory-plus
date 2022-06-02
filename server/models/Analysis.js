const { Schema, model } = require('mongoose');

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
}

});

const Analysis = model('Analysis', AnalysisSchema);

module.exports = {Analysis,AnalysisSchema};
