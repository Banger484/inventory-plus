const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Enterprise, Item } = require('../models');
const { signToken } = require('../utils/auth');
const {singleProduct,getEnterpriseUsers,getItemsByOrderNumber,getOrderedItems,getCurrentStocks,getOpenSales,getFulfilledItems,getOrderedItemsByProduct,getCurrentStocksByProduct,getOpenSalesByProduct,getFulfilledItemsByProduct,getCompletedSales,getInventory} = require("./queries")
const mutations = require('../schemas/mutation');
const bulkMutations = require("./bulkmutations")
const {generateProductReport} = require("../analysis/productAnalysis")
const {orderDetails} = require("../analysis/orderAnalysis")

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    allProducts: async ()=>{
      const all = await Product.find()
      const result = all.filter(p=>{
        return !p.disabled
      });
      return result
    },

    singleCategoryProducts: async (parent,{category})=>{
      const result = await Product.find({category:category})
      return result
    },
    getEnterprises: async ()=>{
      const results = await Enterprise.find().populate("orderGuide")
      console.log(results[0]._id)
      return results
    },
    getEnterpriseByUser: async (parent,{email})=>{
      const user = await User.findOne({email});
      console.log(user)
      const enterprise = await Enterprise.findById(user.enterprise)
      console.log(enterprise)
      return enterprise
    },
    getEnterpriseById: async (parent, {_id}) => {
      const enterprise = await Enterprise.findById(_id).populate('orderGuide')
      return enterprise
    },
    getItems: async()=>{
      return Item.find()
    },
    orderDetails,
    generateProductReport,
    singleProduct,
    getEnterpriseUsers,
    getItemsByOrderNumber,
    getOrderedItems,
    getCurrentStocks,
    getOpenSales,
    getFulfilledItems,getOrderedItemsByProduct,getCurrentStocksByProduct,getOpenSalesByProduct,getFulfilledItemsByProduct,getCompletedSales,getInventory
  },

  Mutation: {
    addProduct: async (parent,{enterprise,sku,name,description,msrp,category,notes}) =>{
      console.log({enterprise,sku,name,description,msrp,category,notes})
      const product = await Product.create({sku,name,description,msrp,category,notes});
      console.log(product)
      console.log(enterprise)
      const ent = await Enterprise.findById(enterprise);
      console.log("here is the enterprise")
      console.log(ent)
      ent.orderGuide.push(product._id)
      ent.save()     
      return product
    },
    updateProduct: async (parent,props)=>{
      const result = await Product.findOneAndUpdate({_id:props._id},props,{new:true})
      console.log(result)
      return result
    },
    addEnterprise: async (parent,{name,location,userId})=>{
      const registrant = await User.findById(userId)
      const enterprise = await Enterprise.create({name,location,registrant,users:[registrant]})
      console.log(enterprise)
      const user = await User.findById(userId)
      user.set({enterprise:enterprise._id,credentials:"admin"});
      user.save()
      console.log(user)
      return enterprise
    },
    addItems: async (parent,{enterpriseId,quantity,productId,orderNumber,cost,purchaseDate,supplier})=>{
      const ent = await Enterprise.findById(enterpriseId);
      orderNumber = ent.orderNumber;
      ent.orderNumber = orderNumber+1;
      ent.save()
      for (let i=0;i<quantity;i++){
        const item = await Item.create({product:productId,enterprise:enterpriseId,orderNumber,cost,
          purchaseDate,supplier})
      }
      const newItems = await getItemsByOrderNumber(null,{orderNumber,enterpriseId})
      return newItems
    },
    ...mutations,
    ...bulkMutations
  },
};

module.exports = resolvers;
