const mongoose = require('mongoose');

//Connects to mongoose to mongodb database
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventoryPlus',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;