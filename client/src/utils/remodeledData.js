import auth from './auth'

export const groupItems = (data)=>{
    const array = [];
    data.forEach(item=>{
        console.log(item.product._id)
        const matches = array.filter(el=>el.id==item.product._id)
        if(matches.length===0){
            array.push({id:item.product._id,quantity:1,name:item.product.name,sku:item.product.sku,msrp:item.product.msrp,totalMSRP:item.product.msrp,totalCost:item.cost,averageCost:item.cost,totalSalesPrice:item.salesPrice||"not sold",averageSalesPrice:item.salesPrice||"not sold",bins:[item.binLocation]})
        }
        else{
            matches[0].quantity++
            matches[0].totalMSRP+=matches[0].msrp
            matches[0].totalCost+=item.cost;
            matches[0].totalSalesPrice==="not sold"||(matches[0].totalSalesPrice+=item.salesPrice);
            matches[0].averageCost=matches[0].totalCost/matches[0].quantity
            matches[0].averageSalesPrice=matches[0].totalSalesPrice/matches[0].quantity||"not sold";
            matches[0].bins.push(item.binLocation)
            matches[0].bins = [...new Set(matches[0].bins)]
        }
    })
    console.log(array)
    return array
}