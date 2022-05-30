const { Enterprise, Item, Product, User } = require('../models');


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
}

module.exports = mutation;