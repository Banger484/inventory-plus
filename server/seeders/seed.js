const db = require('../config/connection');
const { User, Product,Enterprise, Item } = require('../models');
const { register } = require('../schemas/mutation');
const resolvers = require("../schemas/resolvers")
const {addProduct,addItems,receiveOrder,makeSale} = resolvers.Mutation
const userSeeds = require('./userSeeds.json');
const productSeeds = require("./productSeeds.json");
const { fulfillSale } = require('../schemas/bulkmutations');


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
    ent.orderNumber=1;
    await ent.save()
    let newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:2,productId:ids[0],orderNumber:1,cost:60,purchaseDate:"5/31/2022",supplier:"Dev Manu Inc."});

    await newOrder.forEach(n=> n.save())
    newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:5,productId:ids[1],orderNumber:1,cost:400,purchaseDate:"5/31/2022",supplier:"AFG LTD."});
    ent.orderNumber=2;
    await ent.save()
    newOrder.forEach(n=> n.save())
    newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:2,productId:ids[2],orderNumber:2,cost:900,purchaseDate:"6/15/2022",supplier:"Dev Manu Inc."});

    await newOrder.forEach(n=> n.save())
    ent.orderNumber=3
    await ent.save()
    newOrder= await addItems(null,{enterpriseId:newUser.enterprise,quantity:2,productId:ids[3],orderNumber:3,cost:65,purchaseDate:"7/5/2022",supplier:"Emory"});

    await newOrder.forEach(n=> n.save())

    await receiveOrder(null,{enterpriseId:newUser.enterprise,orderNumber:1,receivedDate:"7/3/2022",binLocation:"J33"})

    await makeSale(null,{enterpriseId:newUser.enterprise.id,saleId:ent.saleNumber,buyer:"Hansen's Outlet",saleDate:"9/1/2022",quantity:1,salesPrice:140,productId:ids[0]})
    ent.saleNumber = 1,
    ent.save()
    await makeSale(null,{enterpriseId:newUser.enterprise.id,saleId:ent.saleNumber,buyer:"Walmart",saleDate:"9/10/2022",quantity:3,salesPrice:600,productId:ids[1]})

    await fulfillSale(null,{enterpriseId:newUser.enterprise.id,saleNumber:0,fulfillmentDate:"9/20/2022"})

    process.exit(0);
  } catch (err) {
    throw err;
  }
});

