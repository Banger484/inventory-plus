const { Schema, model } = require('mongoose');
const { UserSchema } =require( './User');


const EnterpriseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  location: {
    type: String,
    required: true
  }
});

const Enterprise = model('Enterprise', EnterpriseSchema);

module.exports = {Enterprise,EnterpriseSchema};
