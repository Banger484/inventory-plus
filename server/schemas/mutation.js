const { Enterprise, Item, Product, User } = require('../models');
const { signToken } = require('../utils/auth');

const mutation = {
    updateItemReceived: async (parent, {item, receivedDate, binLocation}) => {
        return await Item.findOneAndUpdate(
            {_id: item},
            {receivedDate, binLocation},
            {new:true}
        );
    },
    updateItemSale: async ( parent, {item, saleDate, buyer,saleNumber }) => {
        return await Item.findOneAndUpdate(
            {_id: item},
            {saleDate, buyer,saleNumber},
            {new:true}
        );
    },
    updateItemFulf: async (parent, {item, fulfillmentDate}) => {
        return await Item.findOneAndUpdate(
            {_id: item},
            {fulfillmentDate},
            {new:true}
        );
    },
    register : async (parent,{name,email,password,location,enterpriseName})=>{
        try{

            const enterprise = await Enterprise.create({name:enterpriseName,location})
            console.log(enterprise)
            const user = await User.create({name,email,password,enterprise:enterprise._id})
            console.log(user)
            const finder = await Enterprise.findOne({_id:user.enterprise})
            user.enterprise = finder
            return user
        }catch(err){
            console.log(err)
        }
    },
    login: async (parent, { email, password }) => {
        console.log("in it")
        console.log({email,password})
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No profile with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        const finder = await Enterprise.findOne({_id:user.enterprise})
        user.enterprise = finder
        return { token, user };
      },

}

module.exports = mutation;