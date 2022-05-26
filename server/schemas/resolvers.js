const { AuthenticationError } = require('apollo-server-express');
const { User, Product } = require('../models');
const Enterprise = require('../models/Enterprise');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    allProducts: async ()=>{
      return Product.find()
    },
    singleProduct: async (parent,{id})=>{
      return await Product.findById(id)
    },
    singleCategoryProducts: async (parent,{category})=>{
      const result = await Product.find({category:category})
      return result
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password, enterprise,role }) => {
      const user = await User.create({ name, email, password, enterprise,role });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addProduct: async (parent,{sku,name,description,msrp,category,notes}) =>{
      const product = await Product.create({sku,name,description,msrp,category,notes});
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
      return enterprise
    }
  },
};

module.exports = resolvers;
