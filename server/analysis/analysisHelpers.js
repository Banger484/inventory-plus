


const groupItemsByProduct = async (items)=>{
    const products = {};
    for (let item of items){
        if (products[item.product]){
            products[item.product].push(item)
        }else{
            products[item.product] = [item]
        }
    }
    // console.log(products)
    return products
}

module.exports = {groupItemsByProduct}