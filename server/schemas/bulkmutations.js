const {Item} = require("../models")
const {updateItemSale} = require("./mutation")
const {getOneItemInStock} = require("./queries")

const bulkMutations = {
    receiveOrder: async (parent,{enterpriseId,orderNumber,receivedDate,binLocation})=>{
        console.log(orderNumber)
        // specify enterprise
        const items = await Item.updateMany({orderNumber,enterprise:enterpriseId},{receivedDate,binLocation})
        console.log(items)
        return items
    },
    makeSale: async (parent,{enterpriseId,saleId,buyer,saleDate,quantity,salesPrice,productId})=>{
        for(let i=0;i<quantity;i++){
            const item = await getOneItemInStock({enterpriseId,productId})
            console.log(item)
            const updateItem = await updateItemSale(null,{item:item._id,saleDate,buyer,saleNumber:saleId,salesPrice});
            console.log(updateItem)
        }
    },
    // completed delivery - 
    fulfillSale: async (parent,{enterpriseId,saleNumber,fulfillmentDate})=>{
        try{

            const items = await Item.updateMany({enterpriseId,saleNumber},{fulfillmentDate},{new:true})
            console.log(items)
            return items}catch(err){
                console.log(err)
            }
        }
        }
        
module.exports = bulkMutations