const db = require('../config/connection');
const { User, Product,Enterprise } = require('../models');
const { register } = require('../schemas/mutation');
const resolvers = require("../schemas/resolvers")
const {addProduct} = resolvers.Mutation
const userSeeds = require('./userSeeds.json');
const productSeeds = require("./productSeeds.json")

db.once('open', async () => {
  try {
    
    
    await User.deleteMany()
    await Enterprise.deleteMany()
    // await Product.deleteMany()
    const newUser = await register(null,userSeeds[0])
    productSeeds.forEach(async product=>{
      try{
        const n = await addProduct(null,{...product,enterprise:newUser.enterprise})
      }catch(err){
        console.log(err)
      }
    })
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

