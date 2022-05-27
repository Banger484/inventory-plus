const { Enterprise, Item, Product, User } = require('../models');

const mutation = {
    Mutation: {
    updateItemReceived: async (parent, {id, receviedDate, binLocation}) => {
        return await Item.findOneAndUpdate(
            {_id: id},
            {receviedDate, binLocation},
            {new:true}
        );
    },
    updateItemSale: async ( parent, {id, saleDate, buyer, }) => {
        return await Item.findOneAndUpdate(
            {_id: id},
            {saleDate, buyer},
            {new:true}
        );
    },
    updateItemFulf: async (parent, {id, fulfillmentDate}) => {
        return await Item.findOneAndUpdate(
            {_id: id},
            {fulfillmentDate},
            {new:true}
        );
    },
}
}

module.exports = mutation;