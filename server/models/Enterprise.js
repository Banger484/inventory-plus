const { Schema, model } = require('mongoose');



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
  }

});

const Enterprise = model('Enterprise', EnterpriseSchema);

module.exports = {Enterprise,EnterpriseSchema};
