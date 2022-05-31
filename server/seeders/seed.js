const db = require('../config/connection');
const { User, Product,Enterprise, Item } = require('../models');
const { register } = require('../schemas/mutation');
const resolvers = require("../schemas/resolvers")
const {addProduct,addItems,receiveOrder} = resolvers.Mutation
const userSeeds = require('./userSeeds.json');
const productSeeds = require("./productSeeds.json")

db.once('open', async () => {
  try {
    await User.deleteMany()
    await Enterprise.deleteMany()
    await Product.deleteMany()
    await Item.deleteMany()
    const newUser = await register(null,userSeeds[0])
    const products = await Product.insertMany(productSeeds)
    const ids = products.map(p=>p._id);
    const ent = await Enterprise.findOne({_id:newUser.enterprise});
    ids.forEach(id=>{
      ent.orderGuide.push(id)
    })
    await ent.save()

    let newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:2,productId:ids[0],orderNumber:1,cost:60,purchaseDate:"5/31/2022",supplier:"Dev Manu Inc."});

    await newOrder.forEach(n=> n.save())
    newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:5,productId:ids[1],orderNumber:1,cost:400,purchaseDate:"5/31/2022",supplier:"AFG LTD."});

    newOrder.forEach(n=> n.save())
    newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:2,productId:ids[2],orderNumber:2,cost:900,purchaseDate:"6/15/2022",supplier:"Dev Manu Inc."});

    await newOrder.forEach(n=> n.save())

    newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:2,productId:ids[3],orderNumber:3,cost:65,purchaseDate:"7/5/2022",supplier:"Emory"});

    await newOrder.forEach(n=> n.save())

    


    process.exit(0);
  } catch (err) {
    throw err;
  }
});

