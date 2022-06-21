const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Enterprise, Item } = require('../models');
const { signToken } = require('../utils/auth');
const {getStockGuide,singleProduct,getEnterpriseUsers,getItemsByOrderNumber,getOrderedItems,getCurrentStocks,getOpenSales,getFulfilledItems,getOrderedItemsByProduct,getCurrentStocksByProduct,getOpenSalesByProduct,getFulfilledItemsByProduct,getCompletedSales,getInventory} = require("./queries")
const mutations = require('../schemas/mutation');
const bulkMutations = require("./bulkmutations")
const {generateProductReport} = require("../analysis/productAnalysis")
const {orderDetails} = require("../analysis/orderAnalysis")
const {groupItemsByMonth} = require("../analysis/monthlyAnalysis")

const resolvers = {
  Query: {

    // Function to get all Users
    users: async () => {
      return User.find();
    },

    // Function to get one user by Id number
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    // Function to get all Products
    allProducts: async ()=>{
      const all = await Product.find()
      const result = all.filter(p=>{
        return !p.disabled
      });
      return result
    },

    // Function to get all Products by category
    singleCategoryProducts: async (parent,{category})=>{
      const result = await Product.find({category:category})
      return result
    },

    // Function to get all Enterprises and display order guide
    getEnterprises: async ()=>{
      const results = await Enterprise.find().populate("orderGuide")
      return results
    },

    // Function to get Enterprise by user email
    getEnterpriseByUser: async (parent,{email})=>{
      const user = await User.findOne({email});
      const enterprise = await Enterprise.findById(user.enterprise)
      return enterprise
    },

    // Function to get all completed sales for an enterprise
    getEnterpriseById: async (parent, {_id}) => {
      const enterprise = await Enterprise.findById(_id).populate('orderGuide')
      return enterprise
    },

    // Function to get all Items
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
    getFulfilledItems,
    getOrderedItemsByProduct,
    getCurrentStocksByProduct,
    getOpenSalesByProduct,
    getFulfilledItemsByProduct,
    getCompletedSales,
    getInventory,
    getStockGuide,
    groupItemsByMonth
  },

  Mutation: {

    // Function to add new product to order guide
    addProduct: async (parent,{enterprise,sku,name,description,msrp,category,notes}) =>{
      const product = await Product.create({sku,name,description,msrp,category,notes});
      const ent = await Enterprise.findById(enterprise);
      ent.orderGuide.push(product._id)
      ent.save()     
      return product
    },

    // Function to update a single product by id number
    updateProduct: async (parent,props)=>{
      const result = await Product.findOneAndUpdate({_id:props._id},props,{new:true})
      return result
    },

    // Function to add a new enterprise
    addEnterprise: async (parent,{name,location,userId})=>{
      const registrant = await User.findById(userId)
      const enterprise = await Enterprise.create({name,location,registrant,users:[registrant]})
      const user = await User.findById(userId)
      user.set({enterprise:enterprise._id,credentials:"admin"});
      user.save()
      return enterprise
    },

    // Function to add new Items to an order for a enterprise
    addItems: async (parent,{enterpriseId,quantity,productId,orderNumber,cost,purchaseDate,supplier})=>{
      console.log(purchaseDate)
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

// exports functions
module.exports = resolvers;
