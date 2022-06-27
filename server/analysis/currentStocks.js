const { Item, User } = require("../models")

const dummyData = [{
    product:"Bottle",
    quantity:47
},
{
    product:"Baking Soda",
    quantity:56
},
{product:"Grease",
quantity:94
},
{
    product:"Other",
    quantity:39
}
]


const pastSalesQuantity = async (parent,{enterpriseId})=>{
    try{
        const res = []
        const items = await Item.find({enterprise:enterpriseId,saleDate:{$ne:null}}).populate("product")
        for (let i = 0;i<items.length;i++){
            const filtered = res.find(p=>p.product===items[i].product.name)
            if(!filtered){
                const obj = {product:items[i].product.name,quantity:1}
                res.push(obj)
            }
            else{
                filtered.quantity++
            }
        }
        res.sort((a,b)=>b.quantity-a.quantity)
        return res
    }catch(err){
        console.log(err)
    }
}

const currentStocksQuantity = async (parent,{enterpriseId})=>{
    try{
        const res = []
        const items = await Item.find({enterprise:enterpriseId,saleDate:null}).populate("product")
        for (let i = 0;i<items.length;i++){
            const filtered = res.find(p=>p.product===items[i].product.name)
            if(!filtered){
                const obj = {product:items[i].product.name,quantity:1}
                res.push(obj)
            }
            else{
                filtered.quantity++
            }
        }
        res.sort((a,b)=>b.quantity-a.quantity)
        return res
    }catch(err){
        console.log(err)
    }
}

const allPastPurchases = async (parent,{enterpriseId})=>{
    try{
        const res = []
        const items = await Item.find({enterprise:enterpriseId}).populate("product")
        for (let i = 0;i<items.length;i++){
            const filtered = res.find(p=>p.product===items[i].product.name)
            if(!filtered){
                const obj = {product:items[i].product.name,quantity:1}
                res.push(obj)
            }
            else{
                filtered.quantity++
            }
        }
        res.sort((a,b)=>b.quantity-a.quantity)
        return res
    }catch(err){
        console.log(err)
    }
}

const pastSuppliers = async (parent,{enterpriseId,productId})=>{
    try{
        const res = []
        const items = await Item.find({enterprise:enterpriseId,product:productId}).populate("product")
        for (let i = 0;i<items.length;i++){
            const filtered = res.find(p=>p.supplier===items[i].supplier)
            if(!filtered){
                const obj = {supplier:items[i].supplier,quantity:1}
                res.push(obj)
            }
            else{
                filtered.quantity++
            }
        }
        res.sort((a,b)=>b.quantity-a.quantity)
        return res
    }catch(err){
        console.log(err)
    }
}

const pastBuyers = async (parent,{enterpriseId,productId})=>{
    try{
        const res = []
        const items = await Item.find({enterprise:enterpriseId,product:productId}).populate("product")
        for (let i = 0;i<items.length;i++){
            const filtered = res.find(p=>p.buyer===items[i].buyer)
            if(!filtered){
                const obj = {buyer:items[i].buyer,quantity:1}
                res.push(obj)
            }
            else{
                filtered.quantity++
            }
        }
        res.sort((a,b)=>b.quantity-a.quantity)
        return res
    }catch(err){
        console.log(err)
    }
}

module.exports = {pastSuppliers,pastBuyers,allPastPurchases,pastSalesQuantity,currentStocksQuantity}