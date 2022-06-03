const {Item} = require("../models")
const {updateItemSale} = require("./mutation")
const {getOneItemInStock} = require("./queries")

const bulkMutations = {
    // Function to recieve all items on order
    receiveOrder: async (parent,{enterpriseId,orderNumber,receivedDate,binLocation})=>{
        const items = await Item.updateMany({orderNumber,enterprise:enterpriseId},{receivedDate,binLocation})
        const result = await Item.find({orderNumber}).populate("product")
        return result
    },

    // Function to to make create a sale
    makeSale: async (parent,{enterpriseId,saleId,buyer,saleDate,quantity,salesPrice,productId})=>{
        try{
            for(let i=0;i<quantity;i++){
                const item = await getOneItemInStock({enterpriseId,productId})
                const updateItem = await updateItemSale(null,{item:item._id,saleDate,buyer,saleNumber:saleId,salesPrice});
            }
        }catch(err){
            console.error(err)
            }
    },

    // Function for completed sale and delivery 
    fulfillSale: async (parent,{enterpriseId,saleNumber,fulfillmentDate})=>{
        try{
            const items = await Item.updateMany({enterpriseId,saleNumber},{fulfillmentDate},{new:true})
            return items
        }catch(err){
            console.error(err)
        }
    }
}

// Exports functions
module.exports = bulkMutations