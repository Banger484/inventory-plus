// Imports required Schema class and model function from mongoose and bcrypt npm packages
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Sets schema for User model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  role:{
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  credentials: {
    type:String,
    default:"basic"
  },
  enterprise:{
    type:Schema.Types.ObjectId,
    ref:"Enterprise"
},
  disabled:{
    type:Boolean,
    default:false
  },
  theme:{
    type:String
  },
  avatar:String
});

// set up pre-save middleware to create password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Creates User model
const User = model('User', UserSchema);

// Exports model
module.exports = {User};