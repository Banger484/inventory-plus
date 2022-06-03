const {Item} = require("../models")
const {updateItemSale} = require("./mutation")
const {getOneItemInStock} = require("./queries")

const bulkMutations = {
    receiveOrder: async (parent,{enterpriseId,orderNumber,receivedDate,binLocation})=>{
        console.log(orderNumber)
        // specify enterprise
        const items = await Item.updateMany({orderNumber,enterprise:enterpriseId},{receivedDate,binLocation})
        const result = await Item.find({orderNumber}).populate("product")
        return result
    },
    makeSale: async (parent,{enterpriseId,saleId,buyer,saleDate,quantity,salesPrice,productId})=>{
        try{

            console.log({enterpriseId,saleId,buyer,saleDate,quantity,salesPrice,productId})
            for(let i=0;i<quantity;i++){
                const item = await getOneItemInStock({enterpriseId,productId})
                console.log(item)
                const updateItem = await updateItemSale(null,{item:item._id,saleDate,buyer,saleNumber:saleId,salesPrice});
                
                console.log(updateItem)
            }
        }catch(err){
            console.log(err)
        }
    },
    // completed delivery - 
    fulfillSale: async (parent,{enterpriseId,saleNumber,fulfillmentDate})=>{
        try{

            const items = await Item.updateMany({enterpriseId,saleNumber},{fulfillmentDate},{new:true})
            console.log(items)
            return []}catch(err){
                console.log(err)
            }
        }
        }
        
module.exports = bulkMutations